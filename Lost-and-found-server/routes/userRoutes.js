const express = require("express");
const {
  saveInfo,
  getInfo,
  getUserInfo,
  getOtherUserInfo,
  updateInfo,
  verifyEmail,
  resendVerificationCode,
  resetPassword,
  forgotPassword,
  verifyResetCode,
} = require("../controllers/userController");
const validateUserInfo = require("../middleware/validateUserInfo");

const router = express.Router();

// User CRUD
router.post("/saveInfo", validateUserInfo, saveInfo);
router.get("/getInfo/:firebase_uid", getInfo);
router.get("/getUserInfo/:email", getUserInfo);
router.get("/getOtherUserInfo/:_id", getOtherUserInfo);
router.put("/updateInfo/:firebase_uid", updateInfo);

// Email verification (OTP code)
router.post("/verifyEmail", verifyEmail);
router.post("/resendVerificationCode", resendVerificationCode);

// Password reset (OTP code)
router.post("/forgotPassword", forgotPassword);
router.post("/verifyResetCode", verifyResetCode);
router.post("/resetPassword", resetPassword);

module.exports = router;
