const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require("../../controllers/postController");
const { validate } = require("../../middlewares/validate");
const { posts: postValidation } = require("../../validations");

router.post("/", validate(postValidation.createPost), createPost);
router.get("/", validate(postValidation.getAllPost), getAllPosts);
router.get("/:id", validate(postValidation.getPostById), getPostById);
router.patch("/:id", validate(postValidation.updatePost), updatePost);
router.delete("/:id", validate(postValidation.deletePost), deletePost);

module.exports = router;
