const Joi = require('joi');

const signUpBody = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email address',
    }),
    password: Joi.string().min(8).max(30).required(),
    repeatPassword: Joi.ref('password'),
    age: Joi.number().min(18).max(150).required(),
}).required();

const signUpSchema = {
    body: signUpBody,
}

module.exports = signUpSchema;
