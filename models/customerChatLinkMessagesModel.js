const mongoose = require("mongoose");

const customerChatLinkSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shops",
    required: [true, "Shop ID is required"],
  },
  type: {
    type: String,
    enum: [
      "ChatLinkInvite",
      "EstimateChat",
      "RepairChat",
      "CompletedChat",
      "SurveyRequest",
    ],
  },
  title: {
    type: String,
  },
  data: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const customerChatLinkModel = mongoose.model(
  "customerChatLinks",
  customerChatLinkSchema
);

module.exports = customerChatLinkModel;
