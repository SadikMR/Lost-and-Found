const mongoose = require("mongoose");

const reportedPostSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId without ref
    required: true,
  },
  postType: {
    type: String,
    required: true,
  },
  reporterUserId: {
    type: String,
    required: true,
  },
  reason: { type: String, required: true }, // Main reason
  specifiedReason: { type: String, default: "" }, // Additional user explanation
  createdAt: { type: Date, default: Date.now },
});

const ReportedPosts = mongoose.model("ReportedPosts", reportedPostSchema);
module.exports = ReportedPosts;
