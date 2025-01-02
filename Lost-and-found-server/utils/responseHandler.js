const handleSuccess = (res, data, message = "Request successful") => {
  if (!res.headersSent) {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }
};

const handleError = (res, error, message = "An error occurred") => {
  if (!res.headersSent) {
    const errorMessage = error && error.message ? error.message : message;
    return res.status(500).json({
      success: false,
      message,
      error: errorMessage,
    });
  }
};

module.exports = { handleSuccess, handleError };
