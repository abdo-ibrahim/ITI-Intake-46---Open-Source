import { splitDocument } from "./chunking.js";
import { getEmbedding } from "./embedding.js";
import { saveToVectorStore, searchVectorStore } from "./vectorStore.js";
import { getAnswer } from "./completion.js";
import { inputGuardrail } from "./guardrail.js";
export async function processUploadedFile(filePath) {
  const chunks = await splitDocument(filePath);
  const vectors = [];

  console.log(`\n📂 Started processing: ${filePath}`);
  console.log(`✂️  Split into ${chunks.length} chunks. Starting Embeddings...\n`);

  for (let i = 0; i < chunks.length; i++) {
    console.log(`[${i + 1}/${chunks.length}] 💎 Generating embedding for chunk...`);

    const vector = await getEmbedding(chunks[i]);

    vectors.push({
      id: `chunk-${Date.now()}-${i}`,
      embedding: vector,
      metadata: { text: chunks[i] },
    });
  }

  console.log(`\n✅ Finished embedding all chunks.`);
  console.log(`🚀 Storing ${vectors.length} vectors in ChromaDB...`);

  await saveToVectorStore(vectors);

  console.log(`✨ Indexing complete! System is ready.\n`);

  return chunks.length;
}

export async function generateRAGResponse(userMessage) {
  const isSafe = await inputGuardrail(userMessage);

  if (!isSafe) {
    return "❌ أعتذر، لا يمكنني تنفيذ هذا الطلب لأسباب أمنية.";
  }

  const queryEmbedding = await getEmbedding(userMessage);
  const relevantContext = await searchVectorStore(queryEmbedding);
  const finalAnswer = await getAnswer(userMessage, relevantContext);

  return finalAnswer;
}
