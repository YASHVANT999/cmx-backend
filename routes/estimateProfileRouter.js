const express = require("express");

const {
  estimateProfileRegisterController,
  estimateProfileGetAll,
  estimateProfileSearch,
  estimateProfileGetAllInAYear,
  estimateGetCustomerController,
  estimateProfileUpdate,
  estimatePhotoUpload,
  estimateEsignatureController,
  estimateProfileCustomerAndVehicalController,
  estimateArchivedController,
  getAllEstimateArchivedController,
  paymentAmountController,
  estimateEsignatureShopController,
  extraPhotesController,
  extraPhotesUpdatePrimaryController,
  deleteExtraPhotoController,
  getExtraPhotoController,
  updatePhotoController,
  paymentAmountFileController,
  updateOnChangePaymentAmountController,
  splitPaymentEstimateController,
  updateSplitDocumentController,
  fullPaymentEstimateController,
  estimateArchivedSearchController,
  estimatePaymentDocController,
  allPaymentsController,
  estimatePaymentDocUpdateController,
  updateStatusUpdateController,
  estimateStaffController,
  esimateActivityController,
  insuranceSearchController,
  estimateProfileDaysFilterController,
  estimateProfileAllFilterController,
  StatusUpdateAllController,
  estimatePOPController,
  estimateProofOfPaymentController,
  checkEstimateController,
  estimateVehicalDeliveredController,
  estomateFollowUpController,
  permissionEstimateController,
  estimateChatLinkInviteController,
} = require("../controllers/estimateProfileController");
const authToken = require("../middleware/checkAuth");
const multer = require("multer");

const esignatureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/eSignatures/");
  },
  filename: function (req, file, cb) {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const currentTime = new Date()
      .toISOString()
      .slice(11, 19)
      .replace(/:/g, "");
    const newFilename = `${currentDate}_${currentTime}_${file.originalname}`;
    cb(null, newFilename);
  },
});
const esignatureUpload = multer({
  storage: esignatureStorage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
});

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

const storagePayment = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/payment/");
  },
  filename: function (req, file, cb) {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const currentTime = new Date()
      .toISOString()
      .slice(11, 19)
      .replace(/:/g, "");
    const newFilename = `${currentDate}_${currentTime}_${req.params.key}_${file.originalname}`;
    cb(null, newFilename);
  },
});

const uploadPayment = multer({
  storage: storagePayment,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
});

const POPExpressStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/popFiles/");
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
const POPExpressUpload = multer({
  storage: POPExpressStorage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
});

const router = express.Router();

router.post("/register", estimateProfileRegisterController);
router.get("/get/all/:ShopId/:limit", authToken, estimateProfileGetAll);
router.get("/search/:ShopId/:text", authToken, estimateProfileSearch);
router.get(
  "/search/Archive/:ShopId/:text",
  authToken,
  estimateArchivedSearchController
);
router.get(
  "/search/year/:ShopId/:year/:month",
  authToken,
  estimateProfileGetAllInAYear
);
router.get("/get/customer/:token", estimateGetCustomerController);
router.post("/Update", estimateProfileUpdate);
router.post("/photo/Upload", photoExpressUpload.any(), estimatePhotoUpload);
router.post(
  "/esignature",
  esignatureUpload.single("eSignature"),
  estimateEsignatureController
);
router.get(
  "/customer/Vehical/data/:id",
  estimateProfileCustomerAndVehicalController
);
router.get("/Archived/:id", estimateArchivedController);
router.get(
  "/Archived/get/all/:limit/:shopId",
  getAllEstimateArchivedController
);
router.post("/paymentAmount/Update/:estimateId", paymentAmountController);
router.post(
  "/shop/esignature/:staffId",
  esignatureUpload.single("eSignature"),
  estimateEsignatureShopController
);
router.post(
  "/extra/Photes/setPrimary/:estimateId",
  extraPhotesUpdatePrimaryController
);
router.post(
  "/extra/Photes/:estimateId",
  // photoExpressUpload.single("extraPhotes"),
  photoExpressUpload.any(),
  extraPhotesController
);
router.post("/extra/Photes/delete/:estimateId", deleteExtraPhotoController);
router.get("/extra/photes/:estimateId", getExtraPhotoController);
router.post("/extra/photesUpdate/:gallery_id", updatePhotoController);
router.post(
  "/paymentAmount/file/Upload/:estimateId/:key",
  uploadPayment.single("paymentDoc"),
  paymentAmountFileController
);
router.post(
  "/Update/Fields/:estimateId/:key",
  updateOnChangePaymentAmountController
);
router.post(
  "/split/Payment/:estimateId/:key",
  uploadPayment.any(),
  splitPaymentEstimateController
);
router.get(
  "/update/Payment/document/:estimateId/:key/:id",
  uploadPayment.single("updateDoc"),
  updateSplitDocumentController
);
router.post(
  "/full/Payment/:estimateId/:key",
  uploadPayment.single("UploadData"),
  fullPaymentEstimateController
);
router.post("/payment/Document/:estimateId/:key", estimatePaymentDocController);
router.post("/all/Payment/:estimateId/:key", allPaymentsController);
router.post(
  "/payment/Update/Document/:estimateId/:key",
  estimatePaymentDocUpdateController
);
router.get(
  "/status/Updates/:estimateId/:statusId/:status",
  updateStatusUpdateController
);
router.post("/staffs/:estimateId", estimateStaffController);
router.get("/Activity/:estimateId/:staffId", esimateActivityController);
router.get("/search/insurance/:shopId/:text", insuranceSearchController);
router.get("/byDays/:shopId/:days", estimateProfileDaysFilterController);
router.post("/all/Filter/:shopId/:limit", estimateProfileAllFilterController);
router.post("/update/time/line/all/:estimateId", StatusUpdateAllController);
router.post(
  "/upload/POP/:estimateId",
  POPExpressUpload.any(),
  estimatePOPController
);
router.get(
  "/proofOfPayment/:estimateId/:docIds",
  estimateProofOfPaymentController
);
router.get("/check/estimate/:id", checkEstimateController);
router.get(
  "/update/delivered/:mark/:estimateId",
  estimateVehicalDeliveredController
);
router.post("/update/follow/up/:estimateId", estomateFollowUpController);
router.get("/permission/:type/:value/:id", permissionEstimateController);
router.get("/invite/chatlink/:id", estimateChatLinkInviteController);

module.exports = router;
