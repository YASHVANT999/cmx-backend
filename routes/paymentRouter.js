const express = require("express");
const multer = require("multer");

const {
  paymentRegisterController,
  getPaymentController,
} = require("../controllers/paymentController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/payment/");
  },
  filename: function (req, file, cb) {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const currentTime = new Date()
      .toISOString()
      .slice(11, 19)
      .replace(/:/g, "");
    const newFilename = `${currentDate}_${currentTime}${file.originalname}`;
    cb(null, newFilename);
  },
});

const upload = multer({
   storage: storage,
   limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit 
  });

const router = express.Router();

router.post(
  "/register",
  upload.single("paymentDoc"),
  paymentRegisterController
);
router.get("/get/all/:estimateId", getPaymentController);

module.exports = router;
