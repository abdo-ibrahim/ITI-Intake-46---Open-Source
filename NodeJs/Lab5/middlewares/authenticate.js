const User = require("../models/userModel");
const util = require("util");
const jwt = require("jsonwebtoken");
const jwtVerify = util.promisify(jwt.verify);

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied. token required." });
  }
  try {
    const decoded = await jwtVerify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Invalid token." });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authenticate;
