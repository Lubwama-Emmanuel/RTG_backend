const Laptop = require("../models/laptopModel");
const multer = require("multer");
const path = require("path");

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("./public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.upload = multer({ storage, fileFilter });

exports.addLaptop = async (req, res) => {
  try {
    console.log("REQ BODY", req.body);
    const { name, brand, processor, storage, size, generation, core } =
      req.body;
    const image = req.file.path;

    const newLaptop = await Laptop.create({
      name,
      brand,
      processor,
      storage,
      size,
      generation,
      core,
      image,
    });

    res.status(201).json({
      status: "success",
      data: newLaptop,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getLaptops = async (req, res) => {
  try {
    const laptops = await Laptop.find();

    res.status(200).json({
      status: "success",
      data: {
        length: laptops.length,
        laptops,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
