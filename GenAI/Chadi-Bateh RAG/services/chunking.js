import fs from "fs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function splitDocument(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 300,
    chunkOverlap: 100,
  });

  return await splitter.splitText(content);
}
