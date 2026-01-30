const Post = require('../models/posts');
const APIError = require('../utils/APIError');

const createPost = async (postData, userId) => {
    const post = await Post.create({ ...postData, user: userId });
    return post;
}

const getAllPosts = async (query, userId) => {
    let { page, limit } = query;
    page = Number(page);
    limit = Number(limit);
    const postsPromise = Post.find().skip((page - 1) * limit).limit(limit).populate('user', 'name email');
    const totalPromise = Post.countDocuments();
    const [posts, total] = await Promise.all([postsPromise, totalPromise]);

    let postsData;

    if (userId) {
        // Add isOwner flag to each post
        postsData = posts.map(post => {
            const postObj = post.toObject();
            // Check if post belongs to authenticated user (userId is populated, so use _id)
            postObj.isOwner = post.user._id.toString() === userId.toString();
            return postObj;
        });
    }
    else {
        postsData = posts;
    }

    const pagenation = {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    }
    return { posts: postsData, pagenation };
}

const getPostById = async (id, userId) => {
    const post = await Post.findById(id).populate('user', 'name email');
    if (!post) {
        return null;
    }

    // Add isOwner flag
    const postObj = post.toObject();
    // Check if post belongs to authenticated user (userId is populated, so use _id)
    if (userId) {
        postObj.isOwner = post.user._id.toString() === userId.toString();
    }

    return postObj;
}

const updatePostById = async (id, postData, userId) => {
    const post = await Post.findById(id);
    if (!post) {
        return null;
    }

    // Check if user is the author
    if (post.user.toString() !== userId.toString()) {
        throw new APIError("You can only update your own posts", 403);
    }

    const updatedPost = await Post.findByIdAndUpdate(id, postData, { new: true });
    return updatedPost;
}

const deletePostById = async (id, userId) => {
    const post = await Post.findById(id);
    if (!post) {
        return null;
    }

    // Check if user is the author
    if (post.user.toString() !== userId.toString()) {
        throw new APIError("You can only delete your own posts", 403);
    }

    const deletedPost = await Post.findByIdAndDelete(id);
    return deletedPost;
}


module.exports = { createPost, getAllPosts, getPostById, updatePostById, deletePostById };
