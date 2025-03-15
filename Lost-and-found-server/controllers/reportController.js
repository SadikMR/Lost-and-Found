const ReportedUsers = require("../models/reportedUsersModel");

// Function to report a user
const reportUser = async (req, res) => {
  try {
    const { reportedUserId, reporterUserId, reason, specifiedReason } =
      req.body;

    // Log the incoming request body to the console
    console.log("Request Body:", req.body);

    // Validate input
    if (!reportedUserId || !reporterUserId || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Prevent users from reporting themselves
    /* if (reportedUserId === reporterUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot report yourself.",
      });
    } */

    // Ensure `specifiedReason` is required when "Other" is selected
    if (reason === "Other" && !specifiedReason) {
      return res.status(400).json({
        success: false,
        message: "Please provide more details for 'Other' reason.",
      });
    }

    // Create a new report
    const newReport = new ReportedUsers({
      reportedUserId,
      reporterUserId,
      reason,
      specifiedReason: specifiedReason || "",
    });

    await newReport.save();

    return res.status(201).json({
      success: true,
      message: "User reported successfully.",
    });
  } catch (error) {
    console.error("Error reporting user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// Export the function
module.exports = { reportUser };
