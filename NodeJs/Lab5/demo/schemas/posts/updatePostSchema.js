const Joi = require('joi');

const updatePostBodySchema = Joi.object({
    title: Joi.string().min(3).max(200),
    content: Joi.string().min(10),
    tags: Joi.array().items(Joi.string()),
    status: Joi.string().valid('draft', 'published'),
}).required();

const updatePostParamsSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
}).required();

const schema = {
    body: updatePostBodySchema,
    params: updatePostParamsSchema,
}

module.exports = schema;
