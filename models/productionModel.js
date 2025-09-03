const mongoose = require("mongoose");

const productionSchema = mongoose.Schema({
  estimateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "FolderX Id id required"],
    unique: true,
  },
  vehicalInShop: {
    type: Boolean,
    default: false,
  },
  vehicalInShopDate: {
    type: Date,
    default: null,
  },
  repairPlanComp: {
    type: Boolean,
    default: false,
  },
  repairPlanCompDate: {
    type: Date,
    default: null,
  },
  supplementHold: {
    type: Boolean,
    default: false,
  },
  supplementHoldDate: {
    type: Date,
    default: null,
  },
  supplementApproved: {
    type: Boolean,
    default: false,
  },
  supplementApprovedDate: {
    type: Date,
    default: null,
  },
  vehicalQual: {
    type: Boolean,
    default: false,
  },
  vehicalQualDate: {
    type: Date,
    default: null,
  },
  vehicalTsetDrive: {
    type: Boolean,
    default: false,
  },
  vehicalTsetDriveDate: {
    type: Date,
    default: null,
  },
  vehicalComp: {
    type: Boolean,
    default: false,
  },
  vehicalCompDate: {
    type: Date,
    default: null,
  },
  preScan: {
    type: Boolean,
    default: false,
  },
  preScanDate: {
    type: Date,
    default: null,
  },
  postScan: {
    type: Boolean,
    default: false,
  },
  postScanDate: {
    type: Date,
    default: null,
  },
  alignmentScan: {
    type: Boolean,
    default: false,
  },
  alignmentScanDate: {
    type: Date,
    default: null,
  },
  wheelSublet: {
    type: Boolean,
    default: false,
  },
  wheelSubletDate: {
    type: Date,
    default: null,
  },
  SubletRepair: {
    type: Boolean,
    default: false,
  },
  SubletRepairDate: {
    type: Date,
    default: null,
  },
  dealerShip: {
    type: Boolean,
    default: false,
  },
  dealerShipDate: {
    type: Date,
    default: null,
  },
  custom1: {
    type: Boolean,
    default: false,
  },
  custom1Date: {
    type: Date,
    default: null,
  },
  custom2: {
    type: Boolean,
    default: false,
  },
  custom2Date: {
    type: Date,
    default: null,
  },
  custom3: {
    type: Boolean,
    default: false,
  },
  custom3Date: {
    type: Date,

    default: null,
  },
  preScanNotes: {
    type: String,
    enum: ["2 Wheel", "4 Wheel"],
    default: null,
  },
  postScanNotes: {
    type: String,
    enum: ["2 Wheel", "4 Wheel"],
    default: null,
  },
  alignmentScanNotes: {
    type: String,
    enum: ["2 Wheel", "4 Wheel"],
    default: null,
  },
  wheelSubletNotes: {
    type: String,
    enum: ["LF", "LR", "RF", "RR"],
  },
  SubletRepairNotes: {
    type: String,
    default: null,
  },
  dealershipNotes: {
    type: String,
    default: null,
  },
  custom1Notes: {
    type: String,
    default: null,
  },
  custom2Notes: {
    type: String,
    default: null,
  },
  custom3Notes: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const productionModel = mongoose.model("productions", productionSchema);

module.exports = productionModel;
