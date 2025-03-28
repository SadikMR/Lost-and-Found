const {
  emailVerifyGenerateToken,
} = require("../utils/emailVerifyGenerateToken");
const { sendVerificationEmail } = require("../configuration/verifyEmailConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const { handleSuccess, handleError } = require("../utils/responseHandler"); // Import utilities

// const endpoint = process.env.FRONTEND_URL.trim();

// Initialize Firebase Admin SDK (if not already initialized)

const saveInfo = async (req, res) => {
  try {
    // Extract all fields from req.body
    const userData = req.body;

    // console.log("User data: ", userData);

    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { username: userData.username }],
    });

    if (existingUser) {
      if (existingUser.email === userData.email) {
        return handleError(res, null, "Email is already registered.");
      }
      if (existingUser.username === userData.username) {
        return handleError(res, null, "Username is already taken.");
      }
    }
    // Debug: Check if password is undefined or empty
    if (!userData.password) {
      return handleError(res, null, "Password is missing");
    }

    // console.log("User data: shahin ", userData.email, userData.password);
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Generate verification token
    const verificationToken = emailVerifyGenerateToken(
      userData.email,
      userData._id
    );

    // Create new user with all request body fields
    const newUser = new User({
      ...userData, // Spread all request body values
      password: hashedPassword, // Replace plain password with hashed password
      verificationToken, // Add verification token
      isVerified: false, // Ensure the user isn't verified at registration
    });

    // Save user to the database
    await newUser.save();

    // Send verification email
    await sendVerificationEmail(userData.email, verificationToken);

    // Success response
    handleSuccess(
      res,
      newUser,
      "User registered successfully. Please verify your email."
    );
  } catch (error) {
    console.error("Error during user registration:", error);
    handleError(res, error, "Failed to register user");
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOneAndUpdate(
      { email: decoded.email },
      { isVerified: true, verificationToken: null },
      { new: true }
    );

    if (!user) {
      return handleError(res, null, "User not found");
    }

    handleSuccess(res, user, "Email verified successfully");
  } catch (error) {
    console.error("Error verifying email:", error);
    handleError(res, error, "Failed to verify email");
  }
};

// After reset password, database password updated according to firebase password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return handleError(res, null, "User not found");
    }

    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    user.resetToken = resetToken;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL.trim()}/login/resetPassword/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      text: `Click the link to reset your password: ${resetLink}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ message: "Password reset email sent" });
    } catch (mailError) {
      console.error("Error sending email:", mailError);
      return res
        .status(500)
        .json({ message: "Failed to send password reset email" });
    }
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ resetToken: token });

    // console.log("User of reset password ", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetToken = ""; // Clear the reset token after use
    await user.save();

    // Update password in Firebase Authentication
    await admin.auth().updateUser(user.firebase_uid, { password });
    res.json({
      message: "Password reset successfully in both database and Firebase",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getInfo = async (req, res) => {
  try {
    const { firebase_uid } = req.params;

    const user = await User.findOne({ firebase_uid });

    if (!user) {
      handleSuccess(res, null, "No user found");
    }

    if (!user.isVerified) {
      handleSuccess(res, null, "User Email is not verified");
    }

    handleSuccess(res, user, "User information retrieved successfully");
  } catch (error) {
    console.error("Error getting user info:", error);
    handleError(res, error, "Failed to retrieve user information");
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { email } = req.params;

    console.log("Email received: ", email);

    const user = await User.findOne({ email });
    console.log("User found: ", user);

    if (!user) {
      handleSuccess(res, null, "No user found");
    }

    handleSuccess(res, user, "User information retrieved successfully");
  } catch (error) {
    console.error("Error getting user info:", error);
    handleError(res, error, "Failed to retrieve user information");
  }
};

const getOtherUserInfo = async (req, res) => {
  try {
    const { _id } = req.params;

    console.log("Email received: ", _id);

    const user = await User.findOne({ _id });
    console.log("User found: ", user);

    if (!user) {
      handleSuccess(res, null, "No user found");
    }

    handleSuccess(res, user, "User information retrieved successfully");
  } catch (error) {
    console.error("Error getting user info:", error);
    handleError(res, error, "Failed to retrieve user information");
  }
};

const updateInfo = async (req, res) => {
  try {
    // Log the received request body
    console.log("Received request body:", req.body);

    const { firebase_uid } = req.params;

    // Handle Base64 image if provided in request body
    if (req.body.image) {
      console.log("Received Base64 image");
    }

    // Find and update the user
    const user = await User.findOneAndUpdate({ firebase_uid }, req.body, {
      new: true,
    });

    if (!user) {
      return handleSuccess(res, null, "No user found");
    }

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
  forgotPassword,
  resetPassword,
};
