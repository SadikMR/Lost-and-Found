const express = require("express");
const router = express.Router();
const {
  getAllLostPosts,
  createLostPost,
  searchLostPosts,
} = require("../controllers/lostPostController");
const validatePost = require("../middleware/validatePost");
const logQuery = require("../middleware/logQuery"); //

// Get all lost posts
router.get("/", getAllLostPosts);

// Search lost posts based on query parameters
router.get("/search", logQuery, searchLostPosts);

// Create a new lost post
router.post("/", validatePost, createLostPost);

module.exports = router;
