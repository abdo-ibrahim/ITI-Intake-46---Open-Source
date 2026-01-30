const AppError = require("../utils/appErrors");

exports.validate = (schemas) => {
  return (req, res, next) => {
    const validationErrors = [];

    for (const key of Object.keys(schemas)) {
      if (!req[key]) continue;

      const { error, value } = schemas[key].validate(req[key], {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        error.details.forEach((d) => {
          validationErrors.push(`[${key}] ${d.message}`);
        });
      } else {
        req[key] = value; // sanitize
      }
    }

    if (validationErrors.length) {
      return next(new AppError(validationErrors.join(" | "), 400));
    }

    next();
  };
};
