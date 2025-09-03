const mongoose = require("mongoose");

const staffSchema = mongoose.Schema({
  estimateId: {
    type: mongoose.Schema.Types.ObjectId,
    require: [true, "FolderX Id id required"],
    unique: true,
  },
  Estimator: {
    type: String,
    default: null,
  },
  BodyTechnician: {
    type: String,
    default: null,
  },
  PainterTechnician: {
    type: String,
    default: null,
  },
  FrameTechnician: {
    type: String,
    default: null,
  },
  DetailTechnician: {
    type: String,
    default: null,
  },
  Office: {
    type: String,
    default: null,
  },
  ProductionManagement: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const staffModel = mongoose.model("staffs", staffSchema);

module.exports = staffModel;
