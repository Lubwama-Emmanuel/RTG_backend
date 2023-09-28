const express = require("express");
const router = express.Router();
const laptopController = require("../controllers/laptopController");

router.post(
  "/addLaptop",
  laptopController.upload.single("image"),
  laptopController.addLaptop
);
router.get("/getLaptops", laptopController.getLaptops);
router.get("/getLaptop/:id", laptopController.getLaptopById);

module.exports = router;
