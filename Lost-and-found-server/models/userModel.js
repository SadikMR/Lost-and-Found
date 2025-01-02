const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebase_uid: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, requied: true },
    phone: { type: String, required: true },
    division: { type: String },
    zilla: { type: String },
    upzilla: { type: String },
    village: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
