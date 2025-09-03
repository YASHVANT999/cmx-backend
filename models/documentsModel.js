const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
  estimateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Estimate Id id required"],
    unique: true,
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Staff Id id required"],
  },
  documents: [
    {
      DocumentName: {
        type: String,
      },
      DocumentshowName: {
        type: String,
      },
      DocumentType: {
        type: String,
      },
      Category: {
        type: String,
      },
      FileRefName: {
        type: String,
        required: [true, "File Reference is required"],
      },
      Description: {
        type: String,
      },
      StaffDoc: {
        type: String,
      },
      documentDate: {
        type: String,
      },
      Size: {
        type: String,
      },
      staffDocId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Staff Id id required"],
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const documentModel = mongoose.model("documents", documentSchema);

module.exports = documentModel;
