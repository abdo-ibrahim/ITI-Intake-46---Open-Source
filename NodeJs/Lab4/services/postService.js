const Post = require("../models/postModel");
const AppError = require("../utils/appErrors");

// Create a new post
exports.createPostService = async (postData, userId, author) => {
  const post = await Post.create({ ...postData, userId, author });
  return post;
};
// GET all posts
exports.getAllPostsService = async (page = 1, limit = 10, userId) => {
  const skip = (page - 1) * limit;
  const posts = await Post.find().populate("userId", "name email").skip(skip).limit(limit).lean();
  // add isOwner to each post
  posts.forEach((post) => {
    post.isOwner = post.userId?._id?.toString() === userId.toString();
  });
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
exports.getPostByIdService = async (postId, userId) => {
  const post = await Post.findById(postId).populate("userId", "name email").lean();
  if (!post) {
    return null;
  }
  // add isOwner
  post.isOwner = post.userId?._id?.toString() === userId.toString();

  return post;
};

// UPDATE post by ID
exports.updatePostService = async (postId, updateData, userId, role) => {
  const updatedPost = await Post.findByIdAndUpdate(postId, updateData, { new: true }).populate("userId", "name email").lean();
  if (!updatedPost) {
    return null;
  }
  // check ownership
  if (role !== "admin" && updatedPost.userId?._id?.toString() !== userId.toString()) {
    throw new AppError("Unauthorized to update this post", 403);
  }

  return updatedPost;
};

// DELETE post by ID
exports.deletePostService = async (postId, userId, role) => {
  const post = await Post.findById(postId).lean();
  if (!post) {
    return null;
  }
  // check ownership
  if (role !== "admin" && post.userId?.toString() !== userId.toString()) {
    throw new AppError("Unauthorized to delete this post", 403);
  }
  const deletedPost = await Post.findByIdAndDelete(postId).lean();
  return deletedPost;
};
