const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  estimateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "The Estimate Id is required"],
    unique: true,
  },
  paymentDue: [
    {
      PaymentInfo: {
        type: String,
        enum: [
          "RecordOfEstimate",
          "Supplement1",
          "Deductible",
          "CustomerPay",
          "Betterment",
          "AppearanceAllowance",
          "Other",
          "TotalLossCharges",
        ],
        required: [true, "The Payment Info is Required "],
      },
      customerPayment: {
        type: Number,
      },
      insurancePayment: {
        type: Number,
      },
      paymentAmount: {
        type: Number,
      },
      proofOfPayment: {
        type: [String],
      },
      staffId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      verifiedDate: {
        type: String,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const paymentModel = mongoose.model("payments", paymentSchema);

module.exports = paymentModel;
