const express = require("express");
const {
  verifyOwnership,
  getAttempts,
} = require("../controllers/verifyOwnershipController");

const router = express.Router();

router.post("/Ownership", verifyOwnership);
router.get("/getAttempts/:userId/:postId", getAttempts);

module.exports = router;
