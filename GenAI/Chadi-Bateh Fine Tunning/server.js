import "dotenv/config";
import express from "express";
import path from "path";

import { uploadFile } from "./services/upload.js";
import { createFineTuneJob, waitForFineTune } from "./services/fineTune.js";
import { chat, setModel } from "./services/chat.js";

const app = express();
app.use(express.json());

// serve UI
app.use(express.static("public"));

let modelName = null;

// ===== 1. Start Fine-tuning  =====
app.get("/start-finetune", async (req, res) => {
  try {
    const fileId = await uploadFile("./iti_rules_courses.jsonl");

    const jobId = await createFineTuneJob(fileId);

    const model = await waitForFineTune(jobId);

    modelName = model;
    setModel(model);

    res.json({ success: true, model });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== 2. Chat endpoint  =====
app.post("/chat", async (req, res) => {
  try {
    const reply = await chat(req.body.message);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
