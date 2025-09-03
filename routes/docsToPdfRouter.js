const express = require("express");
const multer = require("multer");

const {
  documentPdfConverterContoller,
} = require("../controllers/documentPdfConverterContoller");

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

router.get("/convert_doc_to_pdf", documentPdfConverterContoller);

module.exports = router;
