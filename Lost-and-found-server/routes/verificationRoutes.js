const express = require("express");
const {
  verifyOwnership,
  getAttempts,
  getDailyAttempts,
} = require("../controllers/verifyOwnershipController");

const router = express.Router();

router.post("/Ownership", verifyOwnership);
router.get("/getAttempts/:userId/:postId", getAttempts);
router.get("/getDailyAttempts/:userId", getDailyAttempts);

module.exports = router;
