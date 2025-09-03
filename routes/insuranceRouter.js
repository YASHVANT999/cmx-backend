const express = require("express");

const {
  insuranceRegisterController,
  insuranceGetController,
  allInsuranceOfShopController,
} = require("../controllers/insuranceController");

const router = express.Router();

router.post("/register", insuranceRegisterController);
router.get("/details/:estimateId", insuranceGetController);
router.get("/all/shop/insurance/:shopId", allInsuranceOfShopController);

module.exports = router;
