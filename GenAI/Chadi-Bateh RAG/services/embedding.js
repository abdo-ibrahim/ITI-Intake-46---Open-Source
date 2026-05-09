import dotenv from "dotenv";
dotenv.config({ override: true });

export async function getEmbedding(text) {
  try {
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        input: text,
        model: "text-embedding-3-small",
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("OpenAI API Error:", res.status, errBody);
      throw new Error(`OpenAI API Error: ${res.status} - ${errBody}`);
    }

    const data = await res.json();
    return data.data[0].embedding;
  } catch (error) {
    console.error("Failed in getEmbedding:", error);
    throw error;
  }
}
