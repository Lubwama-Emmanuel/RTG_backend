const multer = require("multer");
const Laptop = require("../models/laptopModel");

const storage = multer.memoryStorage();
exports.upload = multer({ storage });

exports.addLaptop = async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const { name } = req.body;

    const newLaptop = await Laptop.create({ image: imageBuffer, name: name });

    res.status(201).json({
      status: "success",
      data: newLaptop,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
