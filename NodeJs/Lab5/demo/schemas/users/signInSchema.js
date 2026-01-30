const Joi = require('joi');

const signInBody = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email address',
    }),
    password: Joi.string().min(8).max(30).required(),
}).required();

const signInSchema = {
    body: signInBody,
}

module.exports = signInSchema;
