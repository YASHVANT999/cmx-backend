const customerChatLinks = require("../models/customerChatLinkMessagesModel");
const shops = require("../models/shopModel");

const customerChatLinkRegisterController = async (req, res) => {
  try {
    const { shopId, type, title, data } = req.body;
    const findShop = await shops.findById(shopId);
    if (!findShop) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const addData = await customerChatLinks.create({
      shopId,
      type,
      title,
      data,
    });
    res.status(200).json({
      success: true,
      msg: "Customer Comments created Sucessfully !!!",
      data: addData,
    });
    console.log(
      "customerCommentRegisterController====> customer Commments created"
    );
  } catch (error) {
    console.log("customerCommentRegisterController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const getCustomerChatLinkData = async (req, res) => {
  try {
    const { shopId } = req.params;
    const findShop = await shops.findById(shopId);
    if (!findShop) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const customerChatLinkData = await customerChatLinks.find({
      shopId,
    });
    const groupedData = customerChatLinkData.reduce((acc, curr) => {
      if (!acc[curr.type]) {
        acc[curr.type] = [];
      }
      acc[curr.type].push(curr);
      return acc;
    }, {});
    res.status(200).json({
      success: true,
      msg: "Customer Comments Data !!!",
      data: groupedData,
    });
  } catch (error) {
    console.log("getcustomerCommentData", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const updateChatLinkController = async (req, res) => {
  try {
    const { _id, data, title } = req.body;
    const updateData = await customerChatLinks.findByIdAndUpdate(
      _id,
      { data: data, title: title },
      { new: true }
    );
    if (!updateData) {
      return res.status(404).json({
        success: false,
        msg: "The Chat Link Not Found !!!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "The Chat Link data has been Updated !!!",
      data: updateData,
    });
  } catch (error) {
    console.log("updateChatLinkController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const getTypeEstimateChatLinkController = async (req, res) => {
  try {
    const { shopId, type } = req.params;
    const foundShop = await shops.findById(shopId);
    if (!foundShop) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const foundChatEstimate = await customerChatLinks.find({ shopId, type });
    res.status(200).json({
      success: true,
      msg: "Estimate Chat Found !!!",
      data: foundChatEstimate,
    });
  } catch (error) {
    console.log("getTypeEstimateChatLinkController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred !!!",
    });
  }
};

module.exports = {
  customerChatLinkRegisterController,
  getCustomerChatLinkData,
  updateChatLinkController,
  getTypeEstimateChatLinkController,
};
