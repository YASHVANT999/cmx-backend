const EstimateAppoinments = require("../models/estimateAppoinmentModel");
const Shops = require("../models/shopModel");

const estimateAppoinmentRegisterController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const {
      _id,
      firstName,
      lastName,
      phone,
      email,
      insurance,
      appointmentType,
      estimateAppointmentDate,
      durationOfAppointment,
      estimator,
      chatlinkOpt,
      welcomeFormComp,
      customerProfile,
      estimateProfile,
      missedAppointment,
      completedAppointment,
    } = req.body;
    const shopFound = await Shops.findById(shopId);
    if (!shopFound) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    if (_id) {
      await EstimateAppoinments.findByIdAndUpdate(_id, {
        firstName,
        lastName,
        phone,
        email,
        insurance,
        appointmentType,
        estimateAppointmentDate,
        durationOfAppointment,
        estimator,
        chatlinkOpt,
        welcomeFormComp,
        customerProfile,
        estimateProfile,
        missedAppointment,
        completedAppointment,
      });
      res.status(200).json({
        success: true,
        msg: "Estimate Appoinment has been Updated !!!",
      });
    } else {
      await EstimateAppoinments.create({
        shopId,
        firstName,
        lastName,
        phone,
        email,
        insurance,
        appointmentType,
        estimateAppointmentDate,
        durationOfAppointment: durationOfAppointment || '15',
        estimator,
        chatlinkOpt,
        welcomeFormComp,
        customerProfile,
        estimateProfile,
        missedAppointment,
        completedAppointment,
      });
      res.status(200).json({
        success: true,
        msg: "Estimate Appoinment has been Created !!!",
      });
    }
  } catch (error) {
    console.error("estimateAppoinmentRegisterController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const getEstimateAppoinmentOfShopController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const shopFound = await Shops.findById(shopId);
    if (!shopFound) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const estimateAppoinmentFound = await EstimateAppoinments.find({ shopId });
    res.status(200).json({
      success: true,
      msg: "Estimate Appoinment of the Shop Found !!!",
      data: estimateAppoinmentFound,
    });
  } catch (error) {
    console.error("getEstimateAppoinmentOfShopController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const deleteEstimateAppoinmentController = async (req, res) => {
  try {
    const { Id } = req.params;
    const estimateAppoinmentDelete = await EstimateAppoinments.findByIdAndDelete(
      Id
    );
    if (estimateAppoinmentDelete) {
      res.status(200).json({
        success: true,
        msg: "Estimate Appoinment has been Deleted !!!",
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "Estimate Appoinment not found",
      });
    }
  } catch (error) {
    console.error("deleteEstimateAppoinmentController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const getEstimateAppoinmentController = async (req, res) => {
  try {
    const { Id } = req.params;
    const estimateAppoinmentFound = await EstimateAppoinments.findById(Id);
    if (!estimateAppoinmentFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Appoinment Not Found !!!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Estimate Appoinment Found !!!",
      data: estimateAppoinmentFound,
    });
  } catch (error) {
    console.error("getEstimateAppoinmentController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const updateEstimateAppoinmentController = async (req, res) => {
  try {
    const { Id } = req.params;
    const { estimateAppointmentDate } = req.body;

    const estimateAppoinmentFound = await EstimateAppoinments.findByIdAndUpdate(
      Id,
      { estimateAppointmentDate }
    );
    if (!estimateAppoinmentFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Appoinment Not Found!!!",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Estimate Appoinment updated successfully",
    });
  } catch (error) {
    console.error("updateEstimateAppoinmentController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

module.exports = {
  estimateAppoinmentRegisterController,
  getEstimateAppoinmentOfShopController,
  deleteEstimateAppoinmentController,
  getEstimateAppoinmentController,
  updateEstimateAppoinmentController,
};
