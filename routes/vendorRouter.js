const express = require("express");

const {
  vendorRegisterController,
  vendorLogInController,
  vendorDetailController,
  vendorLogOut,
  vendorSmsChangeController,
  vendorChangePasswordController,
  vendorUpdateController,
} = require("../controllers/vendorController");

const router = express.Router();

router.post("/register", vendorRegisterController);
router.post("/logIn", vendorLogInController);
router.get("/logOut/:shopId/:userName", vendorLogOut);
router.get("/detail/:vendorId", vendorDetailController);
router.get("/SMS/password/otp/:phone/:userId", vendorSmsChangeController);
router.post("/password/otp/change", vendorChangePasswordController);
router.post("/update", vendorUpdateController);

module.exports = router;
