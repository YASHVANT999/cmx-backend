const mongoose = require("mongoose");

const shopRatesSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "shopId is required"],
    unique: true,
  },
  body: {
    type: String,
    default: "",
  },
  paint: {
    type: String,
    default: "",
  },
  mechanical: {
    type: String,
    default: "",
  },
  frame: {
    type: String,
    default: "",
  },
  structure: {
    type: String,
    default: "",
  },
  diagnosticlabor: {
    type: String,
    default: "",
  },
  electrical: {
    type: String,
    default: "",
  },
  glass: {
    type: String,
    default: "",
  },
  pdr: {
    type: String,
    default: "",
  },
  alm: {
    type: String,
    default: "",
  },
  partsTaxRate: {
    type: String,
    default: "",
  },
  labourTax: {
    type: String,
    default: "",
  },
  paintSupplies: {
    type: String,
    default: "",
  },
  bodySupplies: {
    type: String,
    default: "",
  },
  partsTaxRate: {
    type: String,
    default: "",
  },
  laborTax: {
    type: String,
    default: "",
  },
  rate1: {
    type: String,
    default: "",
  },
  rate2: {
    type: String,
    default: "",
  },
  threshold1: {
    type: String,
    default: "",
  },
  threshold2: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const shopRatesModel = mongoose.model("shopRates", shopRatesSchema);

module.exports = shopRatesModel;
