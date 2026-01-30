const Joi = require('joi');

const createPostBody = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    content: Joi.string().min(10).required(),
    tags: Joi.array().items(Joi.string()),
    status: Joi.string().valid('draft', 'published').required(),
}).required();

const createPostSchema = {
    body: createPostBody,
}

module.exports = createPostSchema;
