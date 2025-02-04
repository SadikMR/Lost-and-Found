const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    senderID: { type: String, required: true }, // Use firebase_uid (String)
    receiverID: { type: String, required: true },
    latestMessage: { type: String },
    latestMessageTime: { type: Date },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
