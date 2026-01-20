const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require("../../controllers/postController");

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
