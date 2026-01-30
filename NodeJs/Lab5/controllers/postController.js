const postService = require("../services/postService");
const AppError = require("../utils/appErrors");

/**
 * @desc    Create a new post
 * @route   POST /posts
 * @method  POST
 * @access  Private
 */
exports.createPost = async (req, res) => {
  const userId = req.user._id;
  const author = req.user.name;
  const post = await postService.createPostService(req.body, userId, author);
  res.status(201).json({ message: "Post created successfully", data: post });
};

/**
 * @desc    Get all posts
 * @route   GET /posts
 * @method  GET
 * @access  Private
 */
exports.getAllPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const userId = req.user._id;
  const result = await postService.getAllPostsService(page, limit, userId);
  res.status(200).json({
    message: "Posts fetched successfully",
    data: result.posts,
    pagination: result.pagination,
  });
};

/**
 * @desc    Get post by ID
 * @route   GET /posts/:id
 * @method  GET
 * @access  Private
 */
exports.getPostById = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const post = await postService.getPostByIdService(id, userId);
  if (!post) {
    return next(new AppError("Post not found", 404));
  }
  res.status(200).json({ message: "Post fetched successfully", data: post });
};

/**
 * @desc    Update post by ID
 * @route   PATCH /posts/:id
 * @method  PATCH
 * @access  Private
 */
exports.updatePost = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const role = req.user.role;
  const updatedPost = await postService.updatePostService(id, req.body, userId, role);
  if (!updatedPost) {
    return next(new AppError("Post not found", 404));
  }
  res.status(200).json({
    message: "Post updated successfully",
    data: updatedPost,
  });
};

/**
 * @desc    Delete post by ID
 * @route   DELETE /posts/:id
 * @method  DELETE
 * @access  Private
 */
exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const role = req.user.role;
  const deletedPost = await postService.deletePostService(id, userId, role);
  if (!deletedPost) {
    return next(new AppError("Post not found", 404));
  }
  res.status(200).json({
    message: "Post deleted successfully",
    data: deletedPost,
  });
};
