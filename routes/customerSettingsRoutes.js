const express = require("express");
const {
  customerSettingsRegesterController,
  getCustomerSettingsController,
} = require("../controllers/customerSettingsController");
const authToken = require("../middleware/checkAuth");

const router = express.Router();

router.post("/regester", authToken, customerSettingsRegesterController);
router.get("/detalis/:shopId", authToken, getCustomerSettingsController);

module.exports = router;
