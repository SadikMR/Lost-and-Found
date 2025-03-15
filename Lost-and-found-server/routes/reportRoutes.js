const express = require("express");
const { reportUser } = require("../controllers/reportController");

const router = express.Router();

// Route to report a user
router.post("/user", reportUser);

module.exports = router;
