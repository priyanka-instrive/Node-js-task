const express = require("express");
const router = express.Router();

const { upload } = require("../../system/uploadImage/upload.js");

const controller = require("./controller.js");

router.post(
  "/create_basicinfo",
  upload.single("user_image"),
  controller.create
);
router.put("/update_password", controller.updatePassword);

router.post("/signin", controller.signin);

router.post("/forgot_password", controller.forgotPassword);

router.post("/change_password", controller.changePassword);

router.post("/get_token", controller.getRefreshToken);

module.exports = router;
