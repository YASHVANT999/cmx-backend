const express = require("express");
const {
  repairOrderProductionController,
  getRepairOrderProductionController,
} = require("../controllers/repairOrderProductionController");

const router = express.Router();

router.post("/register/:estimateId", repairOrderProductionController);
router.get("/get/:estimateId", getRepairOrderProductionController);

module.exports = router;
