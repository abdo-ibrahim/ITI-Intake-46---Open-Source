const OpenAI = require("openai");

let openAIClient;

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPEN_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OpenAI key. Set OPENAI_API_KEY in .env");
  }

  if (!openAIClient) {
    openAIClient = new OpenAI({ apiKey });
  }

  return openAIClient;
}

async function streamChatCompletion({ model, messages, onToken }) {
  const stream = await getOpenAIClient().chat.completions.create({
    model,
    messages,
    stream: true,
  });

  let fullText = "";

  for await (const chunk of stream) {
    const token = chunk.choices?.[0]?.delta?.content || "";

    if (token) {
      fullText += token;
      onToken(token);
    }
  }

  return fullText;
}

async function generateImage({ prompt, model = "gpt-image-1", size = "1024x1024" }) {
  const result = await getOpenAIClient().images.generate({
    model,
    prompt,
    size,
  });

  const payload = result.data?.[0];

  if (!payload) {
    throw new Error("Image generation returned an empty response");
  }

  if (payload.url) {
    return payload.url;
  }

  if (payload.b64_json) {
    return `data:image/png;base64,${payload.b64_json}`;
  }

  throw new Error("Unsupported image response format");
}

module.exports = {
  generateImage,
  streamChatCompletion,
};
