const Joi = require("joi");

const updateUserBody = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  age: Joi.number().min(18).max(150),
});
const updateUserParams = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateUserSchema = {
  params: updateUserParams,
  body: updateUserBody,
};

module.exports = updateUserSchema;
