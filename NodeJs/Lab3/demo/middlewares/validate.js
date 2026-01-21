const APIError = require('../utils/APIError');

module.exports = (schema) => {
    return (req, res, next) => {
        for (const key in schema) {
            const { error } = schema[key].validate(req[key], { abortEarly: true });
            if (error) {
                throw new APIError(error.details[0].message, 400);
            }
        }
        next();
    }
}