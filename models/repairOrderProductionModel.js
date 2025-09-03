const mongoose = require("mongoose");

const repairOrderProductionSchema = new mongoose.Schema({
  estimateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "estimateprofiles",
    unique: true,
  },
  vehicalInShopCheckBox: {
    type: Boolean,
    default: false,
  },
  vehicalInShopTextArea: {
    type: String,
    default: "",
  },
  vehicalInShopDate: {
    type: String,
    default: "",
  },
  repairPlanCopleteCheckBox: {
    type: Boolean,
    default: false,
  },
  repairPlanCopleteTextArea: {
    type: String,
    default: "",
  },
  repairPlanCopleteDate: {
    type: String,
    default: "",
  },
  supplementHoldCheckBox: {
    type: Boolean,
    default: false,
  },
  supplementHoldTextArea: {
    type: String,
    default: "",
  },
  supplementHoldDate: {
    type: String,
    default: "",
  },
  supplementApprovedCheckBox: {
    type: Boolean,
    default: false,
  },
  supplementApprovedTextArea: {
    type: String,
    default: "",
  },
  supplementApprovedDate: {
    type: String,
    default: "",
  },
  vehicalQualityCheckCheckBox: {
    type: Boolean,
    default: false,
  },
  vehicalQualityCheckTextArea: {
    type: String,
    default: "",
  },
  vehicalQualityCheckDate: {
    type: String,
    default: "",
  },
  vehicalTestDriveCheckBox: {
    type: Boolean,
    default: false,
  },
  vehicalTestDriveTextArea: {
    type: String,
    default: "",
  },
  vehicalTestDriveDate: {
    type: String,
    default: "",
  },
  vehicalCompleteCheckBox: {
    type: Boolean,
    default: false,
  },
  vehicalCompleteTextArea: {
    type: String,
    default: "",
  },
  vehicalCompleteDate: {
    type: String,
    default: "",
  },
  preScanCheckBox: {
    type: Boolean,
    default: false,
  },
  preScanTextArea: {
    type: String,
    default: "",
  },
  preScanSelect: {
    type: String,
    default: "",
  },
  preScanDate: {
    type: String,
    default: "",
  },
  postScanCheckBox: {
    type: Boolean,
    default: false,
  },
  postScanTextArea: {
    type: String,
    default: "",
  },
  postScanSelect: {
    type: String,
    default: "",
  },
  postScanDate: {
    type: String,
    default: "",
  },
  alignmentScanCheckBox: {
    type: Boolean,
    default: false,
  },
  alignmentScanTextArea: {
    type: String,
    default: "",
  },
  alignmentScanSelect: {
    type: String,
    default: "",
  },
  alignmentScanDate: {
    type: String,
    default: "",
  },
  wheelSubletCheckBox: {
    type: Boolean,
    default: false,
  },
  wheelSubletTextArea: {
    type: String,
    default: "",
  },
  wheelSubletSelect: {
    leftFront: { type: Boolean, default: false },
    leftRear: { type: Boolean, default: false },
    rightFront: { type: Boolean, default: false },
    rightRear: { type: Boolean, default: false },
  },
  wheelSubletDate: {
    type: String,
    default: "",
  },
  subletRepairCheckBox: {
    type: Boolean,
    default: false,
  },
  subletRepairTextArea: {
    type: String,
    default: "",
  },
  subletRepairNotes: {
    type: String,
    default: "",
  },
  subletRepairDate: {
    type: String,
    default: "",
  },
  dealerShipCheckBox: {
    type: Boolean,
    default: false,
  },
  dealerShipTextArea: {
    type: String,
    default: "",
  },
  dealerShipNotes: {
    type: String,
    default: "",
  },
  dealerShipDate: {
    type: String,
    default: "",
  },
  custom1CheckBox: {
    type: Boolean,
    default: false,
  },
  custom1TextArea: {
    type: String,
    default: "",
  },
  custom1Notes: {
    type: String,
    default: "",
  },
  custom1Date: {
    type: String,
    default: "",
  },
  custom2CheckBox: {
    type: Boolean,
    default: false,
  },
  custom2TextArea: {
    type: String,
    default: "",
  },
  custom2Notes: {
    type: String,
    default: "",
  },
  custom2Date: {
    type: String,
    default: "",
  },
  custom3CheckBox: {
    type: Boolean,
    default: false,
  },
  custom3TextArea: {
    type: String,
    default: "",
  },
  custom3Notes: {
    type: String,
    default: "",
  },
  custom3Date: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const repairOrderProductionModel = mongoose.model(
  "repairOrderProductions",
  repairOrderProductionSchema
);

module.exports = repairOrderProductionModel;
