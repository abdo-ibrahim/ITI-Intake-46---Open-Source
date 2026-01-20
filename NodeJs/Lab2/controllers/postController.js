const mongoose = require("mongoose");
const Post = require("../models/postModel");

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content, author, tags, published } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ message: "Title, content, and author fields are required" });
  }
  const post = await Post.create({ title, content, author, tags, published });
  res.status(201).json({ message: "Post created successfully", data: post });
};

// GET all posts
exports.getAllPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const posts = await Post.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);
  const total = await Post.countDocuments();
  res.status(200).json({
    message: "Posts fetched successfully",
    data: posts,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};

// GET post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json({ message: "Post fetched successfully", data: post });
};

// UPDATE post by ID
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }
  const { title, content, author, tags, published } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ message: "Title, content, and author fields are required" });
  }
  const updatedPost = await Post.findByIdAndUpdate(id, { title, content, author, tags, published }, { new: true });
  if (!updatedPost) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json({
    message: "Post updated successfully",
    data: updatedPost,
  });
};

// DELETE post by ID
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }
  const deletedPost = await Post.findByIdAndDelete(id);
  if (!deletedPost) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json({
    message: "Post deleted successfully",
    data: deletedPost,
  });
};
