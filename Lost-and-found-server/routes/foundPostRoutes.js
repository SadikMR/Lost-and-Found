const express = require("express");
const router = express.Router();
const {
  getAllFoundPosts,
  createFoundPost,
  searchFoundPosts,
} = require("../controllers/foundPostController");
const validatePost = require("../middleware/validatePost");
const logQuery = require("../middleware/logQuery");

// Get all found posts
router.get("/", getAllFoundPosts);

// Search found posts based on query parameters
router.get("/search", logQuery, searchFoundPosts);

// Create a new found post
router.post("/", validatePost, createFoundPost);

module.exports = router;
