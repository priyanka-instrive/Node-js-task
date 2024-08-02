const express = require("express");
const router = express.Router();
const { upload } = require("../../system/uploadImage/upload.js");

const controller = require("./controller.js");

router.post(
  "/create_template_bank",
  upload.array("files", 10),
  controller.createTemplateBank
);

module.exports = router;
