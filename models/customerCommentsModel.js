const mongoose = require("mongoose");

const customerCommentsSchema = new mongoose.Schema({
  estimateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "estimateprofiles",
  },
  commentCategory: {
    type: String,
    enum: [
      "Customer",
      "Insurance",
      "Other",
      "Parts",
      "Payments",
      "Repairs",
      "Supplement",
    ],
    default: null,
    required: [true, "Comments Category are Required"],
  },
  commentVal: {
    type: String,
    default: "",
  },
  staffId: {
    type: String,
  },
  staffIdReal: {
    type: mongoose.Schema.Types.ObjectId,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const customerCommentsModel = mongoose.model(
  "customerComments",
  customerCommentsSchema
);

module.exports = customerCommentsModel;
