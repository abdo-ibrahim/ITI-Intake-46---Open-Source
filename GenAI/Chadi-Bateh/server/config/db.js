const mongoose = require("mongoose");

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_DB;

  if (!mongoUri) {
    throw new Error("Missing MongoDB URI. Set MONGODB_URI in .env");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}

module.exports = connectDB;
