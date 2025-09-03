const repairOrders = require("../models/repairOrderModel");
const folderxDates = require("../models/folderxDatesModel");
const estimates = require("../models/estimateProfileModel");
const estimateprofilePhotos = require("../models/estimateProfilePhotos");
const customers = require("../models/customerModel");
const shops = require("../models/shopModel");
const vehicals = require("../models/customerVehicalModel");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const path = require('path');
// other requires like models, convertHtmlToPdf, etc.

const convertHtmlToPdf = require("./documentPdfConverterContoller")
const repairOrderRegisterController = async (req, res) => {
  try {
    const { estimateId } = req.body;
    const estimateFound = await estimates.findByIdAndUpdate(
      estimateId,
      {
        repairOrder: true,
      },
      { upsert: true, new: true }
    );
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !",
      });
    }
    const repairData = await repairOrders.create({
      estimateId: estimateFound._id,
    });

    const repairOrderFound = await repairOrders.findOne({ estimateId: estimateFound._id}).populate([
      {
        path: "estimateId",
        model: "estimateprofiles",
        populate: [
          {
            path: "customerId",
            model: "customers",
          },
          {
            path: "vehicalId",
            model: "customervehicals",
          },
          {
            path: "insuranceId",
            model: "insurances",
          },
        ],
      },
    ]);
    if(repairOrderFound){
      const folderxDatesGet = await folderxDates.findOne({ estimateId: estimateFound._id});


      /* CREATE windShieldQa PDF */      
      let outputPath =path.join(__dirname, `../public/docsFile/windShieldQa_${repairData.repairOrdreId}.pdf`);
      let htmlDataWindShieldQa = {
        "ArrivalDate":folderxDatesGet.vehicalArrivalDate,
        "TargetDate":folderxDatesGet.targetDate,
        "RoFirstName":repairOrderFound.estimateId.firstName,
        "RoLastName":repairOrderFound.estimateId.lastName,
        "CustomerFirstName":repairOrderFound.estimateId.customerId.firstName,
        "CustomerLastName":repairOrderFound.estimateId.customerId.lastName,
        "RO":repairOrderFound.repairOrdreId,
        "Vehicle":repairOrderFound.estimateId.vehicalId.year+", "+repairOrderFound.estimateId.vehicalId.make+", "+repairOrderFound.estimateId.vehicalId.model,
        "VIN":repairOrderFound.estimateId.vehicalId.vin,
        "Insurance":repairOrderFound.estimateId.insuranceId.InsuranceName,
        "PreScanCompleted":"Yes",
        "PostScanCompleted":"Yes",
        "DynamicDriveCompleted":"Yes",
        "ADASCalibrationNeeded":"Yes",
      }
      await convertHtmlToPdf(outputPath,htmlDataWindShieldQa,"windShieldQa");
      /* //CREATE windShieldQa PDF */

      /* CREATE windShield PDF */
      let windShieldOutputPath =path.join(__dirname, `../public/docsFile/windShield_${repairData.repairOrdreId}.pdf`);
      let htmlDataWindShield= {
        "ArrivalDate":folderxDatesGet.vehicalArrivalDate,
        "TargetDate":folderxDatesGet.targetDate,
        "RoFirstName":repairOrderFound.estimateId.firstName,
        "RoLastName":repairOrderFound.estimateId.lastName,
        "CustomerFirstName":repairOrderFound.estimateId.customerId.firstName,
        "CustomerLastName":repairOrderFound.estimateId.customerId.lastName,
        "RO":repairOrderFound.repairOrdreId,
        "Vehicle":repairOrderFound.estimateId.vehicalId.year+", "+repairOrderFound.estimateId.vehicalId.make+", "+repairOrderFound.estimateId.vehicalId.model,
        "VIN":repairOrderFound.estimateId.vehicalId.vin,
        "Insurance":repairOrderFound.estimateId.insuranceId.InsuranceName,
        "PreScanCompleted":"Yes",
        "PostScanCompleted":"Yes",
        "DynamicDriveCompleted":"Yes",
        "ADASCalibrationNeeded":"Yes",
      }
      await convertHtmlToPdf(windShieldOutputPath,htmlDataWindShield,"windShield");
      /* //CREATE windShield PDF */

      /* CREATE windShield PDF */
      let CheckInKeyTag3_4OutputPath =path.join(__dirname, `../public/docsFile/CheckInKeyTag3_4_${repairData.repairOrdreId}.pdf`);
      let htmlDataCheckInKeyTag3_4= {
        "ArrivalDate":folderxDatesGet.vehicalArrivalDate,
        "TargetDate":folderxDatesGet.targetDate,
        "RoFirstName":repairOrderFound.estimateId.firstName,
        "RoLastName":repairOrderFound.estimateId.lastName,
        "CustomerFirstName":repairOrderFound.estimateId.customerId.firstName,
        "CustomerLastName":repairOrderFound.estimateId.customerId.lastName,
        "RO":repairOrderFound.repairOrdreId,
        "Vehicle":repairOrderFound.estimateId.vehicalId.year+", "+repairOrderFound.estimateId.vehicalId.make+", "+repairOrderFound.estimateId.vehicalId.model,
        "VIN":repairOrderFound.estimateId.vehicalId.vin,
        "Insurance":repairOrderFound.estimateId.insuranceId.InsuranceName,
        "PreScanCompleted":"Yes",
        "PostScanCompleted":"Yes",
        "DynamicDriveCompleted":"Yes",
        "ADASCalibrationNeeded":"Yes",
      }
      await convertHtmlToPdf(CheckInKeyTag3_4OutputPath,htmlDataCheckInKeyTag3_4,"CheckInKeyTag3_4");
      /* //CREATE CheckInKeyTag3_4 PDF */

    }
    
    res.status(200).json({
      success: false,
      msg: "Repair Oreder has been Created !!!",
      data: repairData,
    });
  } catch (error) {
    console.error("repairOrderRegisterController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const repairOrderRegisterDirectController = async (req, res) => {
  try {
    const { customerId, vehicalId, shopId } = req.body;
    const customerFound = await customers.findById(customerId);
    if (!customerFound) {
      return res.status(404).json({
        success: false,
        msg: "Customer Not Found !",
      });
    }
    const vehicalFound = await vehicals.findById(vehicalId);
    if (!vehicalFound) {
      return res.status(404).json({
        success: false,
        msg: "Vehical Not Found !",
      });
    }
    const shopFound = await shops.findById(shopId);
    if (!shopFound) {
      return res.status(404).json({
        success: false,
        msg: "shop Not Found !",
      });
    }
    const estimateCreated = await estimates.create({
      customerId,
      vehicalId,
      shopId,
      repairOrder: true,
    });
    const repairOrderData = await repairOrders.create({
      estimateId: estimateCreated._id,
    });
    res.status(200).json({
      success: true,
      msg: "Repair Order Created !",
      data: repairOrderData,
    });
  } catch (error) {
    console.error("repairOrderRegisterDirectController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const repairOrderCustomerAndVehicalController = async (req, res) => {
  try {
    const { id } = req.params;
    const repairOrderFound = await repairOrders
      .findOne({ repairOrdreId: id, Archived: false })
      .populate([
        {
          path: "estimateId",
          model: "estimateprofiles",
          populate: [
            {
              path: "customerId",
              model: "customers",
            },
            {
              path: "vehicalId",
              model: "customervehicals",
            },
          ],
        },
      ]);

    if (!repairOrderFound) {
      return res.status(404).json({
        success: false,
        msg: "Repair Order Not Found!",
      });
    }
    repairOrderFound.estimateId.photoExpress =
      repairOrderFound.estimateId.photoExpress.length > 0 &&
      repairOrderFound.estimateId.photoExpress.map((file) => {
        if (file.filename !== "") {
          return {
            ...file,
            filename: `/photoExpress/${file.filename}`,
          };
        } else {
          return file;
        }
      });
    repairOrderFound.estimateId.eSignatures =
      repairOrderFound.estimateId.eSignatures &&
      `/eSignatures/${repairOrderFound.estimateId.eSignatures}`;

    let estimateProfileId = repairOrderFound.estimateId._id;
    const estimateFoundGet1 = await estimateprofilePhotos.find({
      estimateProfileId: estimateProfileId,
    });
    repairOrderFound.estimateId.photesGalleries = estimateFoundGet1;

    res.status(200).json({
      success: true,
      msg: "Your Customer Data!!!",
      data: repairOrderFound,
    });
  } catch (error) {
    console.error("repairOrderCustomerAndVehicalController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const getAllRepairOrderController = async (req, res) => {
  try {
    const { ShopId, limit } = req.params;

    const totalCount = await estimates.countDocuments({
      repairOrder: true,
      Archived: false,
      shopId: ShopId,
    });

    const repairOrderAllData = await repairOrders
      .find()
      .limit(limit)
      .populate([
        {
          path: "estimateId",
          model: "estimateprofiles",
          populate: [
            {
              path: "customerId",
              model: "customers",
            },
            {
              path: "vehicalId",
              model: "customervehicals",
            },
          ],
        },
      ]);
    if (!repairOrderAllData) {
      return res.status(404).json({
        success: false,
        msg: "Repair Orders Not Found!",
      });
    }
    const filterRepairOrder = repairOrderAllData.filter((item) => {
      return item.estimateId!==null && item.estimateId.shopId.toString() === ShopId;
    });
    /* if(filterRepairOrder.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "No Repair Orders for the shop Found !!!",
        data: [],
        totalCount: 0,
      });
    } */
    res.status(200).json({
      success: true,
      msg: "Repair Orders Found !",
      data: filterRepairOrder,
      totalCount: totalCount,
    });

  } catch (error) {
    console.error("getAllRepairOrderController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const repairOrderSearchController = async (req, res) => {
  try {
    const { text, ShopId } = req.params;
    const searchData = await repairOrders.aggregate([
      {
        $lookup: {
          from: "estimateprofiles",
          localField: "estimateId",
          foreignField: "_id",
          as: "estimateId",
        },
      },
      {
        $unwind: "$estimateId",
      },
      {
        $lookup: {
          from: "customers",
          localField: "estimateId.customerId",
          foreignField: "_id",
          as: "estimateId.customerId",
        },
      },
      {
        $lookup: {
          from: "customervehicals",
          localField: "estimateId.vehicalId",
          foreignField: "_id",
          as: "estimateId.vehicalId",
        },
      },
      {
        $match: {
          "estimateId.shopId": new mongoose.Types.ObjectId(ShopId),
          $or: [
            {
              "estimateId.customerId.firstName": {
                $regex: text,
                $options: "i",
              },
            },
            {
              "estimateId.customerId.lastName": { $regex: text, $options: "i" },
            },
            { "estimateId.vehicalId.model": { $regex: text, $options: "i" } },
            { "estimateId.vehicalId.year": { $regex: text, $options: "i" } },
            { "estimateId.vehicalId.make": { $regex: text, $options: "i" } },
            { "estimateId.vehicalId.vin": { $regex: text, $options: "i" } },
            {
              "estimateId.vehicalId.insurance": { $regex: text, $options: "i" },
            },
            {
              "estimateId.vehicalId.estimator": { $regex: text, $options: "i" },
            },
            { "estimateId.vehicalId.total": { $regex: text, $options: "i" } },
            { repairOrdreId: { $regex: text, $options: "i" } },
          ],
        },
      },
    ]);

    if (!searchData) {
      res.status(404).json({
        success: false,
        msg: "Estimate Profiles Not Found!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Estimate Profiles Found!",
      data: searchData,
    });
  } catch (error) {
    console.error("repairOrderSearchController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const newRepairOrderController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const estimateFound = await estimates.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }

    const newEstimateData = {
      ...estimateFound.toObject(),
      _id: undefined,
      estimateId: undefined,
      createdAt: new Date(),
    };

    const newEstimate = new estimates(newEstimateData);

    await newEstimate.save();

    res.status(200).json({
      success: true,
      msg: "New Repair Oreder",
    });
  } catch (error) {
    console.error("newRepairOrderController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const repairOrderArchiveController = async (req, res) => {
  try {
    const { repairId } = req.params;
    const repairOrderFound = await repairOrders.findById(repairId);
    if (!repairOrderFound) {
      return res.status(404).json({
        success: false,
        msg: "Repair Order Not Found !!!",
      });
    }
    repairOrderFound.Archived = true;
    await repairOrderFound.save();
    res.status(200).json({
      success: true,
      msg: "The Repair Order has been Archived !!!",
    });
  } catch (error) {
    console.error("repairOrderArchiveController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const getAllArchivedRepairOrderController = async (req, res) => {
  try {
    const { ShopId } = req.params;
    const ArchivedRPFound = await repairOrders.aggregate([
      {
        $match: { Archived: true },
      },
      {
        $lookup: {
          from: "estimateprofiles",
          localField: "estimateId",
          foreignField: "_id",
          as: "estimateProfile",
        },
      },
      {
        $unwind: "$estimateProfile",
      },
      {
        $match: {
          "estimateProfile.shopId": new mongoose.Types.ObjectId(ShopId),
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "estimateProfile.customerId",
          foreignField: "_id",
          as: "estimateProfile.customerId",
        },
      },
      {
        $lookup: {
          from: "customervehicals",
          localField: "estimateProfile.vehicalId",
          foreignField: "_id",
          as: "estimateProfile.vehicalId",
        },
      },
      {
        $project: {
          _id: 1,
          estimateId: 1,
          Archived: 1,
          estimateProfile: 1,
        },
      },
    ]);
    if (ArchivedRPFound.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "No Archive Repair Order Found !!!",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      msg: "All the Archived Repair Order Found !!!",
      data: ArchivedRPFound,
    });
  } catch (error) {
    console.error("getAllArchivedRepairOrderController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const searchRepairOrderArchiveConntroller = async (req, res) => {
  try {
    const { text, ShopId } = req.params;
    const archiveSearch = await repairOrders.aggregate([
      { $match: { Archived: true } },
      {
        $lookup: {
          from: "estimateprofiles",
          localField: "estimateId",
          foreignField: "_id",
          as: "estimateId",
        },
      },
      {
        $unwind: "$estimateId",
      },
      {
        $lookup: {
          from: "customers",
          localField: "estimateId.customerId",
          foreignField: "_id",
          as: "estimateId.customerId",
        },
      },
      {
        $lookup: {
          from: "customervehicals",
          localField: "estimateId.vehicalId",
          foreignField: "_id",
          as: "estimateId.vehicalId",
        },
      },
      {
        $match: {
          "estimateId.shopId": new mongoose.Types.ObjectId(ShopId),
          $or: [
            {
              "estimateId.customerId.firstName": {
                $regex: text,
                $options: "i",
              },
            },
            {
              "estimateId.customerId.lastName": { $regex: text, $options: "i" },
            },
            { "estimateId.vehicalId.model": { $regex: text, $options: "i" } },
            { "estimateId.vehicalId.year": { $regex: text, $options: "i" } },
            { "estimateId.vehicalId.make": { $regex: text, $options: "i" } },
            { "estimateId.vehicalId.vin": { $regex: text, $options: "i" } },
            {
              "estimateId.vehicalId.insurance": { $regex: text, $options: "i" },
            },
            {
              "estimateId.vehicalId.estimator": { $regex: text, $options: "i" },
            },
            { "estimateId.vehicalId.total": { $regex: text, $options: "i" } },
            { repairOrdreId: { $regex: text, $options: "i" } },
          ],
        },
      },
    ]);
    if (archiveSearch.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "Archive Search not Found !!!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Search Archive Repair Ordre !!!",
      data: archiveSearch,
    });
  } catch (error) {
    console.error("searchRepairOrderArchiveConntroller", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const repairOrderFilterController = async (req, res) => {
  try {
    const { shopId, Estimator, Months, Year } = req.params;
    const findShop = await shops.findById(shopId);
    if (!findShop) {
      return res.status(500).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const getAllEstimates = await repairOrders.aggregate([
      {
        $lookup: {
          from: "estimateprofiles",
          localField: "estimateId",
          foreignField: "_id",
          as: "Estimate",
        },
      },
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  { $year: { $arrayElemAt: ["$Estimate.created_at", 0] } },
                  Number(Year),
                ],
              },
            ],
          },
        },
      },
    ]);
    if (getAllEstimates.length === 0) {
      return res.status(200).json({
        success: false,
        msg: "Estimate Found !!!",
        data: [],
      });
    }
    return res.status(200).json({
      success: false,
      msg: "Estimate Found !!!",
      data: getAllEstimates.length,
    });
  } catch (error) {
    console.error("repairOrderFilterController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const repairOrederInsuarnceController = async (req, res) => {
  try {
    const { shopId, text } = req.params;
    const findShop = await shops.findById(shopId);
    if (!findShop) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const findrepair = await repairOrders.aggregate([
      {
        $lookup: {
          from: "estimateprofiles",
          localField: "estimateId",
          foreignField: "_id",
          as: "estimateId",
        },
      },
      {
        $unwind: "$estimateId",
      },
      {
        $lookup: {
          from: "customers",
          localField: "estimateId.customerId",
          foreignField: "_id",
          as: "estimateId.customerId",
        },
      },
      {
        $lookup: {
          from: "customervehicals",
          localField: "estimateId.vehicalId",
          foreignField: "_id",
          as: "estimateId.vehicalId",
        },
      },
      {
        $match: {
          "estimateId.shopId": new ObjectId(shopId),
          "estimateId.insurance": { $regex: text, $options: "i" },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      msg: "Repair order Insurance Found !!!",
      data: findrepair,
    });
  } catch (error) {
    console.error("repairOrederInsuarnceController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const repairOrderDaysController = async (req, res) => {
  try {
    const { shopId, days } = req.params;
    const daysInt = parseInt(days);
    const findShop = await shops.findById(shopId);
    if (!findShop) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const startDate = new Date(Date.now() - daysInt * 24 * 60 * 60 * 1000);
    const cutoffDate = new Date(startDate.getTime() - 10 * 24 * 60 * 60 * 1000);
    const repairOrderFound = await repairOrders.aggregate([
      {
        $lookup: {
          from: "estimateprofiles",
          localField: "estimateId",
          foreignField: "_id",
          as: "estimateId",
        },
      },
      {
        $unwind: "$estimateId",
      },
      {
        $lookup: {
          from: "customers",
          localField: "estimateId.customerId",
          foreignField: "_id",
          as: "estimateId.customerId",
        },
      },
      {
        $lookup: {
          from: "customervehicals",
          localField: "estimateId.vehicalId",
          foreignField: "_id",
          as: "estimateId.vehicalId",
        },
      },
      {
        $match: {
          "estimateId.shopId": new ObjectId(shopId),
          created_at: { $gte: cutoffDate, $lt: startDate },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      msg: "Repair order Insurance Found !!!",
      data: repairOrderFound,
    });
  } catch (error) {
    console.error("repairOrderDaysController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

const repairOrderAllFilterController = async (req, res) => {
  try {
    const { shopId, limit } = req.params;
    const { estimatro, insuranceSearch, days } = req.body;
    const shopFound = await shops.findById(shopId);
    if (!shopFound) {
      return res.status(404).json({
        success: false,
        msg: "Shop not Found!!!",
      });
    }

    const filter = {
      "estimateId.shopId": new ObjectId(shopId),
      "estimateId.repairOrder": true,
    };

    if (days) {
      const daysInt = parseInt(days) - 1;
      const startDate = new Date(Date.now() - daysInt * 24 * 60 * 60 * 1000);
      const cutoffDate = new Date(
        startDate.getTime() - 10 * 24 * 60 * 60 * 1000
      );
      filter.created_at = { $gte: cutoffDate, $lt: startDate };
    }

    if (estimatro) {
      filter["estimateId.estimateStaff.EstimatorStaff"] = new ObjectId(
        estimatro
      );
    }

    if (insuranceSearch) {
      filter["insuranceId.InsuranceName"] = {
        $regex: insuranceSearch,
        $options: "i",
      };
    }

    const repairOrderFound = await repairOrders.aggregate([
      {
        $lookup: {
          from: "estimateprofiles",
          localField: "estimateId",
          foreignField: "_id",
          as: "estimateId",
        },
      },
      {
        $unwind: "$estimateId",
      },
      {
        $lookup: {
          from: "customers",
          localField: "estimateId.customerId",
          foreignField: "_id",
          as: "estimateId.customerId",
        },
      },
      {
        $lookup: {
          from: "customervehicals",
          localField: "estimateId.vehicalId",
          foreignField: "_id",
          as: "estimateId.vehicalId",
        },
      },
      {
        $lookup: {
          from: "insurances",
          localField: "estimateId.insuranceId",
          foreignField: "_id",
          as: "insuranceId",
        },
      },
      {
        $match: filter,
      },
      {
        $facet: {
          totalCount: [{ $count: "totalCount" }],
          limitedResults: [{ $limit: parseInt(limit) }],
        },
      },
    ]);

    const totalCount = repairOrderFound[0]?.totalCount[0]?.totalCount;
    const limitedResults = repairOrderFound[0]?.limitedResults;

    res.status(200).json({
      success: true,
      msg: "Estimate Found!!!",
      totalCount: totalCount,
      data: limitedResults,
    });
  } catch (error) {
    console.error("repairOrderAllFilterController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
      data: [],
    });
  }
};

module.exports = {
  repairOrderRegisterController,
  repairOrderRegisterDirectController,
  repairOrderCustomerAndVehicalController,
  getAllRepairOrderController,
  repairOrderSearchController,
  newRepairOrderController,
  repairOrderArchiveController,
  getAllArchivedRepairOrderController,
  searchRepairOrderArchiveConntroller,
  repairOrderFilterController,
  repairOrederInsuarnceController,
  repairOrderDaysController,
  repairOrderAllFilterController,
};
