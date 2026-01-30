const mongoose = require("mongoose");
const User = require("./userModel");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    author: {
      type: String,
      required: true,
    },
    tags: [String],
    published: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
