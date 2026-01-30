const Joi = require("joi");

const getPostByIdParams = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const getPostByIdSchema = {
  params: getPostByIdParams,
};
module.exports = getPostByIdSchema;
