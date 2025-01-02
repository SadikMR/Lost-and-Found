const User = require("../models/userModel");
const { handleSuccess, handleError } = require("../utils/responseHandler"); // Import utilities

const saveInfo = async (req, res) => {
  try {
    const newUser = new User(req.body);

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
