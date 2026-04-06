const {
  sendVerificationEmail,
  sendPasswordResetEmail,
} = require("../configuration/verifyEmailConfig");
const bcrypt = require("bcryptjs");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const { handleSuccess, handleError } = require("../utils/responseHandler");

dotenv.config();

/** Generate a 6-digit numeric OTP */
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// ─────────────────────────────────────────────
// Registration
// ─────────────────────────────────────────────
const saveInfo = async (req, res) => {
  try {
    const userData = req.body;

    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { username: userData.username }],
    });

    if (existingUser) {
      if (existingUser.email === userData.email)
        return handleError(res, null, "Email is already registered.");
      if (existingUser.username === userData.username)
        return handleError(res, null, "Username is already taken.");
    }

    if (!userData.password)
      return handleError(res, null, "Password is missing");

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Generate OTP
    const code = generateOTP();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const newUser = new User({
      ...userData,
      password: hashedPassword,
      emailVerificationCode: code,
      emailVerificationCodeExpiry: expiry,
      isVerified: false,
    });

    await newUser.save();
    await sendVerificationEmail(userData.email, code);

    handleSuccess(
      res,
      { email: userData.email },
      "User registered successfully. Check your email for the verification code."
    );
  } catch (error) {
    console.error("Error during user registration:", error);
    handleError(res, error, "Failed to register user");
  }
};

// ─────────────────────────────────────────────
// Email Verification (OTP)
// ─────────────────────────────────────────────
const verifyEmail = async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ email }).select(
      "+emailVerificationCode +emailVerificationCodeExpiry"
    );

    if (!user) return handleError(res, null, "User not found.");

    if (user.isVerified)
      return handleSuccess(res, null, "Email is already verified.");

    if (!user.emailVerificationCode || !user.emailVerificationCodeExpiry) {
      return handleError(res, null, "No verification code found. Please register again.");
    }

    if (new Date() > user.emailVerificationCodeExpiry) {
      return handleError(res, null, "Verification code has expired. Please request a new one.");
    }

    if (user.emailVerificationCode !== code) {
      return handleError(res, null, "Invalid verification code.");
    }

    user.isVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationCodeExpiry = undefined;
    await user.save();

    handleSuccess(res, null, "Email verified successfully.");
  } catch (error) {
    console.error("Error verifying email:", error);
    handleError(res, error, "Failed to verify email");
  }
};

// ─────────────────────────────────────────────
// Resend Email Verification Code
// ─────────────────────────────────────────────
const resendVerificationCode = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return handleError(res, null, "User not found.");
    if (user.isVerified)
      return handleSuccess(res, null, "Email is already verified.");

    const code = generateOTP();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    user.emailVerificationCode = code;
    user.emailVerificationCodeExpiry = expiry;
    await user.save();

    await sendVerificationEmail(email, code);
    handleSuccess(res, null, "Verification code resent. Check your email.");
  } catch (error) {
    console.error("Error resending verification code:", error);
    handleError(res, error, "Failed to resend verification code");
  }
};

// ─────────────────────────────────────────────
// Forgot Password – send reset code
// ─────────────────────────────────────────────
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return handleError(res, null, "User not found.");

    const code = generateOTP();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    user.resetCode = code;
    user.resetCodeExpiry = expiry;
    await user.save();

    await sendPasswordResetEmail(email, code);
    res.json({ message: "Password reset code sent to your email." });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// Verify Reset Code
// ─────────────────────────────────────────────
const verifyResetCode = async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ email }).select(
      "+resetCode +resetCodeExpiry"
    );

    if (!user) return handleError(res, null, "User not found.");

    if (!user.resetCode || !user.resetCodeExpiry) {
      return handleError(res, null, "No reset code found. Please request a new one.");
    }

    if (new Date() > user.resetCodeExpiry) {
      return handleError(res, null, "Reset code has expired. Please request a new one.");
    }

    if (user.resetCode !== code) {
      return handleError(res, null, "Invalid reset code.");
    }

    // Code is valid – clear it so it can't be reused
    user.resetCode = "";
    user.resetCodeExpiry = undefined;
    await user.save();

    res.json({ message: "Code verified. You may now reset your password." });
  } catch (error) {
    console.error("Error in verifyResetCode:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// Reset Password (after code verified)
// ─────────────────────────────────────────────
const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ message: "User not found." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    // Update password in Firebase Authentication
    await admin.auth().updateUser(user.firebase_uid, { password });

    res.json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// User Info Getters / Updater (unchanged)
// ─────────────────────────────────────────────
const getInfo = async (req, res) => {
  try {
    const { firebase_uid } = req.params;
    const user = await User.findOne({ firebase_uid });

    if (!user) return handleSuccess(res, null, "No user found");
    if (!user.isVerified) return handleSuccess(res, null, "User Email is not verified");

    handleSuccess(res, user, "User information retrieved successfully");
  } catch (error) {
    console.error("Error getting user info:", error);
    handleError(res, error, "Failed to retrieve user information");
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) return handleSuccess(res, null, "No user found");

    handleSuccess(res, user, "User information retrieved successfully");
  } catch (error) {
    console.error("Error getting user info:", error);
    handleError(res, error, "Failed to retrieve user information");
  }
};

const getOtherUserInfo = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id });

    if (!user) return handleSuccess(res, null, "No user found");

    handleSuccess(res, user, "User information retrieved successfully");
  } catch (error) {
    console.error("Error getting user info:", error);
    handleError(res, error, "Failed to retrieve user information");
  }
};

const updateInfo = async (req, res) => {
  try {
    const { firebase_uid } = req.params;

    const user = await User.findOneAndUpdate({ firebase_uid }, req.body, {
      new: true,
    });

    if (!user) return handleSuccess(res, null, "No user found");

    handleSuccess(res, user, "User information updated successfully");
  } catch (error) {
    console.error("Error updating user info:", error);
    handleError(res, error, "Failed to update user information");
  }
};

module.exports = {
  saveInfo,
  getInfo,
  getUserInfo,
  getOtherUserInfo,
  updateInfo,
  verifyEmail,
  resendVerificationCode,
  forgotPassword,
  verifyResetCode,
  resetPassword,
};
