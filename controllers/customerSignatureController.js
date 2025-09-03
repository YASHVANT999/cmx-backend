const customerSignatures = require("../models/customerSignatireModel");
const shops = require("../models/shopModel");

const getSignatureController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const findShop = await shops.findById(shopId);
    if (!findShop) {
      res.status(4040).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const gotData = await customerSignatures.find({shopId});
    res.status(200).json({
      success: true,
      msg: "Your Signarures Found !!!",
      data: gotData,
    });
  } catch (error) {
    console.log("getSignatureController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const updateCustomerSignatureController = async (req, res) => {
  try {
    const { shopId, signature } = req.body;
    const findShop = await shops.findById(shopId);
    if (!findShop) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }

    const existingSignature = await customerSignatures.findOne({
      shopId: shopId,
    });

    if (existingSignature) {
      const updatedSignature = await customerSignatures.findOneAndUpdate(
        { shopId: shopId },
        { $set: { signature: signature } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        msg: "Signature Updated !!!",
        data: updatedSignature,
      });
    } else {
      const newSignature = new customerSignatures({
        shopId: shopId,
        signature: signature,
      });
      await newSignature.save();
      return res.status(200).json({
        success: true,
        msg: "New Signature Created !!!",
        data: newSignature,
      });
    }
  } catch (error) {
    console.log("updateCustomerSignatureController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

module.exports = { updateCustomerSignatureController, getSignatureController };
