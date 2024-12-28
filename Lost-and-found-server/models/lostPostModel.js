const mongoose = require("mongoose");

const lostPostSchema = new mongoose.Schema({
  category: { type: String, required: true },
  productName: { type: String, required: true },
  color: String,
  brand: String,
  description: String,
  possibleLocation: { type: String, required: true },
  possibleDate: { type: String, required: true },
  image: String,
});

module.exports = mongoose.model("LostPost", lostPostSchema);
