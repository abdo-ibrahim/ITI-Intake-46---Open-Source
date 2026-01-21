const Joi = require("joi");

const signInBody = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

const signInSchema = {
  body: signInBody,
};

module.exports = signInSchema;