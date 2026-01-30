const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require("../../controllers/postController");
const { validate } = require("../../middlewares/validate");
const authenticate = require("../../middlewares/authenticate");
const { posts: postSchema } = require("../../schemas");

router.post("/", authenticate, validate(postSchema.createPost), createPost);
router.get("/", authenticate, validate(postSchema.getAllPost), getAllPosts);
router.get("/:id", authenticate, validate(postSchema.getPostById), getPostById);
router.patch("/:id", authenticate, validate(postSchema.updatePost), updatePost);
router.delete("/:id", authenticate, validate(postSchema.deletePost), deletePost);

module.exports = router;
