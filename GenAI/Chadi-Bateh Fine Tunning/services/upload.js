import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function uploadFile(filePath) {
  console.log("Uploading file...");

  const file = await openai.files.create({
    file: fs.createReadStream(filePath),
    purpose: "fine-tune",
  });

  console.log("File uploaded:", file.id);
  return file.id;
}

