const PostService = require('../services/posts');
const APIError = require('../utils/APIError');

const createPost = async (req, res) => {
    const post = await PostService.createPost(req.body, req.user.userId);
    res.status(201).json({ message: "Post created successfully", data: post });
}

const getAllPosts = async (req, res) => {
    const { posts, pagenation } = await PostService.getAllPosts(req.query, req?.user?.userId);
    res.status(200).json({ message: "Posts fetched successfully", data: posts, pagenation });
}

const getPostById = async (req, res) => {
    const { id } = req.params;
    const post = await PostService.getPostById(id, req?.user?.userId);
    if (!post) {
        throw new APIError("Post not found", 404);
    }
    res.status(200).json({ message: "Post fetched successfully", data: post });
}

const updatePostById = async (req, res) => {
    const { id } = req.params;
    const updatedPost = await PostService.updatePostById(id, req.body, req.user.userId);
    if (!updatedPost) {
        throw new APIError("Post not found", 404);
    }
    res.status(200).json({ message: "Post updated successfully", data: updatedPost });
}

const deletePostById = async (req, res) => {
    const { id } = req.params;
    const deletedPost = await PostService.deletePostById(id, req.user.userId);
    if (!deletedPost) {
        throw new APIError("Post not found", 404);
    }
    res.status(200).json({ message: "Post deleted successfully" });
}


module.exports = { createPost, getAllPosts, getPostById, updatePostById, deletePostById };
