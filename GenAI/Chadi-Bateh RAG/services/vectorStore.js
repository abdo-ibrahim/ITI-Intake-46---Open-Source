import { ChromaClient } from "chromadb";

const chromaUrl = process.env.CHROMA_URL;
const chromaHost = process.env.CHROMA_HOST || "127.0.0.1";
const chromaPort = Number(process.env.CHROMA_PORT || 8000);
const chromaSsl = process.env.CHROMA_SSL === "true";

let clientConfig;

if (chromaUrl) {
  const url = new URL(chromaUrl);
  const protocolPort = url.protocol === "https:" ? 443 : 80;
  clientConfig = {
    host: url.hostname,
    port: Number(url.port || protocolPort),
    ssl: url.protocol === "https:",
  };
} else {
  clientConfig = { host: chromaHost, port: chromaPort, ssl: chromaSsl };
}

const client = new ChromaClient(clientConfig);
const collectionName = "maharatech_docs";

export async function saveToVectorStore(vectors) {
  try {
    console.log("🛠️ Connecting to ChromaDB...");
    const collection = await client.getOrCreateCollection({
      name: collectionName,
      embeddingFunction: null,
    });

    const existing = await collection.get();
    if (existing.ids.length > 0) {
      console.log(`🗑️ Clearing ${existing.ids.length} old records...`);
      await collection.delete({ ids: existing.ids });
    }

    console.log("📥 Saving new vectors to ChromaDB...");
    await collection.add({
      ids: vectors.map((v) => v.id),
      embeddings: vectors.map((v) => v.embedding),
      metadatas: vectors.map((v) => v.metadata),
    });

    console.log("✅ Data saved successfully!");
  } catch (error) {
    console.error("❌ Vector Store Error:", error);
    throw error;
  }
}

export async function searchVectorStore(queryEmbedding) {
  try {
    const collection = await client.getOrCreateCollection({
      name: collectionName,
      embeddingFunction: null,
    });

    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: 3,
    });

    return results.metadatas[0].map((m) => m.text).join("\n\n");
  } catch (error) {
    console.error("❌ Search Error:", error);
    return "";
  }
}
export async function clearVectorStore() {
  try {
    await client.deleteCollection({ name: collectionName });
    console.log("🧹 Collection deleted successfully.");
  } catch (e) {
    console.log("ℹ️ Collection does not exist or is already empty.");
  }
}
