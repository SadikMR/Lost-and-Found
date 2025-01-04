const express = require("express");
const { saveInfo, getInfo } = require("../controllers/userController");
const validateUserInfo = require("../middleware/validateUserInfo");

const router = express.Router();

router.post("/saveInfo", validateUserInfo, saveInfo);
router.get("/getInfo/:firebase_uid", getInfo);
// router.put("/updateInfo/:firebase_uid", updateInfo);

module.exports = router;
