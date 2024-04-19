const ErrorHandler = (err, req, res, next) => {
  console.error(err);
  const errStatus = err.statusCode || 500;
  const errMsg = "Something went wrong, please contact dev support!";

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
};

module.exports = ErrorHandler;
