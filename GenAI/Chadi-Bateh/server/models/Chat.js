const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    mode: {
      type: String,
      enum: ["text", "vision", "file", "image"],
      default: "text",
    },
    imageUrl: String,
    context: String,
    replyTo: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true },
);

const chatSchema = new Schema(
  {
    title: {
      type: String,
      default: "New Chat",
    },
    model: {
      type: String,
      default: "gpt-4o-mini",
    },
    mode: {
      type: String,
      enum: ["text", "vision", "file", "image"],
      default: "text",
    },
    messages: [messageSchema],
  },
  { timestamps: true },
);

chatSchema.pre("save", function setTitle() {
  if (!this.title || this.title === "New Chat") {
    const firstUserMessage = this.messages.find((msg) => msg.role === "user" && msg.content?.trim());

    if (firstUserMessage) {
      this.title = firstUserMessage.content.trim().slice(0, 48);
    }
  }
});

module.exports = mongoose.model("Chat", chatSchema);
