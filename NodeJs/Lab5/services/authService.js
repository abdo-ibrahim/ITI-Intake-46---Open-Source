const User = require("../models/userModel");
const AppError = require("../utils/appErrors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");

const jwtSign = util.promisify(jwt.sign);

// Register new user
exports.signUpService = async (userData) => {
  const { email, password } = userData;
  // check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...userData, password: hashedPassword });
  return newUser;
};

// Login user
exports.signInService = async (userData) => {
  const { email, password } = userData;
  // check if email already exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid email or password", 400);
  }
  // compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 400);
  }
  // create token
  const token = await jwtSign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  return { token, user: { ...user.toObject(), password: undefined } };
};
