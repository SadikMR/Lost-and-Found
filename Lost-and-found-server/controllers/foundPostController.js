const FoundPost = require("../models/foundPostModel");
const mongoose = require("mongoose");
const { handleSuccess, handleError } = require("../utils/responseHandler");

// Get all found posts
const getAllFoundPosts = async (req, res) => {
  try {
    const foundPosts = await FoundPost.find().sort({ createdAt: -1 });
    handleSuccess(res, foundPosts, "Found posts retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

// Get specific found post by post _id
const getSpecificFoundPosts = async (req, res) => {
  try {
    const { _id } = req.params;

    // Ensure the _id is converted to ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const specificFoundPost = await FoundPost.findOne({ _id });

    if (!specificFoundPost) {
      return res.status(404).json({ success: false, message: "Found post not found" });
    }

    // Respond with the found post
    res.status(200).json({
      success: true,
      message: "Found post retrieved successfully",
      data: specificFoundPost,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};


const getCurrentUserFoundPosts = async (req, res) => {
  try {
    const { firebase_uid } = req.params;
    const UserFoundposts = await FoundPost.find({ firebase_uid });
    handleSuccess(res, UserFoundposts, "Current user Found posts retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

// Create a new found post
const createFoundPost = async (req, res) => {
  try {
    console.log("Received new found post data:", req.body);
    const newFoundPost = new FoundPost(req.body);
    const savedPost = await newFoundPost.save();
    handleSuccess(res, savedPost, "Found post created successfully");
  } catch (error) {
    handleError(res, error);
  }
};

// update a specific found post
const updatefoundpost = async (req, res) => {
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
      division: updateData.division,
      zilla: updateData.zilla,
      upzilla: updateData.upzilla,
      possibleDate: updateData.possibleDate,
      image: updateData.image,
    },
  };
  const result = await FoundPost.updateOne(filter, updateMatch, options);
  handleSuccess(res, result, "Found post updated successfully");
}

// delete a specific found post
const deleteFoundPost = async (req, res) => {
  const { id } = req.params;
  const query = { _id: new mongoose.Types.ObjectId(id) };
  // console.log("Query date delete post : ",query);
  const result = await FoundPost.deleteOne(query);
  handleSuccess(res, result, "Found post deleted successfully");
};


//search based on query
const searchFoundPosts = async (req, res) => {
  try {
    const foundPosts = await FoundPost.find(req.query);

    if (foundPosts.length === 0) {
      return handleSuccess(
        res,
        [],
        "No found posts found for the given search criteria"
      );
    }

    handleSuccess(res, foundPosts, "Found posts retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { getAllFoundPosts, getSpecificFoundPosts, createFoundPost, updatefoundpost, deleteFoundPost, searchFoundPosts, getCurrentUserFoundPosts };
