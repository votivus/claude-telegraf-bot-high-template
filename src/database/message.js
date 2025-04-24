const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      ref: "User",
    },
    messageId: {
      type: Number,
    },
    chatId: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
    },
    type: {
      type: String,
      enum: [
        "text",
        "photo",
        "video",
        "document",
        "sticker",
        "voice",
        "location",
        "contact",
        "other",
      ],
      default: "text",
    },
    fileId: {
      type: String,
    },
    replyToMessageId: {
      type: Number,
    },
    forwardFromId: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
