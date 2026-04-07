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
    image: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    emailVerificationCode: { type: String, select: false },
    emailVerificationCodeExpiry: { type: Date, select: false },
    resetCode: { type: String, select: false, default: "" },
    resetCodeExpiry: { type: Date, select: false },
  },
  { timestamps: true }
);

// Clear email verification code after successful verification
userSchema.methods.clearVerificationCode = async function () {
  this.emailVerificationCode = undefined;
  this.emailVerificationCodeExpiry = undefined;
  await this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
