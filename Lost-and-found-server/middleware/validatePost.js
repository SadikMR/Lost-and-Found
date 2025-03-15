const validatePost = (req, res, next) => {
  const { category, productName, division, zilla, upzilla, possibleDate } = req.body;

  console.log("Received data:", req.body);

  if (!category || !productName || !division || !zilla || !upzilla || !possibleDate) {
    return res.status(400).json({
      success: false,
      message:
        "category, productName, division, zilla, upzilla, and possibleDate are required.",
    });
  }

  next();
};

module.exports = validatePost;
