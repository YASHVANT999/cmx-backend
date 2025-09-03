const express = require("express");
const {
  customerLinkController,
  customerIdSearchController,
  customerRegesterController,
  customerGetDetailController,
  customerAddGetDetailController,
  searchCustomerInShopController,
  getAllCustomerOfShopController,
  customerFamilyMenberController,
} = require("../controllers/customercontroller");
const {
  validatecustomerRegester,
  validatecustomerUpdate,
  validatecustomerDetail,
} = require("../middleware/validationMiddleWare");
const authToken = require("../middleware/checkAuth");

const router = express.Router();

router.post("/register", authToken, customerRegesterController);
router.post(
  "/update/detail",
  authToken,
  // validatecustomerUpdate,
  customerAddGetDetailController
);
router.get(
  "/getdetail/:id",
  authToken,
  validatecustomerDetail,
  customerGetDetailController
);
router.get("/:id/:text", authToken, searchCustomerInShopController);
router.post("/link/customer/member", authToken, customerLinkController);
router.get("/shopid/:shopId/:page", authToken, getAllCustomerOfShopController);
router.get(
  "/search/Customers/:customerId",
  authToken,
  customerIdSearchController
);
router.get(
  "/family/member/linked/:id",
  authToken,
  customerFamilyMenberController
);

module.exports = router;
