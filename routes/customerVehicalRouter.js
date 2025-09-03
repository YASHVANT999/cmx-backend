const express = require("express");
const {
  customerVehicalRegesterController,
  customerVehicalController,
  customerVehicalDetailController,
  customerVehicalUpdateController,
  customerShopVehicalController,
  pointOfImpactController,
  removeCustomerVehicalController,
  bulkRemoveCustomerVehiclesController,
} = require("../controllers/customerVehicalController");
const authToken = require("../middleware/checkAuth");
const {
  customerVehicalRegistrationValidation,
  customerVehicalValidation,
  customerVehicalDetailValidation,
} = require("../middleware/validationMiddleWare");

const router = express.Router();

router.post(
  "/register",
  authToken,
  customerVehicalRegistrationValidation,
  customerVehicalRegesterController
);
router.get(
  "/cutomer/vehicals/:customerId",
  authToken,
  customerVehicalValidation,
  customerVehicalController
);
router.get(
  "/cutomer/vehicals/details/:id",
  authToken,
  customerVehicalDetailValidation,
  customerVehicalDetailController
);
router.post("/update/details", customerVehicalUpdateController);
router.get("/get/all/:ShopId", customerShopVehicalController);
router.get("/point/of/impact/:vehicalId/:point", pointOfImpactController);

router.delete('/vehicle/:customerId/:vehicleId', removeCustomerVehicalController)
router.delete('/bulk/:customerId', bulkRemoveCustomerVehiclesController)

module.exports = router;
