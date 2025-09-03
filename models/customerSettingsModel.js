const mongoose = require("mongoose");

const customerSettingsSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shops",
    required: [true, "Shop ID is required"],
    unique: true,
  },
  timeLine: {
    type: [String],
    default: [],
  },
  comments: [
    {
      customer: {
        type: [String],
        default: [],
      },
      insurance: {
        type: [String],
        default: [],
      },
      parts: {
        type: [String],
        default: [],
      },
      payments: {
        type: [String],
        default: [],
      },
      repairs: {
        type: [String],
        default: [],
      },
      supplement: {
        type: [String],
        default: [],
      },
    },
  ],
  eSignature: {
    type: [String],
    default: [],
  },
  chatLinkMessage: [
    {
      chatLinkInvite: {
        type: [String],
        default: [],
      },
      estimateChat: {
        type: [String],
        default: [],
      },
      repairChat: {
        type: [String],
        default: [],
      },
      completeChat: {
        type: [String],
        default: [],
      },
      surveyRequest: {
        type: [String],
        default: [],
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const customerSettingsModel = mongoose.model(
  "customerSettings",
  customerSettingsSchema
);

module.exports = customerSettingsModel;
