const express = require("express");
const multer = require("multer");

const { deleteChat, getChatById, listChats, postChat, renameChat } = require("../controllers/chatController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/chat", (req, res, next) => {
  upload.single("file")(req, res, (error) => {
    if (!error) {
      return postChat(req, res, next);
    }

    if (error instanceof multer.MulterError) {
      return next({ status: 400, message: error.message });
    }

    return next({ status: 400, message: error.message || "Invalid uploaded file" });
  });
});
router.get("/chats", listChats);
router.get("/chats/:id", getChatById);
router.patch("/chats/:id", renameChat);
router.delete("/chats/:id", deleteChat);

module.exports = router;
