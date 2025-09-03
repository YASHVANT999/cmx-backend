const express = require("express");
const multer = require('multer');

const {
  estimateChatLinkregistreController,
  getestimateChatController,
  getAllChatShopController,
  updateSeenController,
  getAllUnSeenChatController,
  estimateChatLinkDocumentController,
} = require("../controllers/estimateChatLinkController");

const photoExpressStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/photoExpress/");
  },
  filename: function (req, file, cb) {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const currentTime = new Date()
      .toISOString()
      .slice(11, 19)
      .replace(/:/g, "");
    const newFilename = `${currentDate}_${currentTime}_${file.fieldname}_${file.originalname}`;
    cb(null, newFilename);
  },
});
const photoExpressUpload = multer({
  storage: photoExpressStorage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
});

const router = express.Router();

router.post("/register", estimateChatLinkregistreController);
router.get("/getChatLink/:estimateToken", getestimateChatController);
router.get("/get/All/Customer/:shopId", getAllChatShopController);
router.get("/Update/Seen/:estimateToken/:role", updateSeenController);
router.get("/unseen/chat/:shopId", getAllUnSeenChatController);
router.post(
  "/doc/upload/:estimateId",
  photoExpressUpload.any(),
  estimateChatLinkDocumentController
);

module.exports = router;
