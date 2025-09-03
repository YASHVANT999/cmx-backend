const shopRates = require("../models/shopRatesModel");
const shops = require("../models/shopModel");

const shopRatesRegister = async (req, res) => {
  try {
    const { shopId } = req.params;
    const shopRatesData = req.body;
    const shop = await shops.findById(shopId);

    if (!shop) {
      return res.status(404).send({
        success: false,
        msg: "No Such Shop Exists!!!",
        data: [],
      });
    }

    const findShopRates = await shopRates.findOne({ shopId });

    if (!findShopRates) {
      await shopRates.create({ ...shopRatesData, shopId });
    } else {
      await shopRates.findByIdAndUpdate(findShopRates._id, shopRatesData);
    }

    res.status(200).send({
      success: true,
      msg: "Shop Rates has been Added!!!",
    });
  } catch (error) {
    console.log("shopRatesRegister", error);
    res.status(500).send({ success: false, error: error, data: [] });
  }
};

const getShopRatesController = async (req, res) => {
  try {
    const { id } = req.params;
    const getShopRates = await shops.findById(id);
    if (!getShopRates) {
      res.status(404).send({ sucess: false, msg: "Shop Not Found" });
    }
    const getData = await shopRates.find({ shopId: id });
    if (!getData) {
      res.status(404).send({ sucess: false, msg: "Shop Rates Not Found" });
    }
    res
      .status(200)
      .send({ sucess: false, msg: "Shop Rates Found", data: getData });
  } catch (error) {
    console.log("getShopRatesController", error);
    res.status(500).send({ sucess: false, error: error, data: [] });
  }
};

module.exports = { shopRatesRegister, getShopRatesController };
