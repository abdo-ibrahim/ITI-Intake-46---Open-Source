const Joi = require("joi");

const getAllUserQuery = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

const getAllUserSchema = {
  query: getAllUserQuery,
};

module.exports = getAllUserSchema;