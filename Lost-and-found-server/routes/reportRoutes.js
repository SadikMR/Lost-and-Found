const express = require("express");
const { reportUser } = require("../controllers/reportController");
const { reportPost } = require("../controllers/reportController");

const router = express.Router();

// Route to report a user
router.post("/user", reportUser);
router.post("/post", reportPost);

module.exports = router;
