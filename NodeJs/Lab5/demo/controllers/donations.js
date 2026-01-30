const donationService = require('../services/donations');
const APIError = require('../utils/APIError');

const createDonation = async (req, res) => {

    const { amount } = req.body;
    let session;
    // create payment session on the gateway
    try {
        session = await donationService.createPaymentSessionFromProvider(amount);
    } catch (error) {
        throw new APIError("service unavailable", 503);
    }
    // if success we will create donation object 
    const donationData = {
        sessionId: session._id,
        orderId: session.paymentParams.order,
        amount: session.paymentParams.amount,
        sessionURL: session.sessionUrl,
    }
    const donation = await donationService.createDonation(donationData);
    // return sessionUrl for the provider

    res.status(200).json({
        message: "Donation Link created successfully",
        Data: {
            sessionURL: donation.sessionURL,
        }
    });

};


const webhook = async (req, res) => {
    const { data, event } = req.body;
    const kashierSignature = req.header('x-kashier-signature');
    const isValid = donationService.handelWebhook(data, kashierSignature);
    if (!isValid) {
        throw new APIError("invalid signature", 400);
    }

    await donationService.updateDonationStatus(req.body);

    res.status(200).json({
        message: "Webhook received successfully",
    });
};



module.exports = {
    createDonation,
    webhook
};


