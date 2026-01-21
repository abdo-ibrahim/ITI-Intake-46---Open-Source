const Joi = require("joi");

const signUpBody = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "confirmPassword must match password",
  }),
  age: Joi.number().min(18).max(150).required(),
});

const signUpSchema = {
  body: signUpBody,
};

module.exports = signUpSchema;
