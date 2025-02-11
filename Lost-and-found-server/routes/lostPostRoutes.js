const express = require("express");
const router = express.Router();
const {
  getAllLostPosts,
  createLostPost,
  getSpecificLostPosts,
  updateLostpost,
  deleteLostPost,
  searchLostPosts,
  getCurrentUserLostPosts,
} = require("../controllers/lostPostController");
const validatePost = require("../middleware/validatePost");
const logQuery = require("../middleware/logQuery"); //

// Get all lost posts
router.get("/", getAllLostPosts);

// Search lost posts based on query parameters
router.get("/search", logQuery, searchLostPosts);

// Search all lost posts for a specific user
router.get("/:firebase_uid", getCurrentUserLostPosts);

// Get specific lost post by post _id
router.get("/getSpecificLostPosts/:_id", getSpecificLostPosts);

// Create a new lost post
router.post("/", validatePost, createLostPost);

//Update a Lost post
router.put("/:id", validatePost, updateLostpost);

// Delete a specific lost post by post _id
router.delete("/:id", deleteLostPost);

module.exports = router;
