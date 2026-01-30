const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");
const errorHandler = require("./middlewares/errorHandler");
const rateLimiter = require("./middlewares/rateLimiter");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const { sanitizeMongoInput } = require("express-v5-mongo-sanitize");

const hpp = require("hpp");

const app = express();
// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(sanitizeMongoInput);
app.use(xss());
app.use(hpp());
app.use(rateLimiter);
// Routes
app.use("/", apiRoutes);
app.all("*path", (req, _, next) => {
  const err = new Error(`Can't Find ${req.originalUrl}`);
  err.status = "fail";
  err.statusCode = 404;
  err.isOperational = true;
  next(err);
});

app.use(errorHandler);
module.exports = app;
