import dotenv from "dotenv";
dotenv.config({ override: true });

export async function getAnswer(question, contextChunks) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that answers questions based only on the provided context.",
        },
        {
          role: "user",
          content: `#### Context Start ####\n${contextChunks}\n#### Context End ####\n\nQuestion: ${question}`,
        },
      ],
    }),
  });
  const data = await res.json();
  return data.choices[0].message.content;
}
