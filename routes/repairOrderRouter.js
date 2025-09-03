const express = require("express");

const {
  repairOrderRegisterController,
  repairOrderRegisterDirectController,
  repairOrderCustomerAndVehicalController,
  getAllRepairOrderController,
  repairOrderSearchController,
  newRepairOrderController,
  repairOrderArchiveController,
  getAllArchivedRepairOrderController,
  searchRepairOrderArchiveConntroller,
  repairOrderFilterController,
  repairOrederInsuarnceController,
  repairOrderDaysController,
  repairOrderAllFilterController,
} = require("../controllers/repairOrderController");

const router = express.Router();

router.post("/register", repairOrderRegisterController);
router.post("/register/new/estimate", repairOrderRegisterDirectController);
router.get(
  "/estimate/customer/Vehical/data/:id",
  repairOrderCustomerAndVehicalController
);
router.get("/get/all/:ShopId/:limit", getAllRepairOrderController);
router.get("/search/:ShopId/:text", repairOrderSearchController);
router.get("/New/Repair/Oreder/:estimateId", newRepairOrderController);
router.get("/Archived/:repairId", repairOrderArchiveController);
router.get(
  "/get/all/Archived/:limit/:ShopId",
  getAllArchivedRepairOrderController
);
router.get(
  "/get/search/Archived/:ShopId/:text",
  searchRepairOrderArchiveConntroller
);
router.get(
  "/get/filter/:shopId/:Estimator/:Months/:Year",
  repairOrderFilterController
);
router.get("/get/Insurance/:shopId/:text", repairOrederInsuarnceController);
router.get("/get/days/repair/:shopId/:days", repairOrderDaysController);
router.post("/all/Filter/:shopId/:limit", repairOrderAllFilterController);

module.exports = router;
