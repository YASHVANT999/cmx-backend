const Productions = require("../models/repairOrderProductionModel");
const estimates = require("../models/estimateProfileModel");

const repairOrderProductionController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const productionData = {
      vehicalInShopCheckBox: req.body.vehicalInShopCheckBox,
      vehicalInShopTextArea: req.body.vehicalInShopTextArea,
      vehicalInShopDate: req.body.vehicalInShopDate,
      repairPlanCopleteCheckBox: req.body.repairPlanCopleteCheckBox,
      repairPlanCopleteTextArea: req.body.repairPlanCopleteTextArea,
      repairPlanCopleteDate: req.body.repairPlanCopleteDate,
      supplementHoldCheckBox: req.body.supplementHoldCheckBox,
      supplementHoldTextArea: req.body.supplementHoldTextArea,
      supplementHoldDate: req.body.supplementHoldDate,
      supplementApprovedCheckBox: req.body.supplementApprovedCheckBox,
      supplementApprovedTextArea: req.body.supplementApprovedTextArea,
      supplementApprovedDate: req.body.supplementApprovedDate,
      vehicalQualityCheckCheckBox: req.body.vehicalQualityCheckCheckBox,
      vehicalQualityCheckTextArea: req.body.vehicalQualityCheckTextArea,
      vehicalQualityCheckDate: req.body.vehicalQualityCheckDate,
      vehicalTestDriveCheckBox: req.body.vehicalTestDriveCheckBox,
      vehicalTestDriveTextArea: req.body.vehicalTestDriveTextArea,
      vehicalTestDriveDate: req.body.vehicalTestDriveDate,
      vehicalCompleteCheckBox: req.body.vehicalCompleteCheckBox,
      vehicalCompleteTextArea: req.body.vehicalCompleteTextArea,
      vehicalCompleteDate: req.body.vehicalCompleteDate,
      preScanCheckBox: req.body.preScanCheckBox,
      preScanTextArea: req.body.preScanTextArea,
      preScanSelect: req.body.preScanSelect,
      preScanDate: req.body.preScanDate,
      postScanCheckBox: req.body.postScanCheckBox,
      postScanTextArea: req.body.postScanTextArea,
      postScanSelect: req.body.postScanSelect,
      postScanDate: req.body.postScanDate,
      alignmentScanCheckBox: req.body.alignmentScanCheckBox,
      alignmentScanTextArea: req.body.alignmentScanTextArea,
      alignmentScanSelect: req.body.alignmentScanSelect,
      alignmentScanDate: req.body.alignmentScanDate,
      wheelSubletCheckBox: req.body.wheelSubletCheckBox,
      wheelSubletTextArea: req.body.wheelSubletTextArea,
      wheelSubletSelect: req.body.wheelSubletSelect,
      wheelSubletDate: req.body.wheelSubletDate,
      subletRepairCheckBox: req.body.subletRepairCheckBox,
      subletRepairTextArea: req.body.subletRepairTextArea,
      subletRepairNotes: req.body.subletRepairNotes,
      subletRepairDate: req.body.subletRepairDate,
      dealerShipCheckBox: req.body.dealerShipCheckBox,
      dealerShipTextArea: req.body.dealerShipTextArea,
      dealerShipNotes: req.body.dealerShipNotes,
      dealerShipDate: req.body.dealerShipDate,
      custom1CheckBox: req.body.custom1CheckBox,
      custom1TextArea: req.body.custom1TextArea,
      custom1Notes: req.body.custom1Notes,
      custom1Date: req.body.custom1Date,
      custom2CheckBox: req.body.custom2CheckBox,
      custom2TextArea: req.body.custom2TextArea,
      custom2Notes: req.body.custom2Notes,
      custom2Date: req.body.custom2Date,
      custom3CheckBox: req.body.custom3CheckBox,
      custom3TextArea: req.body.custom3TextArea,
      custom3Notes: req.body.custom3Notes,
      custom3Date: req.body.custom3Date,
    };
    const estimateFound = await estimates.findById(estimateId);
    if (!estimateFound) {
      res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const productionFound = await Productions.findOne({ estimateId });
    if (!productionFound) {
      await Productions.create({
        estimateId,
        ...productionData,
      });
    } else {
      await Productions.findByIdAndUpdate(productionFound._id, {
        ...productionData,
      });
    }
    res.status(200).json({
      success: true,
      msg: "Production has been Saved !!!",
    });
  } catch (error) {
    console.error("repairOrderProductionController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const getRepairOrderProductionController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const estimateFound = await estimates.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const productionFound = await Productions.findOne({ estimateId });
    if (!productionFound) {
      return res.status(404).json({
        success: false,
        msg: "Production Not Found !!!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Production Found !!!",
      data: productionFound,
    });
  } catch (error) {
    console.error("repairOrderProductionController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

module.exports = {
  repairOrderProductionController,
  getRepairOrderProductionController,
};
