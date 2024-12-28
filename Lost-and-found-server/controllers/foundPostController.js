const FoundPost = require("../models/foundPostModel");
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

// Create a new found post
const createFoundPost = async (req, res) => {
  try {
    const newFoundPost = new FoundPost(req.body);
    const savedPost = await newFoundPost.save();
    handleSuccess(res, savedPost, "Found post created successfully");
  } catch (error) {
    handleError(res, error);
  }
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

module.exports = { getAllFoundPosts, createFoundPost, searchFoundPosts };
