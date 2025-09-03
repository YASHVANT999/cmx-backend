const folderxDates = require("../models/folderxDatesModel");
const Estimates = require("../models/estimateProfileModel");

const folderxDatesRegisterController = async (req, res) => {
  try {
    const {
      estimateId,
      appTowDrop,
      appointmentDate,
      vehicalArrivalDate,
      authorizationSigned,
      customerRentalCompany,
      totalJobHour,
      cycleTime,
      daysForParts,
      targetDate,
      pickupDate,
      customerNotified,
      vehicalDelivered,
      appointmentDateCheck,
      vehicalArrivalDateCheck,
      authorizationSignedCheck,
      customerRentalCompanyCheck,
      targetDateCheck,
      pickupDateCheck,
      customerNotifiedCheck,
      vehicalDeliveredCheck,
      appTowDropCheck,
      totalJobHourCheck,
      cycleTimeCheck,
      daysForPartsCheck,
    } = req.body;
    const estimateFound = await Estimates.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !",
      });
    }
    const folderXDateFound = await folderxDates.findOneAndUpdate(
      { estimateId },
      {
        appTowDrop,
        appointmentDate,
        vehicalArrivalDate,
        authorizationSigned,
        customerRentalCompany,
        totalJobHour,
        cycleTime,
        daysForParts,
        targetDate,
        pickupDate,
        customerNotified,
        vehicalDelivered,
        appointmentDateCheck,
        vehicalArrivalDateCheck,
        authorizationSignedCheck,
        customerRentalCompanyCheck,
        targetDateCheck,
        pickupDateCheck,
        customerNotifiedCheck,
        vehicalDeliveredCheck,
        appTowDropCheck,
        totalJobHourCheck,
        cycleTimeCheck,
        daysForPartsCheck,
      }
    );
    if (!folderXDateFound) {
      const folderxDatesData = await folderxDates.create({
        estimateId,
        appTowDrop,
        appointmentDate,
        vehicalArrivalDate,
        authorizationSigned,
        customerRentalCompany,
        totalJobHour,
        cycleTime,
        daysForParts,
        targetDate,
        pickupDate,
        customerNotified,
        vehicalDelivered,
        appointmentDateCheck,
        vehicalArrivalDateCheck,
        authorizationSignedCheck,
        customerRentalCompanyCheck,
        targetDateCheck,
        pickupDateCheck,
        customerNotifiedCheck,
        vehicalDeliveredCheck,
        appTowDropCheck,
        totalJobHourCheck,
        cycleTimeCheck,
        daysForPartsCheck,
      });
      return res.status(200).json({
        success: true,
        msg: "Dates has been Updated !",
        data: folderxDatesData,
      });
    }
    res.status(200).json({
      success: true,
      msg: "Dates has been Updated !",
      data: folderXDateFound,
    });
  } catch (error) {
    console.log("folderxDatesRegisterController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const getDatesController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const datesFound = await folderxDates.find({ estimateId });
    if (datesFound.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "Date Not Found",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Estimate Dates Found !",
      data: datesFound[0],
    });
  } catch (error) {
    console.log("getDatesController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const folderXDateUpdateController = async (req, res) => {
  try {
    const { datesId } = req.params;
    const {
      appTowDrop,
      appointmentDate,
      vehicalArrivalDate,
      authorizationSigned,
      customerRentalCompany,
      totalJobHour,
      cycleTime,
      daysForParts,
      targetDate,
      pickupDate,
      customerNotified,
      vehicalDelivered,
      appointmentDateCheck,
      vehicalArrivalDateCheck,
      authorizationSignedCheck,
      customerRentalCompanyCheck,
      targetDateCheck,
      pickupDateCheck,
      customerNotifiedCheck,
      vehicalDeliveredCheck,
      appTowDropCheck,
      totalJobHourCheck,
      cycleTimeCheck,
      daysForPartsCheck,
    } = req.body;
    const folderXDatesUpdate = await folderxDates.findByIdAndUpdate(datesId, {
      $set: {
        appTowDrop,
        appointmentDate,
        vehicalArrivalDate,
        authorizationSigned,
        customerRentalCompany,
        totalJobHour,
        cycleTime,
        daysForParts,
        targetDate,
        pickupDate,
        customerNotified,
        vehicalDelivered,
        appointmentDateCheck,
        vehicalArrivalDateCheck,
        authorizationSignedCheck,
        customerRentalCompanyCheck,
        targetDateCheck,
        pickupDateCheck,
        customerNotifiedCheck,
        vehicalDeliveredCheck,
        appTowDropCheck,
        totalJobHourCheck,
        cycleTimeCheck,
        daysForPartsCheck,
      },
    });
    if (!folderXDatesUpdate) {
      return res.status(404).json({
        success: false,
        msg: "Dates For the Estimate Not Found",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Dates has been Updated",
    });
  } catch (error) {
    console.log("getDatesController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

module.exports = {
  folderxDatesRegisterController,
  getDatesController,
  folderXDateUpdateController,
};
