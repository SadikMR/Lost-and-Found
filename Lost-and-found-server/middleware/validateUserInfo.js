const validateRegistration = (req, res, next) => {
  const { fullname, username, email } = req.body;

  console.log("Received new user data:", fullname, username, email);
  if (!fullname || !username || !email) {
    return res.status(400).json({
      success: false,
      message: "fullname, username, email and password fields are required",
    });
  }

  next();
};

module.exports = validateRegistration;
