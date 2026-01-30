const Donation = require("../models/donationModel");
const AppError = require("../utils/appErrors");
const axios = require("axios");
const crypto = require("crypto");
const queryString = require("querystring");
const _ = require("underscore");

const httpClient = axios.create({
  baseURL: process.env.KASHIER_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.KASHIER_SECRET_KEY,
    "api-key": process.env.KASHIER_API_KEY,
  },
});

// createPaymentSessionFromProvider(amount)
exports.createPaymentSessionFromProvider = async (amount) => {
  const order = `DONATION-${Date.now()}`;
  const response = await httpClient.post("/v3/payment/sessions", {
    paymentType: "credit",
    amount: amount.toString(),
    currency: "EGP",
    order: order,
    display: "en",
    allowedMethods: "card,wallet",
    // TODO: change the redirect url
    merchantRedirect: "https://example.com/redirect",
    redirectMethod: null,
    failureRedirect: false,
    iframeBackgroundColor: "#FFFFFF",
    merchantId: process.env.KASHIER_MERCHANT_ID,
    brandColor: "#5020FF",
    defaultMethod: "card",
    description: `Payment for order ${order}`,
    manualCapture: false,
    saveCard: "none",
    interactionSource: "ECOMMERCE",
    enable3DS: true,
    serverWebhook: "https://intellective-subalgebraic-adele.ngrok-free.dev/api/v1/donation/webhook",
    notes: "please support our blog",
  });
  return response?.data;
};

exports.createDonation = async (donationData) => {
  const donation = await Donation.create(donationData);
  return donation;
};

exports.handleWebhook = async (data, signatureHeader) => {
  data.signatureKeys.sort();
  const objectSignaturePayload = _.pick(data, data.signatureKeys);
  const signaturePayload = queryString.stringify(objectSignaturePayload);
  const signature = crypto.createHmac("sha256", process.env.KASHIER_API_KEY).update(signaturePayload).digest("hex");

  if (signatureHeader === signature) {
    return true;
  } else {
    return false;
  }
};

exports.updateDonationStatus = async (body) => {
  const { data, event } = body;
  const donation = await Donation.findOne({ orderId: data.merchantOrderId });
  if (!donation) {
    throw new AppError("donation not found", 404);
  }
  const updateQuery = {
    $set: {
      status: data.status === "SUCCESS" ? "PAID" : "FAILED",
      webhookData: body,
    },
  };
  await Donation.updateOne({ _id: donation._id }, updateQuery);
};
