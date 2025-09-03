const mongoose = require("mongoose");

const estimateProfilePhotosSchema = mongoose.Schema(
  {
    estimateProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "estimateprofiles",
      required: [true, "Estimate profiles is required"],
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shops",
      // required: [true, "shop ID is required"],
    },
    photoType: {
      type: String,
    },
    Id: {
      type: String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    date: {
      type: String,
    },
    size: {
      type: String,
    },
    src: {
      type: String,
    },
    dsc: {
      type: String,
    },
    is_primary: {
      type: Boolean,
      default: false,
    },
    photoName: {
      type: String,
      required: true,
    },
    imageDescription: {
      type: String,
    },
    filename: {
      type: String,
    },
    fileField: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  
);

const estimateProfilePhotosModel = mongoose.model(
  "estimateprofilePhotos",
  estimateProfilePhotosSchema
);

module.exports = estimateProfilePhotosModel;
