const estimateStages = require("../models/estimateStageModel");
const estimates = require("../models/estimateProfileModel");
const mongoose = require("mongoose");

const registerEstimateStageController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const {
      //   EstimateTotal,
      //   Totalhours,
      //   DaystoRepair,
      EstimateStage,
      LineNotes,
      Operation,
      PartType,
      LaborType,
      EstimateDescription,
      PartNumber,
      Quantaty,
      MarkupDiscounts,
      EstimateAmount,
      BodyLabor,
      RefinishLabor,
      Adjustment,
      LaborTax,
      PartsTax,
      PaintSupplies,
    } = req.body;
    const estimateFound = await estimates.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Found !!!",
      });
    }
    const findStage = await estimateStages.findOne({ estimateId });
    if (!findStage) {
      await estimateStages.create({
        estimateId,
        EstimateTotal: parseFloat(EstimateAmount).toFixed(2),
        Totalhours: parseFloat(BodyLabor).toFixed(2),
        // DaystoRepair,
        estimateStages: {
          EstimateStage,
          LineNotes,
          Operation,
          PartType,
          LaborType,
          EstimateDescription,
          PartNumber,
          Quantaty,
          MarkupDiscounts,
          EstimateAmount,
          BodyLabor,
          RefinishLabor,
          Adjustment,
          LaborTax,
          PartsTax,
          PaintSupplies,
        },
      });
    } else {
      findStage.EstimateTotal = (
        parseFloat(findStage.EstimateTotal) + parseFloat(EstimateAmount)
      ).toFixed(2);
      findStage.Totalhours = (
        parseFloat(findStage.Totalhours) + parseFloat(BodyLabor)
      ).toFixed(2);
      findStage.estimateStages.push({
        EstimateStage,
        LineNotes,
        Operation,
        PartType,
        LaborType,
        EstimateDescription,
        PartNumber,
        Quantaty,
        MarkupDiscounts,
        EstimateAmount,
        BodyLabor,
        RefinishLabor,
        Adjustment,
        LaborTax,
        PartsTax,
        PaintSupplies,
      });
      await findStage.save();
    }
    res.status(200).json({
      success: true,
      msg: "Estimate Stage has been Updated!!!",
    });
  } catch (error) {
    console.log("registerEstimateStageController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred!!!",
    });
  }
};

const getEstimateStageController = async (req, res) => {
  try {
    const { estimateId } = req.params;
    const estimateFound = await estimates.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const stageFound = await estimateStages.findOne({ estimateId });
    if (!stageFound) {
      return res.status(404).json({
        success: false,
        msg: "NO Stage Found For Estimate !!!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Estimate Stage Found !!!",
      data: stageFound,
    });
  } catch (error) {
    console.log("getEstimateStageController", error);
    res.status(500).json({
      success: false,
      err: error,
      msg: "Some error occurred!!!",
    });
  }
};

const updateEstimateStageController = async (req, res) => {
  try {
    const { estimateId, stageId } = req.params;
    const {
      EstimateStage,
      LineNotes,
      Operation,
      PartType,
      LaborType,
      EstimateDescription,
      PartNumber,
      Quantaty,
      MarkupDiscounts,
      EstimateAmount,
      BodyLabor,
      RefinishLabor,
      Adjustment,
      LaborTax,
      PartsTax,
      PaintSupplies,
    } = req.body;

    const estimateFound = await estimates.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found!!!",
      });
    }

    const stageFound = await estimateStages.findOne({ estimateId });
    if (!stageFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Stage Not Found!!!",
      });
    }

    const findStage = stageFound.estimateStages.find((item) =>
      item._id.equals(stageId)
    );
    if (!findStage) {
      return res.status(404).json({
        success: false,
        msg: "Stage Not Found!!!",
      });
    }

    stageFound.EstimateTotal = (
      parseFloat(stageFound.EstimateTotal) -
      parseFloat(findStage.EstimateAmount) +
      parseFloat(EstimateAmount)
    ).toFixed(2);
    stageFound.Totalhours = (
      parseFloat(stageFound.Totalhours) -
      parseFloat(findStage.BodyLabor) +
      parseFloat(BodyLabor)
    ).toFixed(2);

    Object.assign(findStage, {
      EstimateStage,
      LineNotes,
      Operation,
      PartType,
      LaborType,
      EstimateDescription,
      PartNumber,
      Quantaty,
      MarkupDiscounts,
      EstimateAmount,
      BodyLabor,
      RefinishLabor,
      Adjustment,
      LaborTax,
      PartsTax,
      PaintSupplies,
    });

    await stageFound.save();

    res.status(200).json({
      success: true,
      msg: "Stage has been Updated!!!",
    });
  } catch (error) {
    console.log("updateEstimateStageController", error);
    res.status(500).json({
      success: false,
      err: error.message,
      msg: "Some error occurred!!!",
    });
  }
};

const filterStageController = async (req, res) => {
  try {
    const {
      estimateId,
      PartType,
      Operation,
      LaborType,
      EstimateStage,
    } = req.params;
    const findEstimate = await estimates.findById(estimateId);
    if (!findEstimate) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const findStage = await estimateStages.aggregate([
      {
        $match: {
          estimateId: new mongoose.Types.ObjectId(estimateId),
        },
      },
      {
        $unwind: "$estimateStages",
      },
      {
        $match: {
          "estimateStages.PartType": PartType,
          "estimateStages.Operation": Operation,
          "estimateStages.LaborType": LaborType,
          "estimateStages.EstimateStage": EstimateStage,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      msg: "Filter Stages!!!",
      data: findStage,
    });
  } catch (error) {
    console.log("filterStageController", error);
    res.status(500).json({
      success: false,
      err: error.message,
      msg: "Some error occurred!!!",
    });
  }
};

const findTextEstimatStageController = async (req, res) => {
  try {
    const { estimateId, text } = req.params;
    const estimateFound = await estimates.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const findStages = await estimateStages.aggregate([
      {
        $match: {
          estimateId: new mongoose.Types.ObjectId(estimateId),
        },
      },
      {
        $unwind: "$estimateStages",
      },
      {
        $match: {
          "estimateStages.LineNotes": { $regex: text, $options: "i" },
          "estimateStages.EstimateDescription": { $regex: text, $options: "i" },
          "estimateStages.PartNumber": { $regex: text, $options: "i" },
          "estimateStages.Quantaty": { $regex: text, $options: "i" },
          "estimateStages.MarkupDiscounts": { $regex: text, $options: "i" },
          "estimateStages.RefinishLabor": { $regex: text, $options: "i" },
          "estimateStages.Adjustment": { $regex: text, $options: "i" },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      msg: "Found Stages!!!",
      data: findStages,
    });
  } catch (error) {
    console.log("findTextEstimatStageController", error);
    res.status(500).json({
      success: false,
      err: error.message,
      msg: "Some error occurred!!!",
    });
  }
};

const updateAllEstimateStages = async (req, res) => {
  try {
    const { estimateId, stageId } = req.params;
    const stages = req.body;
    const estimateFound = await estimates.findById(estimateId);
    if (!estimateFound) {
      return res.status(404).json({
        success: false,
        msg: "Estimate Not Found !!!",
      });
    }
    const findStages = await estimateStages.findById(stageId);
    if (!findStages) {
      return res.status(404).json({
        success: false,
        msg: "Stages Not Found !!!",
      });
    }
    let estimateTot = 0;
    let TotalHor = 0;/////////
  } catch (error) {
    console.log("updateAllEstimateStages", error);
    res.status(500).json({
      success: false,
      err: error.message,
      msg: "Some error occurred!!!",
    });
  }
};

module.exports = {
  registerEstimateStageController,
  getEstimateStageController,
  updateEstimateStageController,
  filterStageController,
  findTextEstimatStageController,
  updateAllEstimateStages,
};
