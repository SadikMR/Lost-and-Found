const express = require("express");
const router = express.Router();
const {
  getAllLostPosts,
  createLostPost,
} = require("../controllers/lostPostController");
const validatePost = require("../middleware/validatePost");

router.get("/", getAllLostPosts);
router.post("/", validatePost, createLostPost);

module.exports = router;
