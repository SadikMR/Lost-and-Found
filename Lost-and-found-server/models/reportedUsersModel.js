const mongoose = require("mongoose");

const reportedUserSchema = new mongoose.Schema({
  reportedUserId: {
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

const ReportedUsers = mongoose.model("ReportedUsers", reportedUserSchema);
module.exports = ReportedUsers;
