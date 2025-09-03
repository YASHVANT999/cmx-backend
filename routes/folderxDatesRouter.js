const express = require("express");

const {
  folderxDatesRegisterController,
  getDatesController,
  folderXDateUpdateController,
} = require("../controllers/folderxDatesController");

const router = express.Router();

router.post("/register", folderxDatesRegisterController);
router.get("/get/Dates/:estimateId", getDatesController);
router.post("/update/:datesId", folderXDateUpdateController);

module.exports = router;
