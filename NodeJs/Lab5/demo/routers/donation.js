const express = require('express');
const schemas = require('../schemas');
const donationsController = require('../controllers/donations');
const validate = require('../middlewares/validate');

const router = express.Router();


router.post("/", validate(schemas.donations.donateSchema), donationsController.createDonation);

router.post("/webhook", donationsController.webhook)


module.exports = router;
