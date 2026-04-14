const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const allowedTypes = ["image/png", "image/jpeg", "image/webp", "application/pdf", "text/plain"];
const allowedMimeTypes = new Set([...allowedTypes, "image/jpg", "image/pjpeg", "application/x-pdf"]);
const allowedExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".pdf", ".txt"]);

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const mime = String(file.mimetype || "").toLowerCase();

    if (allowedMimeTypes.has(mime) || allowedExtensions.has(ext)) {
      return cb(null, true);
    }

    cb(new Error("Unsupported file type. Use PNG/JPG/WEBP, PDF, or TXT."));
  },
});

module.exports = upload;
