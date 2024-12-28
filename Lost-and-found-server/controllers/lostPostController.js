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

module.exports = { getAllLostPosts, createLostPost, searchLostPosts };
