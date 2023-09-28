const Laptop = require("../models/laptopModel");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const storage = new multer.memoryStorage();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join("./public/uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const fileFilter = function (req, file, cb) {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

exports.upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

exports.addLaptop = async (req, res) => {
  try {
    const {
      name,
      brand,
      processor,
      storage,
      size,
      generation,
      core,
      screen,
      price,
      desc,
    } = req.body;

    const images = req.files;

    const cldRes = await Promise.all(
      images.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const cloudinaryRes = await handleUpload(dataURI);
        return cloudinaryRes;
      })
    );

    const mainImage = cldRes[0].secure_url;
    const otherImages = [];
    cldRes.slice(1).map((el) => otherImages.push(el.secure_url));

    // res.json(cldRes);

    const newLaptop = await Laptop.create({
      name,
      brand,
      processor,
      storage,
      size,
      generation,
      core,
      mainImage,
      otherImages,
      screen,
      price,
      desc,
    });

    res.status(201).json({
      status: "success",
      data: newLaptop,
    });
  } catch (error) {
    console.error("an error here", error);
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

exports.getLaptopById = async (req, res) => {
  try {
    const { id } = req.params;
    const laptop = await Laptop.findById({ _id: id });

    res.status(200).json({
      status: "success",
      laptop: laptop,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
