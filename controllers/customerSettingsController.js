const customerSettings = require("../models/customerSettingsModel");
const shops = require("../models/shopModel");

const customerSettingsRegesterController = async (req, res) => {
  try {
    const { timeLine, shopId } = req.body;
    const shopData = await shops.findById(shopId);
    if (!shopData) {
      res.status(404).json({
        success: false,
        msg: "No Such Shop Found!!!",
      });
    }
    const customerSettingsData = await customerSettings.create({
      timeLine,
      shopId,
    });
    res.status(200).json({
      success: true,
      msg: "Customer Setting Created !!!",
      data: customerSettingsData,
    });
  } catch (error) {
    console.log("customerSettingsRegesterController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const getCustomerSettingsController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const gotData = await customerSettings.find({ shopId: shopId });
    if (!gotData) {
      res.status(404).json({
        success: false,
        msg: "Customer Setting notFound !!!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Customer Setting Found !!!",
      data: gotData,
    });
  } catch (error) {
    console.log("getCustomerSettingsController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

module.exports = {
  customerSettingsRegesterController,
  getCustomerSettingsController,
};
