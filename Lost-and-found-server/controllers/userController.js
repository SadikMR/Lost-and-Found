const { emailVerifyGenerateToken } = require("../utils/emailVerifyGenerateToken");
const { sendVerificationEmail } = require("../configuration/verifyEmailConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const { handleSuccess, handleError } = require("../utils/responseHandler"); // Import utilities

const saveInfo = async (req, res) => {
  try {
    // Extract all fields from req.body
    const userData = req.body;

    console.log("User data: ", userData);

    // Check if email already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return handleError(res, null, "User already exists");
    }

    // Debug: Check if password is undefined or empty
    if (!userData.password) {
      return handleError(res, null, "Password is missing");
    }

    console.log("User data: shahin ", userData.email, userData.password);
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Generate verification token
    const verificationToken = emailVerifyGenerateToken(userData.email, userData._id);

    // Create new user with all request body fields
    const newUser = new User({
      ...userData,  // Spread all request body values
      password: hashedPassword, // Replace plain password with hashed password
      verificationToken, // Add verification token
      isVerified: false, // Ensure the user isn't verified at registration
    });

    // Save user to the database
    await newUser.save();

    // Send verification email
    await sendVerificationEmail(userData.email, verificationToken);

    // Success response
    handleSuccess(res, newUser, "User registered successfully. Please verify your email.");
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

const updateInfo = async (req, res) => {
  try {
    const { firebase_uid } = req.params;

    const user = await User.findOneAndUpdate({ firebase_uid }, req.body, {
      new: true,
    });

    if (!user) {
      handleSuccess(res, null, "No user found");
    }

    handleSuccess(res, user, "User information updated successfully");
  } catch (error) {
    console.error("Error updating user info:", error);
    handleError(res, error, "Failed to update user information");
  }
};



module.exports = { saveInfo, getInfo, updateInfo, verifyEmail };
