const User = require("../models/userModel");


// GET all users
exports.getAllUsersService = async (page = 1, limit = 10) => {
  const users = await User.find({}, { password: 0 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  const total = await User.countDocuments();
  return {
    users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// GET user by ID
exports.getUserByIdService = async (id) => {
  const user = await User.findById(id, { password: 0 });
  return user;
};

// UPDATE user by ID
exports.updateUserService = async (id, updateData) => {
  const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, select: "-password" });
  return updatedUser;
};

// DELETE user by ID
exports.deleteUserService = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};
