const postService = require("../services/postService");
const AppError = require("../utils/appErrors");
const asyncHandler = require("../middlewares/asyncHandler");

// Create a new post
exports.createPost = asyncHandler(async (req, res) => {
  const post = await postService.createPostService(req.body);
  res.status(201).json({ message: "Post created successfully", data: post });
});

// GET all posts
exports.getAllPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const result = await postService.getAllPostsService(page, limit);
  res.status(200).json({
    message: "Posts fetched successfully",
    data: result.posts,
    pagination: result.pagination,
  });
});
// GET post by ID
exports.getPostById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await postService.getPostByIdService(id);
  if (!post) {
    return next(new AppError("Post not found", 404));
  }
  res.status(200).json({ message: "Post fetched successfully", data: post });
});

// UPDATE post by ID
exports.updatePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updatedPost = await postService.updatePostService(id, req.body);
  if (!updatedPost) {
    return next(new AppError("Post not found", 404));
  }
  res.status(200).json({
    message: "Post updated successfully",
    data: updatedPost,
  });
});

// DELETE post by ID
exports.deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedPost = await postService.deletePostService(id);
  if (!deletedPost) {
    return next(new AppError("Post not found", 404));
  }
  res.status(200).json({
    message: "Post deleted successfully",
    data: deletedPost,
  });
});
