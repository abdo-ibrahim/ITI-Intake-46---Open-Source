const mongoose = require("mongoose");
const User = require("../models/userModel");

// Create a new user
exports.createUser = async (req, res) => {
  const { name, email, password, age } = req.body;
  if (!name || !email || !password || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.create({ name, email, password, age });
  res.status(201).json({ message: "User created successfully", data: user });
};

// GET all users
exports.getAllUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const users = await User.find({}, { password: 0 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  const total = await User.countDocuments();
  res.status(200).json({
    message: "Users fetched successfully",
    data: users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};

// GET user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await User.findById(id, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  const { name, email, age } = req.body;
  const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true, select: "-password" });
  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    message: "User updated successfully",
    data: updatedUser,
  });
};

// DELETE user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    message: "User deleted successfully",
    data: deletedUser,
  });
};
