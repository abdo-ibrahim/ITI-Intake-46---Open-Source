const AppError = require("../utils/appErrors");

const allowTo =
  (...roles) =>
  (req, res, next) => {
    const user = req.user;
    if (!user) return next(new AppError("You have to be logged in, in order to continue", 401));
    if (!roles.includes(user.role)) {
      // req.user = verified
      return next(new AppError("Access Denied. You do not have the required role.", 403));
    }
    next();
  };
module.exports = allowTo;
