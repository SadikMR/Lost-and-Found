const FoundPost = require("../models/foundPostModel");
const { handleSuccess, handleError } = require("../utils/responseHandler");

const getAllFoundPosts = async (req, res) => {
  try {
    const foundPosts = await FoundPost.find();
    handleSuccess(res, foundPosts, "Found posts retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

const createFoundPost = async (req, res) => {
  try {
    const newFoundPost = new FoundPost(req.body);
    const savedPost = await newFoundPost.save();
    handleSuccess(res, savedPost, "Found post created successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { getAllFoundPosts, createFoundPost };
