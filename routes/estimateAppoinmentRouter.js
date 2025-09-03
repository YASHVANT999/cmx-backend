const express = require("express");

const {
  estimateAppoinmentRegisterController,
  getEstimateAppoinmentOfShopController,
  deleteEstimateAppoinmentController,
  getEstimateAppoinmentController,
  updateEstimateAppoinmentController,
} = require("../controllers/estimateAppoinmentController");

const router = express.Router();

router.post("/register/:shopId", estimateAppoinmentRegisterController);
router.get("/get/shop/:shopId", getEstimateAppoinmentOfShopController);
router.get("/delete/:Id", deleteEstimateAppoinmentController);
router.get("/get/Appoinment/:Id", getEstimateAppoinmentController);
router.post("/update/:Id", updateEstimateAppoinmentController);

module.exports = router;
