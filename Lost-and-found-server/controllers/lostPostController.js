const mongoose = require("mongoose");
const LostPost = require("../models/lostPostModel");
const { handleSuccess, handleError } = require("../utils/responseHandler");

// Get all lost posts
const getAllLostPosts = async (req, res) => {
  try {
    const lostPosts = await LostPost.find().sort({ createdAt: -1 });
    handleSuccess(res, lostPosts, "Lost posts retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

// Get specific found post by post _id
const getSpecificLostPosts = async (req, res) => {
  try {
    const { _id } = req.params;

    // Ensure the _id is converted to ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const specificLostPost = await LostPost.findOne({ _id });

    if (!specificLostPost) {
      return res.status(404).json({ success: false, message: "Found post not found" });
    }

    // Respond with the found post
    res.status(200).json({
      success: true,
      message: "Lost post retrieved successfully",
      data: specificLostPost,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

// Get current user lost posts
const getCurrentUserLostPosts = async (req, res) => {
  try {
    const { firebase_uid } = req.params;
    const UserLostposts = await LostPost.find({ firebase_uid });
    handleSuccess(res, UserLostposts, "Current user Lost posts retrieved successfully");
  } catch (error) {
    console.error("Error getting user lost posts info:", error);
    handleError(res, error, "Failed to retrieve user lost posts information");
  }
};

// Create a new lost post
const createLostPost = async (req, res) => {
  try {
    const newLostPost = new LostPost(req.body);
    const savedPost = await newLostPost.save();
    handleSuccess(res, savedPost, "Lost post created successfully");
  } catch (error) {
    handleError(res, error);
  }
};


// update a specific found post
const updateLostpost = async (req, res) => {
  const { id } = req.params;
  const filter = { _id: new mongoose.Types.ObjectId(id) };
  const options = { upsert: true };
  const updateData = req.body;

  const updateMatch = {
    $set: {
      firebase_uid: updateData.firebase_uid,
      category: updateData.category,
      productName: updateData.productName,
      color: updateData.color,
      brand: updateData.brand,
      description: updateData.description,
      possibleLocation: updateData.possibleLocation,
      possibleDate: updateData.possibleDate,
      image: updateData.image,
    },
  };
  const result = await LostPost.updateOne(filter, updateMatch, options);
  handleSuccess(res, result, "Found post updated successfully");
};


// Delete a specific lost post by post _id
const deleteLostPost = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: new mongoose.Types.ObjectId(id) };
    const result = await LostPost.deleteOne(query);
    handleSuccess(res, result, "Lost post deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
}

//search based on query
const searchLostPosts = async (req, res) => {
  try {
    const lostPosts = await LostPost.find(req.query);

    if (lostPosts.length === 0) {
      return handleSuccess(
        res,
        [],
        "No lost posts found for the given search criteria"
      );
    }

    handleSuccess(res, lostPosts, "Lost posts retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { getAllLostPosts, createLostPost, getSpecificLostPosts, updateLostpost, deleteLostPost, searchLostPosts, getCurrentUserLostPosts };
