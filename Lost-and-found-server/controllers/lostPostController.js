const LostPost = require("../models/lostPostModel");
const { handleSuccess, handleError } = require("../utils/responseHandler");

const getAllLostPosts = async (req, res) => {
  try {
    const lostPosts = await LostPost.find();
    handleSuccess(res, lostPosts, "Lost posts retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

const createLostPost = async (req, res) => {
  try {
    const newLostPost = new LostPost(req.body);
    const savedPost = await newLostPost.save();
    handleSuccess(res, savedPost, "Lost post created successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { getAllLostPosts, createLostPost };
