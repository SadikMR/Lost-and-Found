const FoundPost = require("../models/foundPostModel");
const mongoose = require("mongoose");
const { handleSuccess, handleError } = require("../utils/responseHandler");

const hasPostedWithin24Hours = async (firebase_uid) => {
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24); // Subtract 24 hours

  const existingPost = await FoundPost.findOne({
    firebase_uid: firebase_uid,
    createdAt: { $gte: twentyFourHoursAgo }, // Check if a post exists within 24 hours
  });

  return !!existingPost; // Return true if a post exists, false otherwise
};

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
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format" });
    }

    const specificFoundPost = await FoundPost.findOne({ _id });

    if (!specificFoundPost) {
      return res
        .status(404)
        .json({ success: false, message: "Found post not found" });
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
    handleSuccess(
      res,
      UserFoundposts,
      "Current user Found posts retrieved successfully"
    );
  } catch (error) {
    handleError(res, error);
  }
};

// Create a new found post
const createFoundPost = async (req, res) => {
  try {
    const { firebase_uid } = req.body;
    // Check if the user has posted a found post in the last 24 hours
    if (await hasPostedWithin24Hours(firebase_uid)) {
      return res.status(400).json({
        success: false,
        message: "Limit Over",
      });
    }
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
};

// delete a specific found post
const deleteFoundPost = async (req, res) => {
  const { id } = req.params;
  const query = { _id: new mongoose.Types.ObjectId(id) };
  // console.log("Query date delete post : ",query);
  const result = await FoundPost.deleteOne(query);
  handleSuccess(res, result, "Found post deleted successfully");
};

const searchFoundPosts = async (req, res) => {
  try {
    const { category, zilla, possibleDate } = req.query;

    // Prepare the query object
    let query = {};

    if (category) query.category = category;
    if (zilla) query.zilla = zilla;

    // If possibleDate is provided, filter posts with date <= possibleDate
    if (possibleDate) {
      query.possibleDate = { $lte: possibleDate }; // This ensures we get posts with the same or earlier date
    }

    // Fetch posts from the database based on the query
    const foundPosts = await FoundPost.find(query);

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

module.exports = {
  getAllFoundPosts,
  getSpecificFoundPosts,
  createFoundPost,
  updatefoundpost,
  deleteFoundPost,
  searchFoundPosts,
  getCurrentUserFoundPosts,
};
