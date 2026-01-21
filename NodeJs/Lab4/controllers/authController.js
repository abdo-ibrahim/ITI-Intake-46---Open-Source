const authService = require("../services/authService");
const AppError = require("../utils/appErrors");

/**
 * @desc  Register new user
 * @route auth/signup
 * @method POST
 * @access public
 */
exports.signUp = async (req, res, next) => {
  const user = await authService.signUpService(req.body);
  res.status(201).json({ message: "User registered successfully", data: user });
};

/**
 * @desc  Login user
 * @route auth/signin
 * @method POST
 * @access public
 */
exports.signIn = async (req, res, next) => {
  const data = await authService.signInService(req.body);
  res.status(200).json({ message: "User signed in successfully", data });
};
