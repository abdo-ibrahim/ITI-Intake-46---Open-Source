const userService = require("../services/userService");
const AppError = require("../utils/appErrors");
const asyncHandler = require("../middlewares/asyncHandler");

// Create a new user
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await userService.createUserService(req.body);
  res.status(201).json({ message: "User created successfully", data: user });
});

// GET all users
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const result = await userService.getAllUsersService(page, limit);
  res.status(200).json({
    message: "Users fetched successfully",
    data: result.users,
    pagination: result.pagination,
  });
});

// GET user by ID
exports.getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await userService.getUserByIdService(id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    message: "User fetched successfully",
    data: user,
  });
});

// UPDATE user by ID
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const updatedUser = await userService.updateUserService(id, { name, email, age });
  if (!updatedUser) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    message: "User updated successfully",
    data: updatedUser,
  });
});

// DELETE user by ID
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await userService.deleteUserService(id);
  if (!deletedUser) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    message: "User deleted successfully",
    data: deletedUser,
  });
});
