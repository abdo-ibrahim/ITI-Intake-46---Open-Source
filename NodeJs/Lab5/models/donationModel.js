const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    amount: { type: Number, required: true },
    orderId: { type: String, required: true },
    status: { type: String, enum: ["PENDING", "PAID", "FAILED", "REFUNDED"], default: "PENDING" },
    sessionURL: { type: String },
    webhookData: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true },
);

const Donation = mongoose.model("donations", donationSchema);

module.exports = Donation;
