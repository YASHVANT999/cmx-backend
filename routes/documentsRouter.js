const express = require("express");
const multer = require("multer");

const {
  documentRegisterContoller,
  documentUpdateController,
  documentUserDataController,
  documentEstimateController,
  documentDeleteController,
  documentUpdateEstimateAllController,
  documentSortController,
} = require("../controllers/documentController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/documents/");
  },
  filename: function (req, file, cb) {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const currentTime = new Date()
      .toISOString()
      .slice(11, 19)
      .replace(/:/g, "");
    const newFilename = `${currentDate}_${currentTime}${file.originalname}`;
    cb(null, newFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
});

const router = express.Router();

router.post(
  "/register/:estimateId/:staffId",
  upload.any(),
  (err, req, res, next) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        res.status(413).send("File size exceeds 100 MB limit");
      } else {
        res.status(500).send("Error uploading file");
      }
    } else {
      next();
    }
  },
  documentRegisterContoller
);
router.post("/update", upload.single("documentFile"), documentUpdateController);
router.get("/user/data/:id", documentUserDataController);
router.get("/doc/estimate/:estimateId", documentEstimateController);
router.get("/doc/delete/:estimateId/:DocIDs", documentDeleteController);
router.post("/doc/update/:estimateId", documentUpdateEstimateAllController);
router.get("/sort/:estimateId/:type", documentSortController);

module.exports = router;
