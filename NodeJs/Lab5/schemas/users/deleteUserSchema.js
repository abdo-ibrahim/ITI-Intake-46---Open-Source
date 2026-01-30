const Joi = require("joi");

const deleteUserParams = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const deleteUserSchema = {
  params: deleteUserParams,
};

module.exports = deleteUserSchema;
