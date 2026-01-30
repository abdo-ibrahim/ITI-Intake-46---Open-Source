const Joi = require("joi");

const updatePostBody = Joi.object({
  title: Joi.string().min(3).max(200),
  content: Joi.string().min(10),
  author: Joi.string().min(2).max(100),
  tags: Joi.array().items(Joi.string()),
  published: Joi.boolean(),
});
const updatePostParams = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updatePostSchema = {
  body: updatePostBody,
  params: updatePostParams,
};
module.exports = updatePostSchema;
