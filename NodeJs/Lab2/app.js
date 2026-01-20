const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const app = express();
app.use(express.json());
// Routes
app.use(apiRoutes);
app.use((req, res) => {
  res.status(404).json({ message: `Can't Find ${req.originalUrl}` });
});
module.exports = app;
