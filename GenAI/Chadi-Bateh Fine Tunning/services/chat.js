import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let MODEL_NAME = null;

export function setModel(model) {
  MODEL_NAME = model;
}

export async function chat(message) {
  const completion = await openai.chat.completions.create({
    model: MODEL_NAME || "gpt-4.1-nano-2025-04-14",
    messages: [
      {
        role: "developer",
        content:
          "You are a specialized assistant. You only answer questions about ITI rules.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return completion.choices[0].message.content;
}