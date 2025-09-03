const express = require("express");
const {
  loginController,
  loginAssistanceController,
  registerController,
  userdetailsController,
  addUserDetailController,
  updateUserController,
  sendOtpController,
  changePasswordController,
  userSmsChangeController,
  getUserOfShopController,
  getShopEstimatorController,
  getAllUserController,
  getAllDeactiveController,
} = require("../controllers/usercontroller");
const {
  validateLogIn,
  validateRegistration,
  validateUserDetails,
  validateAddUserDetail,
} = require("../middleware/validationMiddleWare");
const authToken = require("../middleware/checkAuth");

const router = express.Router();

router.post("/login", validateLogIn, loginController);
router.post("/loginassistance", loginAssistanceController);

router.post("/register", authToken, registerController);
router.post(
  "/userdetail/update",
  validateAddUserDetail,
  authToken,
  addUserDetailController
);
router.get(
  "/userdetail/:id",
  validateUserDetails,
  authToken,
  userdetailsController
);
router.post("/update/data", authToken, updateUserController);
router.get("/password/otp/:email/:userId", authToken, sendOtpController);
router.post("/password/otp/change", authToken, changePasswordController);
router.get("/SMS/password/otp/:phone/:userId", userSmsChangeController);
router.get("/all/users/:shopId", getUserOfShopController);
router.get("/get/estimator/:shopId", getShopEstimatorController);
router.get("/get/all/user/:shopId", getAllUserController);
router.get("/get/all/deactive/:page/:shopId", getAllDeactiveController);

module.exports = router;
