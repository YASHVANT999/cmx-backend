const express = require("express");

const {
  addDefaultShopCommentController,
  getDefaultShopCommentController,
  updateDefaultShopCommentController,
  getCategoryCommentsController,
} = require("../controllers/defaultShopCommentsController");

const router = express.Router();

router.post("/add/default/comment/:shopId", addDefaultShopCommentController);
router.get("/get/all/commensts/:shopId", getDefaultShopCommentController);
router.post(
  "/update/comment/:shopId/:commentId",
  updateDefaultShopCommentController
);
router.get("/get/special/:shopId/:category", getCategoryCommentsController);

module.exports = router;
