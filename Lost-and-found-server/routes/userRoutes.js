const express = require("express");
const { saveInfo, getInfo, updateInfo, verifyEmail, resetPassword, forgotPassword } = require("../controllers/userController");
const validateUserInfo = require("../middleware/validateUserInfo");


const router = express.Router();

router.post("/saveInfo", validateUserInfo, saveInfo);
router.get("/getInfo/:firebase_uid", getInfo);
router.put("/updateInfo/:firebase_uid", updateInfo);

router.get("/verifyEmail/:token", verifyEmail);

router.post("/resetPassword/:token", resetPassword);
router.post("/forgotPassword", forgotPassword);


module.exports = router;
