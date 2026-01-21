const AppError = require("../utils/appErrors");

// Handle casting errors (e.g., invalid ObjectId)
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// Handle validation errors
const handleValidationError = (err) => {
  const errors = Object.values(err.errors)
    .map((el) => el.message)
    .join(". ");
  return new AppError(`Invalid input data: ${errors}`, 400);
};

// Handle duplicate key errors
const handleDuplicateError = (err) => {
  const duplicateField = Object.keys(err.keyValue)[0];
  const message = `Duplicate field value: '${err.keyValue[duplicateField]}'. Please use another value.`;
  return new AppError(message, 400);
};

// Handle JSON Web Token errors
const handleJsonWebTokenError = () => new AppError("Invalid token, please login again", 401);

// Handle token expiration errors
const handleTokenExpiredError = () => new AppError("Token has expired, please login again", 401);

// Send error response for development mode
const sendDevErr = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// Send error response for production mode
const sendProdErr = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

// Global error handling middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err, message: err.message };

  if (err.name === "CastError") error = handleCastError(err);
  if (err.name === "ValidationError") error = handleValidationError(err);
  if (err.code === 11000) error = handleDuplicateError(err);
  if (err.name === "JsonWebTokenError") error = handleJsonWebTokenError();
  if (err.name === "TokenExpiredError") error = handleTokenExpiredError();

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevErr(error, res);
  } else {
    sendProdErr(error, res);
  }
};
