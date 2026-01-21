const Joi = require("joi");

const deletePostParams = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const deletePostSchema = {
  params: deletePostParams,
};
module.exports = deletePostSchema;
