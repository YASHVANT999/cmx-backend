const mongoose = require("mongoose");

const defaultShopCommentsSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shops",
    required: [true, "shop ID is required"],
    unique: true,
  },
  comments: {
    type: [
      {
        commentTitle: {
          type: String,
        },
        commentCategory: {
          type: String,
          enum: [
            "Customer",
            "Insurance",
            "Parts",
            "Payments",
            "Repairs",
            "Supplement",
          ],
        },
        comment: {
          type: String,
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const defaultShopCommentsModel = mongoose.model(
  "defaultshopcomments",
  defaultShopCommentsSchema
);

module.exports = defaultShopCommentsModel;
