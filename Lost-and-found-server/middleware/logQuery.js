const logQuery = (req, res, next) => {
  console.log("Request Query Parameters:", req.query);
  next();
};

module.exports = logQuery;
