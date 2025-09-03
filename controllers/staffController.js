const staffs = require("../models/staffModel");
const folderxs = require("../models/folderxModel");

const staffRegisterController = async (req, res) => {
  try {
    const {
      folderxId,
      Estimator,
      BodyTechnician,
      PainterTechnician,
      FrameTechnician,
      DetailTechnician,
      Office,
      ProductionManagement,
    } = req.body;
    const foundFolderx = await folderxs.findById(folderxId);
    if (!foundFolderx) {
      return res.status(404).json({
        success: false,
        msg: "Folderx Not Found !!!",
      });
    }
    const staffData = await staffs.create({
      folderxId,
      Estimator,
      BodyTechnician,
      PainterTechnician,
      FrameTechnician,
      DetailTechnician,
      Office,
      ProductionManagement,
    });
    await folderxs.findByIdAndUpdate(folderxId, {
      staffId: staffData._id,
    });
    res.status(200).json({
      success: true,
      msg: "Staff Data Includede !!!",
      data: staffData,
    });
  } catch (error) {
    console.log("staffRegisterController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const userStaffDetailsController = async (req, res) => {
  try {
    const { id } = req.params;
    const staffData = await staffs.findById(id);
    if (!staffData) {
      return res.status(404).json({
        success: false,
        msg: "No such Staff Data Found !!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Your staff data",
      data: staffData,
    });
  } catch (error) {
    console.log("userStaffDetailsController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

module.exports = {
  staffRegisterController,
  userStaffDetailsController,
};
