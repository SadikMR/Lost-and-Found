const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, required: true },
    answer1: { type: String, required: true },
    answer2: { type: String, required: true },
    isSuccess: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attempt", attemptSchema);
