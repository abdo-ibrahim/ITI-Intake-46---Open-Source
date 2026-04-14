const Chat = require("../models/Chat");
const { generateImage, streamChatCompletion } = require("../services/openaiService");
const { extractFileText, isImageFile, toDataUrl } = require("../services/fileService");

const SUPPORTED_MODES = new Set(["text", "vision", "file", "image"]);
const DEFAULT_MODEL = "gpt-4o-mini";

function normalizeMode(mode) {
  const normalized = String(mode || "text")
    .toLowerCase()
    .trim();
  return SUPPORTED_MODES.has(normalized) ? normalized : "text";
}

function writeEvent(res, payload) {
  res.write(`${JSON.stringify(payload)}\n`);
}

function setupStreamingHeaders(res) {
  res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
}

function messageToOpenAIFormat(message) {
  if (message.role !== "user") {
    return {
      role: message.role,
      content: message.content,
    };
  }

  if (message.mode === "vision" && message.imageUrl) {
    return {
      role: "user",
      content: [
        {
          type: "text",
          text: message.content || "Describe this image.",
        },
        {
          type: "image_url",
          image_url: {
            url: message.imageUrl,
          },
        },
      ],
    };
  }

  if (message.mode === "file" && message.context) {
    return {
      role: "user",
      content: `User prompt: ${message.content}\n\nFile content:\n${message.context}`,
    };
  }

  return {
    role: "user",
    content: message.content,
  };
}

function parseError(error) {
  const isValidationLike = /upload|file|pdf|image|unsupported|invalid|mimetype|multipart/i.test(String(error?.message || "")) || error?.name === "ValidationError";
  const status = error?.status || (isValidationLike ? 400 : 500);
  const message = error?.response?.data?.error?.message || error?.message || "Unexpected server error";

  return { status, message };
}

async function listChats(_req, res, next) {
  try {
    const chats = await Chat.find().sort({ updatedAt: -1 }).select("_id title model mode createdAt updatedAt").lean();

    res.json({ chats });
  } catch (error) {
    next(error);
  }
}

async function getChatById(req, res, next) {
  try {
    const chat = await Chat.findById(req.params.id).lean();

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    return res.json({ chat });
  } catch (error) {
    return next(error);
  }
}

async function renameChat(req, res, next) {
  try {
    const title = String(req.body?.title || "").trim();

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    chat.title = title.slice(0, 80);
    await chat.save();

    return res.json({ chat: { _id: chat._id, title: chat.title } });
  } catch (error) {
    return next(error);
  }
}

async function deleteChat(req, res, next) {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    return res.json({ success: true, deletedId: req.params.id });
  } catch (error) {
    return next(error);
  }
}

async function postChat(req, res, next) {
  let streamStarted = false;

  try {
    const chatId = req.body.chatId;
    const requestedModel = String(req.body.model || DEFAULT_MODEL).trim();
    const rawMessage = String(req.body.message || "").trim();
    const regenerate = req.body.regenerate === "true" || req.body.regenerate === true;

    let chat = null;

    if (chatId) {
      chat = await Chat.findById(chatId);

      if (!chat) {
        return res.status(404).json({ error: "Chat not found" });
      }
    }

    const mode = normalizeMode(req.body.mode || chat?.mode || "text");
    let activePrompt = rawMessage;

    if (!chat) {
      chat = new Chat({
        model: requestedModel,
        mode,
        messages: [],
      });
    }

    chat.model = requestedModel;
    chat.mode = mode;

    if (regenerate) {
      const lastMessage = chat.messages.at(-1);
      if (lastMessage?.role === "assistant") {
        chat.messages.pop();
      }

      const lastUserMessage = [...chat.messages].reverse().find((msg) => msg.role === "user");

      if (!lastUserMessage) {
        return res.status(400).json({ error: "No previous user message to regenerate" });
      }

      activePrompt = lastUserMessage.content;
    } else {
      const fallbackPromptByMode = {
        file: "Summarize the uploaded file.",
        vision: "Describe this image in detail.",
      };
      const resolvedMessage = rawMessage || fallbackPromptByMode[mode] || "";

      if (!resolvedMessage && mode === "text") {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!resolvedMessage && mode === "image") {
        return res.status(400).json({ error: "Image mode requires a prompt" });
      }

      activePrompt = resolvedMessage;

      const replyTo = req.body.replyTo || null;
      const userMessage = {
        role: "user",
        content: resolvedMessage,
        mode,
      };

      if (replyTo) {
        userMessage.replyTo = replyTo;
      }

      if (mode === "vision") {
        if (!req.file || !isImageFile(req.file)) {
          return res.status(400).json({ error: "Vision mode requires an image upload" });
        }

        try {
          userMessage.imageUrl = toDataUrl(req.file);
        } catch (_error) {
          return res.status(400).json({ error: "Invalid image upload for vision mode" });
        }
      }

      if (mode === "file") {
        if (!req.file) {
          return res.status(400).json({ error: "File mode requires a PDF or TXT upload" });
        }

        let extractedText = "";
        try {
          extractedText = await extractFileText(req.file);
        } catch (_error) {
          return res.status(400).json({ error: "Could not read uploaded file. Use a valid PDF or TXT file" });
        }

        userMessage.context = extractedText.slice(0, 12000);
      }

      chat.messages.push(userMessage);
    }

    setupStreamingHeaders(res);
    streamStarted = true;

    writeEvent(res, {
      type: "meta",
      chatId: chat._id.toString(),
      model: requestedModel,
      mode,
    });

    if (mode === "image") {
      const imageUrl = await generateImage({ prompt: activePrompt });

      const assistantMessage = {
        role: "assistant",
        content: `Generated image for: ${activePrompt}`,
        mode,
        imageUrl,
      };

      chat.messages.push(assistantMessage);
      await chat.save();
      const savedAssistant = chat.messages.at(-1);

      writeEvent(res, {
        type: "image",
        content: assistantMessage.content,
        imageUrl,
      });

      writeEvent(res, {
        type: "done",
        chatId: chat._id.toString(),
        assistant: savedAssistant,
      });

      return res.end();
    }

    const openAIMessages = [
      {
        role: "system",
        content: "You are Chadi-Bateh, an accurate, practical, and concise AI assistant.",
      },
      ...chat.messages.map(messageToOpenAIFormat),
    ];

    let assistantResponse = "";

    assistantResponse = await streamChatCompletion({
      model: requestedModel,
      messages: openAIMessages,
      onToken: (token) => {
        writeEvent(res, {
          type: "token",
          content: token,
        });
      },
    });

    if (!assistantResponse.trim()) {
      assistantResponse = "I could not generate a response this time.";
    }

    const assistantMessage = {
      role: "assistant",
      content: assistantResponse,
      mode,
    };

    chat.messages.push(assistantMessage);
    await chat.save();
    const savedAssistant = chat.messages.at(-1);

    writeEvent(res, {
      type: "done",
      chatId: chat._id.toString(),
      assistant: savedAssistant,
    });

    return res.end();
  } catch (error) {
    const parsed = parseError(error);

    if (streamStarted) {
      writeEvent(res, { type: "error", error: parsed.message });
      return res.end();
    }

    return next({ status: parsed.status, message: parsed.message });
  }
}

module.exports = {
  deleteChat,
  getChatById,
  listChats,
  postChat,
  renameChat,
};
