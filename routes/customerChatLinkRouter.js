const express = require("express");
const {
  customerChatLinkRegisterController,
  getCustomerChatLinkData,
  updateChatLinkController,
  getTypeEstimateChatLinkController,
} = require("../controllers/customerChatLinkController");
const authToken = require("../middleware/checkAuth");

const router = express.Router();

router.post("/register", authToken, customerChatLinkRegisterController);
router.get("/list/:shopId/", authToken, getCustomerChatLinkData);
router.post("/update", authToken, updateChatLinkController);
router.get("/get/chat/:shopId/:type", getTypeEstimateChatLinkController);

module.exports = router;
