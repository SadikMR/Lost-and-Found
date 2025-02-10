const express = require("express");
const { verifyOwnership } = require("../controllers/verifyOwnershipController");

const router = express.Router();

router.post("/Ownership", verifyOwnership);

module.exports = router;
