const express = require("express");
const {
  shopRatesRegister,
  getShopRatesController,
} = require("../controllers/shopRatesController");
const authToken = require("../middleware/checkAuth");

const router = express.Router();

router.post("/register/:shopId", authToken, shopRatesRegister);
router.get("/getShopRated/:id", authToken, getShopRatesController);

module.exports = router;
