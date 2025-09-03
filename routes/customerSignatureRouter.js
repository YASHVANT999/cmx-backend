const express = require("express");
const {
  updateCustomerSignatureController,
  getSignatureController,
} = require("../controllers/customerSignatureController");
const authToken = require("../middleware/checkAuth");

const router = express.Router();

router.post("/update", authToken, updateCustomerSignatureController);
router.get("/getSignature/:shopId", authToken, getSignatureController);

module.exports = router;
