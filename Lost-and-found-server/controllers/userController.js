const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { handleSuccess, handleError } = require("../utils/responseHandler"); // Import utilities

// Registration API
const saveInfo = async (req, res) => {
  try {
    const {
      firebase_uid, // Firebase UID (comes from the front-end or Firebase authentication)
      fullname,
      username,
      email,
      phone,
      division,
      zilla,
      upzilla,
      village,
      image,
    } = req.body;

    // Create a new user document
    const newUser = new User({
      firebase_uid, // Store Firebase UID
      fullname,
      username,
      email,
      phone,
      division,
      zilla,
      upzilla,
      village,
      image,
    });

    // Save the user to MongoDB
    await newUser.save();

    handleSuccess(res, newUser, "User registered successfully");
  } catch (error) {
    console.error("Error during user registration:", error);
    handleError(res, error, "Failed to register user");
  }
};

const getInfo = async (req, res) => {
  try {
    const { firebase_uid } = req.params;

    const user = await User.findOne({ firebase_uid });

    if (!user) {
      handleSuccess(res, null, "No user found");
    }

    handleSuccess(res, user, "User information retrieved successfully");
  } catch (error) {
    console.error("Error getting user info:", error);
    handleError(res, error, "Failed to retrieve user information");
  }
};

module.exports = { saveInfo, getInfo };
