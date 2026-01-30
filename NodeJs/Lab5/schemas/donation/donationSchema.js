const Joi = require("joi");

const createDonationBody = Joi.object({
  amount: Joi.number().integer().min(5).required(),
});

const donationSchema = {
  body: createDonationBody,
};
module.exports = donationSchema;
