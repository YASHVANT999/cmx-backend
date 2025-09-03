const mongoose = require("mongoose");

const estimateStageSchema = new mongoose.Schema({
  estimateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Estimate Id is Required"],
    unique: true,
  },
  EstimateTotal: {
    type: String,
    default: "",
  },
  Totalhours: {
    type: String,
    default: "",
  },
  DaystoRepair: {
    type: String,
    default: "",
  },
  estimateStages: {
    type: [
      {
        EstimateStage: {
          type: String,
          enum: ["", "EOR", "S1", "S2", "S3", "S4", "S5", "S6"],
          default: "",
        },
        LineNotes: {
          type: String,
          default: "",
        },
        Operation: {
          type: String,
          enum: [
            "",
            "Replace",
            "Repair",
            "Refinish",
            "Remove & Install",
            "Overhaul",
            "Section",
            "Align",
            "Sublet",
            "Blend",
            "PDR",
            "None",
          ],
          default: "",
        },
        PartType: {
          type: String,
          enum: [
            "",
            "OEM",
            "OEM Discount",
            "Aftermarket",
            "Recycled",
            "Reconditioned",
            "Core Fee",
            "Tire",
          ],
          default: "",
        },
        LaborType: {
          type: String,
          enum: [
            "",
            "BODY",
            "PAINT",
            "MECH",
            "FRAME",
            "STRUCTURE",
            "DIAGNOSTIC",
            "ELECTRICAL",
            "GLASS",
            "ALUMINUM",
          ],
          default: "",
        },
        EstimateDescription: {
          type: String,
          default: "",
        },
        PartNumber: {
          type: String,
          default: "",
        },
        Quantaty: {
          type: String,
          default: "",
        },
        MarkupDiscounts: {
          type: String,
          default: "",
        },
        EstimateAmount: {
          type: String,
          default: "",
        },
        BodyLabor: {
          type: String,
          default: "",
        },
        RefinishLabor: {
          type: String,
          default: "",
        },
        Adjustment: {
          type: String,
          default: "",
        },
        LaborTax: {
          type: Boolean,
          default: false,
        },
        PartsTax: {
          type: Boolean,
          default: false,
        },
        PaintSupplies: {
          type: Boolean,
          default: false,
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

const estimateStageModel = mongoose.model("estimatestage", estimateStageSchema);

module.exports = estimateStageModel;
