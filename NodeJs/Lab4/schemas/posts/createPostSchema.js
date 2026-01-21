const Joi = require("joi");

const createPostBody = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  content: Joi.string().min(10).required(),
  tags: Joi.array().items(Joi.string()),
  likes: Joi.number().integer().min(0).default(0),
});

const createPostSchema = {
  body: createPostBody,
};
module.exports = createPostSchema;
