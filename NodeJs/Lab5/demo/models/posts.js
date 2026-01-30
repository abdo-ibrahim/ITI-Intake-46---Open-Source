const mongoose = require('mongoose');

// schema
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    tags: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

// model
const Post = mongoose.model('Post', postSchema);


module.exports = Post;
