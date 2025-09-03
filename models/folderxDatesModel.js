const mongoose = require("mongoose");

const folderXDataSchema = mongoose.Schema({
  estimateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "FolderX Id id required"],
    unique: true,
  },
  appTowDrop: {
    type: String,
    enum: ["Appointment", "Tow", "Drop"],
  },
  appTowDropCheck: {
    type: Boolean,
    default: false,
  },
  appointmentDate: {
    type: String,
  },
  appointmentDateCheck: {
    type: Boolean,
    default: false,
  },
  vehicalArrivalDate: {
    type: String,
  },
  vehicalArrivalDateCheck: {
    type: Boolean,
    default: false,
  },
  authorizationSigned: {
    type: String,
  },
  authorizationSignedCheck: {
    type: Boolean,
    default: false,
  },
  customerRentalCompany: {
    type: String,
  },
  customerRentalCompanyCheck: {
    type: Boolean,
    default: false,
  },
  totalJobHour: {
    type: String,
  },
  totalJobHourCheck: {
    type: Boolean,
    default: false,
  },
  cycleTime: {
    type: String,
  },
  cycleTimeCheck: {
    type: Boolean,
    default: false,
  },
  daysForParts: {
    type: String,
  },
  daysForPartsCheck: {
    type: Boolean,
    default: false,
  },
  targetDate: {
    type: String,
  },
  targetDateCheck: {
    type: Boolean,
    default: false,
  },
  pickupDate: {
    type: String,
  },
  pickupDateCheck: {
    type: Boolean,
    default: false,
  },
  customerNotified: {
    type: String,
  },
  customerNotifiedCheck: {
    type: Boolean,
    default: false,
  },
  vehicalDelivered: {
    type: String,
  },
  vehicalDeliveredCheck: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const folderxDatesModel = mongoose.model("folderxDates", folderXDataSchema);

module.exports = folderxDatesModel;
