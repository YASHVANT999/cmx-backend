const express = require("express");

const {
  commentRegisterController,
  getAllCommentsOfEstimateConntroller,
  deleteCommentController,
  updateCommentController,
  getSortCommentsController,
} = require("../controllers/customerCommentsController");

const authToken = require("../middleware/checkAuth");

const router = express.Router();

router.post("/register", commentRegisterController);
router.get(
  "/get/estimate/:data/:estimateId",
  getAllCommentsOfEstimateConntroller
);
router.get("/delete/:id", deleteCommentController);
router.post("/update/:commentId", updateCommentController);
router.get(
  "/sort/comment/:data/:sortData/:sortType/:estimateId",
  getSortCommentsController
);

module.exports = router;
