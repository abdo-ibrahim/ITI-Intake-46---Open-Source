const express = require("express");
const { createDonation, webhook } = require("../../controllers/donationController");
const { validate } = require("../../middlewares/validate");
const { donation } = require("../../schemas");

const donationRouter = express.Router();
donationRouter.post("/", validate(donation.createDonation), createDonation);
donationRouter.post("/webhook", webhook);

module.exports = donationRouter;
