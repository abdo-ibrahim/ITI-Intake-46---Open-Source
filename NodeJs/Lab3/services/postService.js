const Post = require("../models/postModel");

// Create a new post
exports.createPostService = async (postData) => {
  const post = await Post.create(postData);
  return post;
};
// GET all posts
exports.getAllPostsService = async (page = 1, limit = 10) => {
  const posts = await Post.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);
  const total = await Post.countDocuments();
  return {
    posts,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// GET post by ID
exports.getPostByIdService = async (id) => {
  const post = await Post.findById(id);
  return post;
};

// UPDATE post by ID
exports.updatePostService = async (id, updateData) => {
  const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });
  return updatedPost;
};

// DELETE post by ID
exports.deletePostService = async (id) => {
  const deletedPost = await Post.findByIdAndDelete(id);
  return deletedPost;
};