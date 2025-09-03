const express = require("express");

const {
  registerEstimateStageController,
  getEstimateStageController,
  updateEstimateStageController,
  filterStageController,
  findTextEstimatStageController,
} = require("../controllers/estimateStageController");

const router = express.Router();

router.post("/register/:estimateId", registerEstimateStageController);
router.get("/get/stages/:estimateId", getEstimateStageController);
router.post(
  "/update/stage/:estimateId/:stageId",
  updateEstimateStageController
);
router.get(
  "/filter/stages/:estimateId/:PartType/:Operation/:LaborType/:EstimateStage",
  filterStageController
);
router.get(
  "/filter/stages/text/:estimateId/:text",
  findTextEstimatStageController
);

module.exports = router;
