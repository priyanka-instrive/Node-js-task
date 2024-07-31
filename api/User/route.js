const express = require("express");
const router = express.Router();
const { upload } = require("../../system/uploadImage/upload.js");

const controller = require("./controller.js");
const schema = require("../User/schema.js");

router.post(
  "/upload_excel_file",
  upload.single("file"),
  controller.uploadExcelFile
);

router.get(
  "/get_all_user_data",
  schema.validateUserData,
  controller.fetchUserData
);

module.exports = router;
