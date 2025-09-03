const mongoose = require("mongoose");

const estimateChatLinkSchema = new mongoose.Schema({
  estimateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Estimate Id is required"],
    ref: "estimateprofiles",
  },
  messages: [
    {
      message: {
        type: String,
      },
      role: {
        type: String,
        enum: ["Admin", "Customer"],
      },
      messageType: {
        type: String,
      },
      file: {
        fileName: {
          type: String,
        },
        src: {
          type: String,
        },
        fileSize: {
          type: String,
        },
        fileType: {
          type: String,
        },
      },
      messageSeen: {
        type: Boolean,
        default: false,
      },
      SendAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const estimateChatLinkModel = mongoose.model(
  "estimateChatLinks",
  estimateChatLinkSchema
);

module.exports = estimateChatLinkModel;
