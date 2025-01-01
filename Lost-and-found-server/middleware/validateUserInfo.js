const validateRegistration = (req, res, next) => {
  const { fullname, username, email } = req.body;

  if (!fullname || !username || !email) {
    return res.status(400).json({
      success: false,
      message: "fullname, username, email and password fields are required",
    });
  }

  next(); // Proceed to the next middleware or controller
};

module.exports = validateRegistration;
