const donationService = require("../services/donationService");
const AppError = require("../utils/appErrors");

/**
 * @desc    Create a new donation
 * @route   POST /donation
 * @method  POST
 * @access  Public
 */
exports.createDonation = async (req, res) => {
  const { amount } = req.body;

  try {
    // Create payment session with the provider
    const paymentSession = await donationService.createPaymentSessionFromProvider(amount);
    // Create donation record in the database
    const donationData = {
      sessionId: paymentSession._id,
      amount: paymentSession.paymentParams.amount,
      orderId: paymentSession.paymentParams.order,
      sessionURL: paymentSession.sessionUrl,
    };
    const donation = await donationService.createDonation(donationData);
    res.status(201).json({
      message: "Donation created successfully",
      data: {
        sessionURL: donation.sessionURL,
      },
    });
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the donation",
    });
  }
};

/**
 * @desc    Handle webhook from payment provider
 * @route   POST /donation/webhook
 * @method  POST
 * @access  Public
 */

exports.webhook = async (req, res) => {
  const { data, event } = req.body;
  console.log("Webhook received:", req.body);
  const kashierSignature = req.header("x-kashier-signature");
  const isValid = donationService.handleWebhook(data, kashierSignature);
  if (!isValid) {
    throw new AppError("Invalid signature", 400);
  }
  await donationService.updateDonationStatus(req.body);
  res.status(200).json({ message: "Webhook processed successfully" });
};
