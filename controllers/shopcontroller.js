const shops = require("../models/shopModel");
const users = require("../models/userModel");
const customers = require("../models/customerModel");
const fs = require("fs");
const path = require("path");
const ObjectId = require("mongodb").ObjectId;
const { deleteFileFromOVH } = require('../lib/ovh-object-storage')

const shopDetailUpdateController = async (req, res) => {
  try {
    const {
      shopId,
      shopName,
      address,
      city,
      state,
      zipCode = "",
      country,
      dateFormat,
      timeZone,
      timeFormat,
      website = "",
      fullName,
      phone1,
      phone2 = "",
      fax = "",
      websiteStatue,
      removeLogo = false,
    } = req.body;
    const prevShop = await shops.findOne({
      shopId: { $regex: shopId, $options: "i" },
    });
    if (!prevShop) {
      return res.status(404).json({
        success: false,
        msg: "No such shop found",
      });
    }
    let updateData = {
      shopName,
      address,
      city,
      state,
      zipCode,
      country,
      dateFormat,
      timeZone,
      timeFormat,
      website,
      fullName,
      phone1,
      phone2,
      fax,
      websiteStatue,
      ...req.body
    };
    if (removeLogo && JSON.parse(removeLogo)) {
      updateData.shopLogo = null;
    }
    else if (req.file) {
      updateData.shopLogo = req.file.filename;
    }
    const insertShop = await shops.updateOne({ _id: prevShop._id }, updateData);

    res.status(201).json({
      success: true,
      msg: "Shop has been updated !!!",
    });
  } catch (error) {
    console.log("shopDetailUpdateController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
};

const getShopDetailController = async (req, res) => {
  try {
    const { id } = req.params;
    const getDetail = await shops.findById(id);
    if (!getDetail) {
      return res
        .status(404)
        .send({ success: false, msg: "Shop not found!", data: [] });
    }
    res.status(200).send({
      success: true,
      msg: "Shop details retrieved!",
      data: {
        ...getDetail.toObject(),
        // shopLogo: 'https://cmx-storage.s3.us-east-va.io.cloud.ovh.us/20250324_110828logo.png',
      },
    });
  } catch (error) {
    console.log("getShopDetailController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const getAllCustomerInShopController = async (req, res) => {
  const { page, shopId } = req.params;
  try {
    const totalCustomer = await customers.countDocuments({
      shopId: shopId,
    });

    const customerData = await shops.aggregate([
      {
        $match: {
          _id: new ObjectId(shopId),
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "shopId",
          as: "customers",
        },
      },
      {
        $unwind: "$customers",
      },
      {
        $sort: {
          "customers.created_at": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          customers: {
            $push: "$customers",
          },
        },
      },
      {
        $project: {
          shopId: "$_id",
          _id: 0,
          customers: 1,
        },
      },
    ]);
    if (!customerData) {
      return res.status(404).json({
        sucess: false,
        msg: "No Such customers Found",
        data: [],
      });
    }
    const pageSize = 25;

    const skip = (page - 1) * pageSize;

    const paginatedResults = customerData.map((item) => {
      return {
        ...item,
        customers: item.customers.slice(skip, skip + pageSize),
      };
    });
    return res.status(200).json({
      sucess: true,
      msg: "Customer found of this Shop",
      data: paginatedResults,
      totalCustomer: totalCustomer,
    });
  } catch (error) {
    console.log("getAllCustomerInShopController", error);
    res.status(500).json({
      sucess: false,
      err: error,
      data: [],
    });
  }
};

const searchCustomerInShopInShopController = async (req, res) => {
  try {
    const { text, shopId, page, pageSize } = req.params;
    const result = await shops.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "shopId",
          as: "customers",
        },
      },
      {
        $unwind: "$customers",
      },
      {
        $match: {
          $and: [
            { _id: new ObjectId(shopId) },
            {
              $or: [
                {
                  "customers.firstName": {
                    $regex: `^${text}[a-zA-Z]*$`,
                    $options: "i",
                  },
                },
                {
                  "customers.address": {
                    $regex: `^${text}[a-zA-Z]*$`,
                    $options: "i",
                  },
                },
                {
                  "customers.email": {
                    $regex: `^${text}[a-zA-Z0-9._%+-@.]*$`,
                    $options: "i",
                  },
                },
                {
                  "customers.lastName": {
                    $regex: `^${text}[a-zA-Z]*$`,
                    $options: "i",
                  },
                },
                {
                  "customers.phone": {
                    $regex: `^${text}[0-9]*$`,
                    $options: "i",
                  },
                },
                {
                  "customers.phone2": {
                    $regex: `^${text}[0-9]*$`,
                    $options: "i",
                  },
                },
                {
                  "customers.customerId": {
                    $regex: `^${text}[0-9]*$`,
                    $options: "i",
                  },
                },
              ],
            },
          ],
        },
      },
      {
        $sort: {
          "customers.firstName": 1,
          "customers.lastName": 1,
          "customers.email": 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          customers: {
            $push: "$customers",
          },
        },
      },
    ]);
    if (!result) {
      return res.status(404).json({
        success: false,
        msg: "No Such customers Found",
        data: [],
      });
    }
    const skip = (page - 1) * pageSize;

    const paginatedResults = result.map((item) => {
      return {
        ...item,
        customers: item.customers.slice(skip, skip + pageSize),
      };
    });
    res.status(200).json({
      success: true,
      msg: "Your Search Data is Found!!!",
      data: paginatedResults,
    });
  } catch (error) {
    console.log("searchCustomerInShopInShopController", error);
    res.status(500).json({
      sucess: false,
      err: error,
      data: [],
    });
  }
};

// const sendSms = async (req,res) => {
//    try{

//    }catch(error){
//     console.log("sendSms", error);
//     res.status(500).json({
//       sucess: false,
//       err: error,
//       data: [],
//     });
//    }
// }

const getAllUsersInShopController = async (req, res) => {
  const { page, shopId } = req.params;
  const { text } = req.query;
  const limitMap = {
    1: 10,
    2: 25,
    3: 50,
    4: 100,
  };
  try {
    let searchQuery = [];
    if (text?.length) {
      searchQuery = [
        {
          "users.employeeTile": {
            $regex: `^${text}[a-zA-Z]*$`,
            $options: "i",
          },
        },
        {
          "users.firstName": {
            $regex: `^${text}[a-zA-Z]*$`,
            $options: "i",
          },
        },
        {
          "users.lastName": {
            $regex: `^${text}[a-zA-Z]*$`,
            $options: "i",
          },
        },
        {
          "users.email": {
            $regex: `^${text}[a-zA-Z0-9._%+-@.]*$`,
            $options: "i",
          },
        },
        {
          "users.phone": {
            $regex: `^${text}[0-9]*$`,
            $options: "i",
          },
        },
        {
          "users.userName": {
            $regex: `^${text}[0-9]*$`,
            $options: "i",
          },
        },
      ];
    }
    const userData = await shops.aggregate([
      {
        $match: {
          _id: new ObjectId(shopId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "shopId",
          as: "users",
        },
      },
      {
        $unwind: "$users",
      },
      {
        $match: {
          $and: [
            { "users.activeStatue": true, },
            // {
            //   $or: searchQuery,
            // },
            ...(searchQuery.length > 0 ? [{ $or: searchQuery }] : []),
          ],
        },
      },
      {
        $sort: {
          "users.firstName": 1,
        },
      },
      {
        $limit: limitMap[page],
      },
      {
        $group: {
          _id: "$_id",
          users: {
            $push: "$users",
          },
        },
      },
      {
        $project: {
          shopId: "$_id",
          _id: 0,
          users: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      msg: "Customers found for this shop",
      data: userData,
    });
  } catch (error) {
    console.error("getAllUsersInShopController error:", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const createShopController = async (req, res) => {
  try {
    const {
      shopName,
      address,
      city,
      state,
      zipCode,
      country,
      dateFormat,
      timeZone,
      timeFormat,
      website,
      fullName,
      phone1,
      phone2,
      fax,
      websiteStatue,
    } = req.body;
    const createShop = await shops.create({
      shopName,
      address,
      city,
      state,
      zipCode,
      country,
      dateFormat,
      timeZone,
      timeFormat,
      website,
      fullName,
      phone1,
      phone2,
      fax,
      websiteStatue,
    });
    res.status(200).json({
      success: true,
      msg: "Shop Creared",
      data: createShop,
    });
  } catch (error) {
    console.error("createShopController error:", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const estimateDefaultController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { Estimator, Insurance, Days, estimateDefaultAssign } = req.body;
    const shopFound = await shops.findById(shopId);
    if (!shopFound) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    // const findUser = await users.findById(Estimator);
    // if (!findUser) {
    //   return res.status(404).json({
    //     success: false,
    //     msg: "User Not Found !!!",
    //   });
    // }
    shopFound.EstimateDefault = { Estimator, Insurance, Days };
    shopFound.estimateDefaultAssign = estimateDefaultAssign;
    await shopFound.save();
    res.status(200).json({
      success: true,
      msg: "Shop Estimate Default has been Updated !!!",
    });
  } catch (error) {
    console.error("estimateDefaultController error:", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const repairOrderDefaultController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { Estimator, Insurance, Days, repairOrderDefaultAssign } = req.body;
    const shopFound = await shops.findById(shopId);
    if (!shopFound) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    // const findUser = await users.findById(Estimator);
    // if (!findUser) {
    //   return res.status(404).json({
    //     success: false,
    //     msg: "User Not Found !!!",
    //   });
    // }
    shopFound.RepairOrderDefault = { Estimator, Insurance, Days };
    shopFound.repairOrderDefaultAssign = repairOrderDefaultAssign;
    await shopFound.save();
    res.status(200).json({
      success: true,
      msg: "Shop Estimate Default has been Updated !!!",
    });
  } catch (error) {
    console.error("repairOrderDefaultController error:", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const updateShopLogoController = async (req, res) => {
  try {
    const {
      shopId,
      removeLogo = 'false',
    } = req.body;
    if (!shopId) {
      return res.status(404).json({
        success: false,
        msg: "Shop is cannot be empty!",
      });
    }
    const prevShop = await shops.findOne({
      shopId: { $regex: shopId, $options: "i" },
    });
    if (!prevShop) {
      return res.status(404).json({
        success: false,
        msg: "No such shop found",
      });
    }
    if (prevShop.shopLogo) {
      await deleteFileFromOVH(prevShop.shopLogo);
    }

    await shops.updateOne(
      { _id: prevShop._id },
      { $set: { shopLogo: removeLogo === "false" ? req.file.location : null } }
    );

    res.status(201).json({
      success: true,
      msg: "Shop logo updated successfully!",
    });
  } catch (error) {
    console.log("updateShopLogoController", error);
    res.status(500).json({
      success: false,
      err: error,
      data: [],
    });
  }
}

module.exports = {
  shopDetailUpdateController,
  getShopDetailController,
  searchCustomerInShopInShopController,
  getAllCustomerInShopController,
  getAllUsersInShopController,
  createShopController,
  estimateDefaultController,
  repairOrderDefaultController,
  updateShopLogoController,
};
