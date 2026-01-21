const Joi = require("joi");

const getUserByIdParams = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const getUserByIdSchema = {
  params: getUserByIdParams,
};

module.exports = getUserByIdSchema;
