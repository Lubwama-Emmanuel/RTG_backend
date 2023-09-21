const Laptop = require("../models/laptopModel");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");

// const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join("./public/uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    // Check if its an image before saving to photos bucket
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "images",
        filename: `${Date.now()}_${file.originalname}`,
      };
    } else {
      // otherwise save to the default bucket
      return `${Date.now()}_${file.originalname}`;
    }
  },
});

exports.upload = multer({ storage });

exports.addLaptop = async (req, res) => {
  try {
    const imageBuffer = req.file;
    const { name } = req.body;

    // const newLaptop = await Laptop.create({ image: imageBuffer, name: name });

    res.status(201).json({
      status: "success",
      // data: newLaptop,
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
        laptops,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
