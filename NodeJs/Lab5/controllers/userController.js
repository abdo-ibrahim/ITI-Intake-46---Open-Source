const userService = require("../services/userService");
const AppError = require("../utils/appErrors");

/**
 * @desc    Get all users
 * @route   GET /users
 * @method  GET
 * @access  Private
 */
exports.getAllUsers = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const result = await userService.getAllUsersService(page, limit);
  res.status(200).json({
    message: "Users fetched successfully",
    data: result.users,
    pagination: result.pagination,
  });
};

/**
 * @desc    Get user by ID
 * @route   GET /users/:id
 * @method  GET
 * @access  Private
 */
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await userService.getUserByIdService(id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    message: "User fetched successfully",
    data: user,
  });
};

/**
 * @desc    Update user by ID
 * @route   PATCH /users/:id
 * @method  PATCH
 * @access  Private
 */
exports.updateUser = async (req, res, next) => {
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
};

/**
 * @desc    Delete user by ID
 * @route   DELETE /users/:id
 * @method  DELETE
 * @access  Private
 */
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await userService.deleteUserService(id);
  if (!deletedUser) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    message: "User deleted successfully",
    data: deletedUser,
  });
};
