class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

function errorMiddleware(err, req, res, next) {
  err.statusCode = err?.statusCode || 500;
  err.message = err?.message || "Internal server error.";

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    err = new ErrorHandler(400, message);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(400, message);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again.`;
    err = new ErrorHandler(400, message);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Json web Token is expired, login again.";
    err = new ErrorHandler(400, message);
  }

  return res.status(err?.statusCode || 500).json({
    success: false,
    message: err.message,
    err: err,
  });
}

export { ErrorHandler, errorMiddleware };
