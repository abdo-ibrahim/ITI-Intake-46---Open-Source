const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Chadi-Bateh API" });
});

app.use("/api", chatRoutes);
app.use("/", chatRoutes);

app.use((error, _req, res, _next) => {
  const status = error?.status || 500;
  const message = error?.message || "Internal server error";

  res.status(status).json({ error: message });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Chadi-Bateh API running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error.message);
    process.exit(1);
  });
