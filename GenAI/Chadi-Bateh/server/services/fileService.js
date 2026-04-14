const pdfParse = require("pdf-parse");

function isImageFile(file) {
  return Boolean(file && typeof file.mimetype === "string" && file.mimetype.startsWith("image/"));
}

function toDataUrl(file) {
  if (!file?.buffer || !file?.mimetype) {
    throw new Error("Missing file data for vision mode");
  }

  const base64 = file.buffer.toString("base64");
  return `data:${file.mimetype};base64,${base64}`;
}

async function extractFileText(file) {
  if (!file?.buffer) {
    return "";
  }

  if (file.mimetype === "text/plain") {
    return file.buffer.toString("utf8");
  }

  if (file.mimetype === "application/pdf") {
    const parsed = await pdfParse(file.buffer);
    return parsed.text || "";
  }

  throw new Error("Only PDF and TXT files are supported in File Input mode");
}

module.exports = {
  extractFileText,
  isImageFile,
  toDataUrl,
};
