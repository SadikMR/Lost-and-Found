const express = require("express");
const router = express.Router();
const {
  getAllFoundPosts,
  createFoundPost,
} = require("../controllers/foundPostController");
const validatePost = require("../middleware/validatePost");

router.get("/", getAllFoundPosts);
router.post("/", validatePost, createFoundPost);

module.exports = router;
