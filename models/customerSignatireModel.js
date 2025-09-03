const mongoose = require("mongoose");

const customerSignatureSchema = new mongoose.Schema({
  estimateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "FolderX Id id required"],
    unique: true,
  },
  staffId: {
    type: String,
    required: [true, "Staff Id id required"],
    unique: true,
  },
  signature: {
    type: [String],
  },
});

const customerSignatureModel = mongoose.model(
  "customerSignatures",
  customerSignatureSchema
);

module.exports = customerSignatureModel;
