const mongoose = require("mongoose");

const insuranceSchema = mongoose.Schema({
  estimateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Estimate Id id required"],
    unique: true,
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Staff Id id required"],
  },
  policy: {
    type: String,
    default: "",
  },
  claim: {
    type: String,
    default: "",
  },
  dateOfLoss: {
    type: String,
    default: "",
  },
  deductible: {
    type: String,
    default: "",
  },
  lossType: {
    type: String,
    default: "",
  },
  InsuredOrClaimant: {
    type: String,
    default: "",
  },
  InsuranceName: {
    type: String,
    default: "",
  },
  phone1: {
    type: String,
    default: "",
  },
  phone2: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  AdjusterName: {
    type: String,
    default: "",
  },
  InsuranceAddress: {
    type: String,
    default: "",
  },
  City: {
    type: String,
    default: "",
  },
  State: {
    type: String,
    default: "",
  },
  ZipCode: {
    type: String,
    default: "",
  },
  Country: {
    type: String,
    default: "",
  },
  Company: {
    type: String,
    default: "",
  },
  companyPhone1: {
    type: String,
    default: "",
  },
  companyPhone2: {
    type: String,
    default: "",
  },
  companyEmail: {
    type: String,
    default: "",
  },
  companyAppraiserName: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const insuranceModel = mongoose.model("insurances", insuranceSchema);

module.exports = insuranceModel;
