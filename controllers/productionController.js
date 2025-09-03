const productions = require("../models/productionModel");
const folderxs = require("../models/folderxModel");

const productionRegisterController = async (req, res) => {
  try {
    const {
      folderxId,
      vehicalInShop,
      vehicalInShopDate,
      repairPlanComp,
      repairPlanCompDate,
      supplementHold,
      supplementHoldDate,
      supplementApproved,
      supplementApprovedDate,
      vehicalQual,
      vehicalQualDate,
      vehicalTsetDrive,
      vehicalTsetDriveDate,
      vehicalComp,
      vehicalCompDate,
      preScan,
      preScanDate,
      postScan,
      postScanDate,
      alignmentScan,
      alignmentScanDate,
      wheelSublet,
      wheelSubletDate,
      SubletRepair,
      SubletRepairDate,
      dealerShip,
      dealerShipDate,
      custom1,
      custom1Date,
      custom2,
      custom2Date,
      custom3,
      custom3Date,
      preScanNotes,
      postScanNotes,
      alignmentScanNotes,
      wheelSubletNotes,
      SubletRepairNotes,
      dealershipNotes,
      custom1Notes,
      custom2Notes,
      custom3Notes,
    } = req.body;
    const foundFolderx = await folderxs.findById(folderxId);
    if (!foundFolderx) {
      return res.status(404).json({
        success: false,
        msg: "Folderx Not Found !!!",
      });
    }
    const productionData = await productions.create({
      folderxId,
      vehicalInShop,
      vehicalInShopDate,
      repairPlanComp,
      repairPlanCompDate,
      supplementHold,
      supplementHoldDate,
      supplementApproved,
      supplementApprovedDate,
      vehicalQual,
      vehicalQualDate,
      vehicalTsetDrive,
      vehicalTsetDriveDate,
      vehicalComp,
      vehicalCompDate,
      preScan,
      preScanDate,
      postScan,
      postScanDate,
      alignmentScan,
      alignmentScanDate,
      wheelSublet,
      wheelSubletDate,
      SubletRepair,
      SubletRepairDate,
      dealerShip,
      dealerShipDate,
      custom1,
      custom1Date,
      custom2,
      custom2Date,
      custom3,
      custom3Date,
      preScanNotes,
      postScanNotes,
      alignmentScanNotes,
      wheelSubletNotes,
      SubletRepairNotes,
      dealershipNotes,
      custom1Notes,
      custom2Notes,
      custom3Notes,
    });
    await folderxs.findByIdAndUpdate(folderxId, {
      productionId: productionData._id,
    });
    res.status(200).json({
      success: true,
      msg: "productions has been created",
      data: productionData,
    });
  } catch (error) {
    console.log("productionRegisterController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const productionUserDataController = async (req, res) => {
  try {
    const { id } = req.params;
    const productionData = await productions.findById(id);
    if (!productionData) {
      return res.status(404).json({
        success: false,
        msg: "No Such Product Data Found",
      });
    }
    res.status(200).json({
      success: false,
      msg: "Found Your Data",
      data: productionData,
    });
  } catch (error) {
    console.log("productionUserDataController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

module.exports = {
  productionRegisterController,
  productionUserDataController,
};
