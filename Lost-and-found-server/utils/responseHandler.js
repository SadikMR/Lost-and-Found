const handleSuccess = (res, data, message = "Request successful") => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

const handleError = (res, error, message = "An error occurred") => {
  res.status(500).json({
    success: false,
    message,
    error: error.message || message,
  });
};

module.exports = { handleSuccess, handleError };
