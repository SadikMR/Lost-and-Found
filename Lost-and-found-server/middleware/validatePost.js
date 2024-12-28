const validatePost = (req, res, next) => {
  const { category, productName, possibleLocation, possibleDate } = req.body;

  // Log the incoming data
  console.log("Received data:", req.body);

  // Validate required fields
  if (!category || !productName || !possibleLocation || !possibleDate) {
    return res.status(400).json({
      success: false,
      message:
        "category, productName, possibleLocation, and possibleDate are required.",
    });
  }

  next();
};

module.exports = validatePost;
