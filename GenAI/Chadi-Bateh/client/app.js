const API_BASE = "http://localhost:5000/api";
const NEW_CHAT_KEY = "__new_chat__";
const DEFAULT_MODEL = "gpt-4o-mini";
const DEFAULT_MODE = "text";

const state = {
  chatId: null,
  chats: [],
  messages: [],
  loading: false,
  model: "gpt-4o-mini",
  mode: "text",
  replyTo: null,
  pendingFile: null,
  drafts: {},
  stream: {
    seen: 0,
    buffer: "",
  },
};

function getActiveChatKey() {
  return state.chatId || NEW_CHAT_KEY;
}

function saveCurrentDraft() {
  state.drafts[getActiveChatKey()] = nodes.messageInput.value;
}

function restoreDraftForActiveChat() {
  nodes.messageInput.value = state.drafts[getActiveChatKey()] || "";
}

const nodes = {
  chatList: document.getElementById("chatList"),
  newChatBtn: document.getElementById("newChatBtn"),
  messages: document.getElementById("messages"),
  chatWindow: document.getElementById("chatWindow"),
  messageInput: document.getElementById("messageInput"),
  sendBtn: document.getElementById("sendBtn"),
  regenBtn: document.getElementById("regenBtn"),
  modelSelect: document.getElementById("modelSelect"),
  modeSelect: document.getElementById("modeSelect"),
  attachBtn: document.getElementById("attachBtn"),
  fileInput: document.getElementById("fileInput"),
  filePreview: document.getElementById("filePreview"),
  replyPreview: document.getElementById("replyPreview"),
  toastRoot: document.getElementById("toastRoot"),
};

function escapeHtml(input = "") {
  return input.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function getMessageId(message) {
  return String(message._id || message.id || `tmp_${Math.random().toString(36).slice(2)}`);
}

function normalizeMessage(message) {
  return {
    id: getMessageId(message),
    role: message.role,
    content: message.content || "",
    imageUrl: message.imageUrl || "",
    mode: message.mode || "text",
    replyTo: message.replyTo ? String(message.replyTo) : null,
    createdAt: message.createdAt || new Date().toISOString(),
  };
}

function renderChats() {
  if (!state.chats.length) {
    nodes.chatList.innerHTML = '<p class="px-2 text-sm text-slate-400">No chats yet.</p>';
    return;
  }

  nodes.chatList.innerHTML = state.chats
    .map((chat) => {
      const isActive = state.chatId === String(chat._id);
      const title = escapeHtml(chat.title || "Untitled chat");
      const updated = new Date(chat.updatedAt).toLocaleString();

      return `
        <div class="chat-item chat-item-shell ${isActive ? "active" : ""}" data-chat-id="${chat._id}">
          <button class="chat-main-btn" data-open-chat-id="${chat._id}">
            <p class="truncate pr-8 text-sm font-semibold text-white">${title}</p>
            <p class="mt-1 hidden text-xs text-slate-400 md:block">${escapeHtml(chat.model || "gpt-4o-mini")} - ${escapeHtml(chat.mode || "text")}</p>
            <p class="mt-1 hidden text-[11px] text-slate-500 md:block">${escapeHtml(updated)}</p>
          </button>
          <button class="chat-menu-btn" data-menu-toggle-id="${chat._id}" title="More actions" aria-label="More actions">⋯</button>
          <div class="chat-actions-menu hidden" data-menu-id="${chat._id}">
            <button class="chat-action-item" data-rename-id="${chat._id}">✏️ <span>Rename</span></button>
            <button class="chat-action-item delete" data-delete-id="${chat._id}">🗑️ <span>Delete</span></button>
          </div>
        </div>
      `;
    })
    .join("");

  nodes.chatList.querySelectorAll("[data-open-chat-id]").forEach((button) => {
    button.addEventListener("click", () => loadChat(button.dataset.openChatId));
  });

  nodes.chatList.querySelectorAll("[data-menu-toggle-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleChatActionsMenu(button.dataset.menuToggleId);
    });
  });

  nodes.chatList.querySelectorAll("[data-rename-id]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      await renameChat(button.dataset.renameId);
    });
  });

  nodes.chatList.querySelectorAll("[data-delete-id]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      await deleteChat(button.dataset.deleteId);
    });
  });
}

function closeAllChatMenus() {
  nodes.chatList.querySelectorAll("[data-menu-id]").forEach((menu) => {
    menu.classList.add("hidden");
  });
}

function toggleChatActionsMenu(chatId) {
  const menu = nodes.chatList.querySelector(`[data-menu-id="${chatId}"]`);
  if (!menu) return;

  const willOpen = menu.classList.contains("hidden");
  closeAllChatMenus();

  if (willOpen) {
    menu.classList.remove("hidden");
  }
}

async function renameChat(chatId) {
  closeAllChatMenus();

  const chat = state.chats.find((entry) => String(entry._id) === String(chatId));
  const currentTitle = chat?.title || "Untitled chat";
  const newTitle = window.prompt("Rename chat", currentTitle);

  if (newTitle === null) {
    return;
  }

  const cleanTitle = newTitle.trim();
  if (!cleanTitle) {
    showToast("Chat title cannot be empty");
    return;
  }

  try {
    await axios.patch(`${API_BASE}/chats/${chatId}`, { title: cleanTitle });
    await fetchChats();
  } catch (error) {
    const serverMessage = error?.response?.data?.error || error.message;
    showToast(serverMessage || "Failed to rename chat");
  }
}

async function deleteChat(chatId) {
  closeAllChatMenus();

  const confirmed = window.confirm("Delete this chat permanently?");
  if (!confirmed) {
    return;
  }

  try {
    await axios.delete(`${API_BASE}/chats/${chatId}`);

    if (String(state.chatId) === String(chatId)) {
      createNewChat();
    }

    await fetchChats();
  } catch (error) {
    const serverMessage = error?.response?.data?.error || error.message;
    showToast(serverMessage || "Failed to delete chat");
  }
}

function findMessageById(messageId) {
  return state.messages.find((message) => message.id === messageId);
}

function renderMessages() {
  if (!state.messages.length) {
    nodes.messages.innerHTML = `
      <div class="mx-auto mt-12 max-w-lg rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-slate-300">
        <p class="text-lg font-semibold text-white">Welcome to Chadi-Bateh</p>
        <p class="mt-2 text-sm">Pick a mode, choose a model, and start chatting.</p>
      </div>
    `;
    updateActionStates();
    return;
  }

  nodes.messages.innerHTML = state.messages
    .map((message) => {
      const isAssistant = message.role === "assistant";
      const replySource = message.replyTo ? findMessageById(message.replyTo) : null;
      const replyMarkup = replySource ? `<div class="reply-chip">Replying to: ${escapeHtml(replySource.content.slice(0, 140))}</div>` : "";

      const bodyText = escapeHtml(message.content);
      const imageMarkup = message.imageUrl ? `<img src="${message.imageUrl}" alt="Generated" class="mt-3 max-h-[380px] w-full rounded-xl object-cover" />` : "";

      const replyButton = isAssistant ? `<div class="inline-actions"><button class="inline-btn" data-reply-id="${message.id}">Reply</button></div>` : "";

      const typingClass = message.id === "streaming_assistant" ? "typing-cursor" : "";

      return `
        <div class="message-row ${message.role}">
          <div class="message-bubble">
            ${replyMarkup}
            <div class="message-text ${typingClass}">${bodyText || "..."}</div>
            ${imageMarkup}
            ${replyButton}
          </div>
        </div>
      `;
    })
    .join("");

  nodes.messages.querySelectorAll("[data-reply-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const source = findMessageById(button.dataset.replyId);
      if (!source) return;

      state.replyTo = source.id;
      showReplyPreview(source.content);
      nodes.messageInput.focus();
    });
  });

  autoScroll();
  updateActionStates();
}

function updateActionStates() {
  const lastAssistant = [...state.messages].reverse().find((message) => message.role === "assistant");
  nodes.regenBtn.disabled = state.loading || !lastAssistant || !state.chatId;
  nodes.sendBtn.disabled = state.loading;
  nodes.attachBtn.disabled = state.loading || (state.mode !== "vision" && state.mode !== "file");
  nodes.messageInput.disabled = state.loading;

  nodes.sendBtn.textContent = state.loading ? "Thinking..." : "Send Message";
}

function showToast(message, type = "error") {
  const toast = document.createElement("div");
  toast.className = "toast text-sm";
  toast.innerHTML = `<p class="font-semibold ${type === "error" ? "text-rose-300" : "text-emerald-300"}">${type === "error" ? "Error" : "Info"}</p><p class="mt-1 text-slate-200">${escapeHtml(message)}</p>`;

  nodes.toastRoot.appendChild(toast);

  window.setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(6px)";
    window.setTimeout(() => toast.remove(), 180);
  }, 3600);
}

function showReplyPreview(text) {
  if (!state.replyTo) {
    nodes.replyPreview.classList.add("hidden");
    nodes.replyPreview.innerHTML = "";
    return;
  }

  nodes.replyPreview.classList.remove("hidden");
  nodes.replyPreview.innerHTML = `
    <div class="flex items-center justify-between gap-3">
      <p class="text-cyan-100">Replying to: ${escapeHtml((text || "").slice(0, 180))}</p>
      <button id="clearReplyBtn" class="text-xs font-semibold uppercase tracking-wide text-cyan-300">Clear</button>
    </div>
  `;

  document.getElementById("clearReplyBtn")?.addEventListener("click", () => {
    state.replyTo = null;
    showReplyPreview("");
  });
}

function showFilePreview() {
  if (!state.pendingFile) {
    nodes.filePreview.classList.add("hidden");
    nodes.filePreview.innerHTML = "";
    return;
  }

  nodes.filePreview.classList.remove("hidden");
  nodes.filePreview.innerHTML = `
    <div class="flex items-center justify-between gap-3">
      <p class="text-blue-100">Attached: ${escapeHtml(state.pendingFile.name)}</p>
      <button id="clearFileBtn" class="text-xs font-semibold uppercase tracking-wide text-blue-300">Remove</button>
    </div>
  `;

  document.getElementById("clearFileBtn")?.addEventListener("click", () => {
    state.pendingFile = null;
    nodes.fileInput.value = "";
    showFilePreview();
  });
}

function autoScroll() {
  nodes.chatWindow.scrollTop = nodes.chatWindow.scrollHeight;
}

function createStreamingAssistant() {
  const existing = state.messages.find((message) => message.id === "streaming_assistant");
  if (existing) return existing;

  const streamingMessage = {
    id: "streaming_assistant",
    role: "assistant",
    content: "",
    mode: state.mode,
    imageUrl: "",
    replyTo: null,
  };

  state.messages.push(streamingMessage);
  return streamingMessage;
}

function handleStreamEvent(eventData) {
  if (eventData.type === "meta") {
    if (eventData.chatId) {
      state.chatId = eventData.chatId;
    }
    return;
  }

  if (eventData.type === "token") {
    const streamMsg = createStreamingAssistant();
    streamMsg.content += eventData.content || "";
    renderMessages();
    return;
  }

  if (eventData.type === "image") {
    const streamMsg = createStreamingAssistant();
    streamMsg.content = eventData.content || "Generated image";
    streamMsg.imageUrl = eventData.imageUrl || "";
    renderMessages();
    return;
  }

  if (eventData.type === "done") {
    if (eventData.chatId) {
      state.chatId = eventData.chatId;
    }

    const streamIndex = state.messages.findIndex((message) => message.id === "streaming_assistant");
    if (streamIndex >= 0 && eventData.assistant) {
      state.messages[streamIndex] = normalizeMessage({
        ...eventData.assistant,
        _id: eventData.assistant._id || `assistant_${Date.now()}`,
      });
    }

    renderMessages();
    return;
  }

  if (eventData.type === "error") {
    showToast(eventData.error || "Streaming failed");
  }
}

function consumeStreamDelta(rawText) {
  // The backend streams NDJSON chunks; keep partial lines until complete JSON arrives.
  const delta = rawText.slice(state.stream.seen);
  state.stream.seen = rawText.length;
  state.stream.buffer += delta;

  const lines = state.stream.buffer.split("\n");
  state.stream.buffer = lines.pop() || "";

  lines.forEach((line) => {
    if (!line.trim()) return;

    try {
      handleStreamEvent(JSON.parse(line));
    } catch (_error) {
      showToast("Failed to parse stream event from server");
    }
  });
}

function resetStreamBuffer() {
  state.stream.seen = 0;
  state.stream.buffer = "";
}

function clearComposer(afterSend = true) {
  saveCurrentDraft();

  if (afterSend) {
    nodes.messageInput.value = "";
    state.drafts[getActiveChatKey()] = "";
  }

  state.pendingFile = null;
  nodes.fileInput.value = "";
  showFilePreview();
  state.replyTo = null;
  showReplyPreview("");
}

async function sendMessage({ regenerate = false } = {}) {
  if (state.loading) return;

  let text = nodes.messageInput.value.trim();
  saveCurrentDraft();

  if (!regenerate) {
    if (state.mode === "text" && !text) {
      showToast("Please enter a message first.");
      return;
    }

    if (state.mode === "image" && !text) {
      showToast("Image mode requires a prompt.");
      return;
    }

    if (state.mode === "vision" && !state.pendingFile) {
      showToast("Vision mode requires an image upload.");
      return;
    }

    if (state.mode === "file" && !state.pendingFile) {
      showToast("File mode requires a PDF or TXT file upload.");
      return;
    }

    if (!text && state.mode === "vision") {
      text = "Describe this image in detail.";
    }

    if (!text && state.mode === "file") {
      text = "Summarize the uploaded file.";
    }
  }

  state.loading = true;
  updateActionStates();

  if (regenerate) {
    if (!state.chatId) {
      showToast("No existing chat to regenerate.");
      state.loading = false;
      updateActionStates();
      return;
    }

    const lastIndex = [...state.messages].reverse().findIndex((message) => message.role === "assistant");
    if (lastIndex !== -1) {
      const absoluteIndex = state.messages.length - 1 - lastIndex;
      state.messages.splice(absoluteIndex, 1);
    }
  } else {
    const localMessage = {
      id: `local_user_${Date.now()}`,
      role: "user",
      content: text,
      mode: state.mode,
      imageUrl: state.mode === "vision" && state.pendingFile ? URL.createObjectURL(state.pendingFile) : "",
      replyTo: state.replyTo,
    };

    state.messages.push(localMessage);
  }

  createStreamingAssistant();
  renderMessages();

  const formData = new FormData();
  // Keep a single endpoint contract across all modes by sending multipart payloads.
  formData.append("model", state.model);
  formData.append("mode", state.mode);

  if (state.chatId) {
    formData.append("chatId", state.chatId);
  }

  if (regenerate) {
    formData.append("regenerate", "true");
  } else {
    formData.append("message", text);
    if (state.replyTo) {
      formData.append("replyTo", state.replyTo);
    }

    if (state.pendingFile) {
      formData.append("file", state.pendingFile);
    }
  }

  resetStreamBuffer();

  try {
    await axios.post(`${API_BASE}/chat`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "text",
      onDownloadProgress: (event) => {
        const raw = event.event?.target?.responseText || event.currentTarget?.responseText || "";
        consumeStreamDelta(raw);
      },
    });

    if (state.stream.buffer.trim()) {
      try {
        handleStreamEvent(JSON.parse(state.stream.buffer));
      } catch (_error) {
        showToast("Stream ended with malformed payload");
      }
    }

    clearComposer(!regenerate);
    await fetchChats();
  } catch (error) {
    const serverMessage = error?.response?.data?.error || error.message;
    showToast(serverMessage || "Failed to send message");

    const streamIndex = state.messages.findIndex((message) => message.id === "streaming_assistant");
    if (streamIndex >= 0) {
      state.messages.splice(streamIndex, 1);
    }
  } finally {
    state.loading = false;
    updateActionStates();
    renderMessages();
  }
}

async function fetchChats() {
  try {
    const response = await axios.get(`${API_BASE}/chats`);
    state.chats = response.data.chats || [];
    renderChats();
  } catch (_error) {
    showToast("Could not load chat history");
  }
}

async function loadChat(chatId) {
  try {
    if (state.loading) return;

    saveCurrentDraft();
    state.loading = true;
    updateActionStates();

    const response = await axios.get(`${API_BASE}/chats/${chatId}`);
    const chat = response.data.chat;

    state.chatId = String(chat._id);
    state.model = chat.model || "gpt-4o-mini";
    state.mode = chat.mode || "text";
    state.messages = (chat.messages || []).map(normalizeMessage);

    nodes.modelSelect.value = state.model;
    nodes.modeSelect.value = state.mode;
    restoreDraftForActiveChat();
    showFilePreview();
    showReplyPreview("");

    renderChats();
    renderMessages();
  } catch (_error) {
    showToast("Failed to load selected chat");
  } finally {
    state.loading = false;
    updateActionStates();
  }
}

function createNewChat() {
  if (state.loading) return;

  saveCurrentDraft();
  state.chatId = null;
  state.messages = [];
  state.model = DEFAULT_MODEL;
  state.mode = DEFAULT_MODE;
  state.replyTo = null;
  state.pendingFile = null;
  nodes.modelSelect.value = state.model;
  nodes.modeSelect.value = state.mode;
  updateModeUI();
  restoreDraftForActiveChat();
  clearComposer(true);
  renderChats();
  renderMessages();
}

function updateModeUI() {
  if (state.mode === "vision") {
    nodes.fileInput.accept = "image/png,image/jpeg,image/webp";
    nodes.attachBtn.textContent = "Attach Image";
  } else if (state.mode === "file") {
    nodes.fileInput.accept = ".pdf,.txt,application/pdf,text/plain";
    nodes.attachBtn.textContent = "Attach File";
  } else {
    nodes.fileInput.accept = "";
    nodes.attachBtn.textContent = "Attach";
    state.pendingFile = null;
    showFilePreview();
  }

  updateActionStates();
}

function bindEvents() {
  nodes.newChatBtn.addEventListener("click", createNewChat);

  nodes.sendBtn.addEventListener("click", () => sendMessage({ regenerate: false }));
  nodes.regenBtn.addEventListener("click", () => sendMessage({ regenerate: true }));

  nodes.messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage({ regenerate: false });
    }
  });

  nodes.modelSelect.addEventListener("change", (event) => {
    saveCurrentDraft();
    state.model = event.target.value;
  });

  nodes.modeSelect.addEventListener("change", (event) => {
    saveCurrentDraft();
    state.mode = event.target.value;
    updateModeUI();
  });

  nodes.messageInput.addEventListener("input", () => {
    saveCurrentDraft();
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (!event.target.closest("[data-menu-toggle-id]") && !event.target.closest("[data-menu-id]")) {
      closeAllChatMenus();
    }
  });

  nodes.attachBtn.addEventListener("click", () => {
    if (state.mode !== "vision" && state.mode !== "file") {
      showToast("Attach is available in Vision and File Input modes", "info");
      return;
    }

    nodes.fileInput.click();
  });

  nodes.fileInput.addEventListener("change", (event) => {
    const selectedFile = event.target.files?.[0] || null;
    state.pendingFile = selectedFile;
    showFilePreview();
  });
}

async function bootstrap() {
  bindEvents();
  updateModeUI();
  renderMessages();
  await fetchChats();
}

bootstrap();
