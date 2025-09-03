const express = require("express");
const {
  validateShopDetails,
  validategetAllCustomerInShopController,
  validateUpdateShopLogoRoute,
} = require("../middleware/validationMiddleWare");
const {
  shopDetailUpdateController,
  getShopDetailController,
  searchCustomerInShopInShopController,
  getAllCustomerInShopController,
  getAllUsersInShopController,
  createShopController,
  estimateDefaultController,
  repairOrderDefaultController,
  updateShopLogoController,
} = require("../controllers/shopcontroller");
const multer = require("multer");
const authToken = require("../middleware/checkAuth");
const { ovhStorageUpload } = require('../lib/ovh-object-storage');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/shops/");
  },
  filename: function (req, file, cb) {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const currentTime = new Date()
      .toISOString()
      .slice(11, 19)
      .replace(/:/g, "");
    const newFilename = `${currentDate}_${currentTime}${file.originalname.replaceAll(' ', '')}`;
    cb(null, newFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
});

const router = express.Router();

router.post(
  '/updateLogo',
  authToken,
  ovhStorageUpload.single('shopLogo'),
  updateShopLogoController
);

router.post(
  "/shopRegister",
  authToken,
  // upload.single("shopLogo"),
  validateShopDetails,
  shopDetailUpdateController
);
router.get("/getShopRegister/:id", getShopDetailController);
router.get(
  "/searchCustomer/:page/:pageSize/:shopId/:text",
  authToken,
  searchCustomerInShopInShopController
);
router.get(
  "/getAllCustomer/:shopId/:page",
  validategetAllCustomerInShopController,
  authToken,
  getAllCustomerInShopController
);
router.get(
  "/getAllusers/inShop/:shopId/:page",
  validategetAllCustomerInShopController,
  authToken,
  getAllUsersInShopController
);
router.post("/create", authToken, createShopController);
router.post("/default/Estimate/:shopId", estimateDefaultController);
router.post("/default/repair/Order/:shopId", repairOrderDefaultController);

module.exports = router;
