const mongoose = require("mongoose");

const estimateAppoinmentSchema = mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shops",
    required: [true, "shop ID is required"],
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  insurance: {
    type: String,
  },
  appointmentType: {
    type: String,
  },
  estimateAppointmentDate: {
    type: String,
  },
  durationOfAppointment: {
    type: String,
  },
  estimator: {
    type: String,
  },
  chatlinkOpt: {
    type: Boolean,
    default: false,
  },
  welcomeFormComp: {
    type: Boolean,
    default: false,
  },
  customerProfile: {
    type: String,
  },
  estimateProfile: {
    type: String,
  },
  missedAppointment: {
    type: Boolean,
    default: false,
  },
  completedAppointment: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const estimateAppoinmentModel = mongoose.model(
  "estimateAppoinments",
  estimateAppoinmentSchema
);

module.exports = estimateAppoinmentModel;
