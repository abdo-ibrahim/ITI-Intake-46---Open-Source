const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
// Middlewares
app.use(express.json());
app.use(cors());
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
