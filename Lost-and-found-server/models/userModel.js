const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebase_uid: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },  // ✅ Prevents password from being returned in queries
    phone: { type: String, required: true },
    division: { type: String },
    zilla: { type: String },
    upzilla: { type: String },
    village: { type: String },
    image: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, select: false },  // ✅ Hides token from queries
    resetToken: { type: String, select: false , default: ""},  // ✅ Hides token from queries
  },
  { timestamps: true }
);

// Remove `verificationToken` after successful email verification
userSchema.methods.clearVerificationToken = async function () {
  this.verificationToken = undefined;
  await this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
