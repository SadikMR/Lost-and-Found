const express = require("express");
const router = express.Router();
const {
  getAllFoundPosts,
  getSpecificFoundPosts,
  createFoundPost,
  updatefoundpost,
  deleteFoundPost,
  searchFoundPosts,
  getCurrentUserFoundPosts,
} = require("../controllers/foundPostController");
const validatePost = require("../middleware/validatePost");
const logQuery = require("../middleware/logQuery");

// Get all found posts
router.get("/", getAllFoundPosts);

// Search found posts based on query parameters
router.get("/search", logQuery, searchFoundPosts);

// search all found posts for a specific user
router.get("/:firebase_uid", getCurrentUserFoundPosts);

// Get specific found post by post _id
router.get("/getSpecificFoundPosts/:_id", getSpecificFoundPosts);

// Create a new found post
router.post("/", validatePost, createFoundPost);

//Update a found post
router.put("/:id", validatePost, updatefoundpost);

// Delete a found post by _id
router.delete("/:id", deleteFoundPost);

module.exports = router;
