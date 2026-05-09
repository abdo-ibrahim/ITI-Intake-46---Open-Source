import express from "express";
import multer from "multer";
import { processUploadedFile, generateRAGResponse } from "./services/rag.js";
import { clearVectorStore } from "./services/vectorStore.js";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(express.static("public"));

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const count = await processUploadedFile(req.file.path);
    res.json({ chunksCount: count });
  } catch (e) {
    console.error("error inside upload:", e);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.post("/chat", async (req, res) => {
  try {
    const reply = await generateRAGResponse(req.body.message);
    res.json({ reply });
  } catch (e) {
    res.status(500).json({ reply: "Internal Error" });
  }
});

app.delete("/clear", async (req, res) => {
  await clearVectorStore();
  res.json({ success: true });
});

app.listen(3000, () => console.log("🚀 Server: http://localhost:3000"));
