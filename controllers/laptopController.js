const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const dotenv = require("dotenv");
const pool = require("../utils/db");

dotenv.config({ path: "./config.env" });

const storage = new multer.memoryStorage();

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
    description,
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

  console.log(cldRes);

  const mainImage = cldRes[0].secure_url;
  const otherImages = [];
  cldRes.slice(1).map((el) => otherImages.push(el.secure_url));

  // res.json(cldRes);

  pool.query(
    "INSERT INTO laptops ( name, brand, processor, storage, size, generation, core, main_image, other_images, screen, price, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
    [
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
      description,
    ],
    (error, results) => {
      if (error) {
        console.error("an error here", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("HERE ARE THE RESULTS", results);
        res.status(201).json({
          status: "success",
        });
      }
    }
  );
};

exports.getLaptops = async (req, res) => {
  pool.query("SELECT * FROM laptops", (error, results) => {
    if (error) {
      console.log("AN ERROR OCCURED", error);
      res.status(500).json({ error: "Internal server error" });
    }
    console.log("HERE ARE THE RESULTS", results);
    res.status(200).json({
      status: "success",
      data: results.rows,
    });
  });
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
