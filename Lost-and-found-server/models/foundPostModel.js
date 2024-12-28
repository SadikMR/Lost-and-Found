const mongoose = require("mongoose");

const foundPostSchema = new mongoose.Schema({
  category: { type: String, required: true },
  productName: { type: String, required: true },
  color: String,
  brand: String,
  description: String,
  possibleLocation: { type: String, required: true },
  possibleDate: { type: String, required: true },
  image: String,
});

module.exports = mongoose.model("FoundPost", foundPostSchema);
