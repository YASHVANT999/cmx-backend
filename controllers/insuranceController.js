const insurances = require("../models/insuranceModel");
const estimates = require("../models/estimateProfileModel");
const shops = require("../models/shopModel");
const users = require("../models/userModel");
const ObjectId = require("mongodb").ObjectId;

const insuranceRegisterController = async (req, res) => {
  try {
    const {
      estimateId,
      staffId,
      policy,
      claim,
      dateOfLoss,
      deductible,
      lossType,
      InsuredOrClaimant,
      InsuranceName,
      phone1,
      phone2,
      email,
      AdjusterName,
      InsuranceAddress,
      City,
      State,
      ZipCode,
      Country,
      Company,
      companyPhone1,
      companyPhone2,
      companyEmail,
      companyAppraiserName,
    } = req.body;
    let estimateFound = await insurances.findOneAndUpdate(
      { estimateId },
      {
        policy,
        claim,
        dateOfLoss,
        deductible,
        lossType,
        InsuredOrClaimant,
        InsuranceName,
        phone1,
        phone2,
        email,
        AdjusterName,
        InsuranceAddress,
        City,
        State,
        ZipCode,
        Country,
        Company,
        companyPhone1,
        companyPhone2,
        companyEmail,
        companyAppraiserName,
      },
      { new: true }
    );
    if (!estimateFound) {
      const userFound = await users.findById(staffId);
      if (!userFound) {
        return res.status(404).json({
          success: false,
          msg: "Staff Not Found !",
        });
      }
      estimateFound = await insurances.create({
        estimateId,
        staffId,
        policy,
        claim,
        dateOfLoss,
        deductible,
        lossType,
        InsuredOrClaimant,
        InsuranceName,
        phone1,
        phone2,
        email,
        AdjusterName,
        InsuranceAddress,
        City,
        State,
        ZipCode,
        Country,
        Company,
        companyPhone1,
        companyPhone2,
        companyEmail,
        companyAppraiserName,
      });
    }
    const foundEstimate = await estimates.findById(estimateId);
    if (!foundEstimate) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found  !!!",
      });
    }
    foundEstimate.insuranceId = estimateFound._id;
    foundEstimate.save();
    res.status(200).json({
      success: true,
      msg: "Insurance Has been Updated !",
      data: estimateFound,
    });
  } catch (error) {
    console.log("insuranceRegisterController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const insuranceGetController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const estimateFound = await estimates.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !",
      });
    }
    const InsuranceData = await insurances.find({ estimateId });
    if (InsuranceData.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "Your Isnurance Data !",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Your Isnurance Data !",
      data: InsuranceData,
    });
  } catch (error) {
    console.log("insuranceGetController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

const allInsuranceOfShopController = async (req, res) => {
  try {
    const { shopId } = req.params;
    const shopFound = await shops.findById(shopId);
    if (!shopFound) {
      return res.status(404).json({
        success: false,
        msg: "Shop Not Found !!!",
      });
    }
    const allInsurance = await insurances.aggregate([
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
          "Estimate.shopId": new ObjectId(shopId),
        },
      },
    ]);
    if (allInsurance.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "Shop Insurances !!!",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      msg: "Shop Insurances !!!",
      data: allInsurance,
    });
  } catch (error) {
    console.log("allInsuranceOfShopController", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: error,
      data: [],
    });
  }
};

module.exports = {
  insuranceRegisterController,
  insuranceGetController,
  allInsuranceOfShopController,
};
