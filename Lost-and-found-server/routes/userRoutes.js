const express = require("express");
const { saveInfo, getInfo } = require("../controllers/userController");
const validateUserInfo = require("../middleware/validateUserInfo");

const router = express.Router();

// Registration route
router.post("/saveInfo", validateUserInfo, saveInfo);
router.get("/getInfo/:firebase_uid", getInfo);

module.exports = router;
