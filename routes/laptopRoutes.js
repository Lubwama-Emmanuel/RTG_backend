const express = require("express");
const router = express.Router();
const laptopController = require("../controllers/laptopController");

router.post(
  "/addLaptop",
  laptopController.upload.single("image"),
  laptopController.addLaptop
);

module.exports = router;
