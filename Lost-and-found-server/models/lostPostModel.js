const mongoose = require("mongoose");

const lostPostSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    productName: { type: String, required: true },
    color: { type: String, default: "none" },
    brand: { type: String, default: "none" },
    description: { type: String, default: "none" },
    possibleLocation: { type: String, required: true },
    possibleDate: { type: String, required: true },
    image: String,
    type: { type: String, default: "lost" },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LostPost", lostPostSchema);
