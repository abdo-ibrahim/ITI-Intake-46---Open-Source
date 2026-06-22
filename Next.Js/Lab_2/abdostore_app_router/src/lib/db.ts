import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

async function dbConnect() {
  if (isConnected) {
    return;
  }

  if (!MONGODB_URI) {
    throw new Error("Invalid MONGODB_URI");
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    isConnected = false;
  }
}

export default dbConnect;
