const mongoose = require("mongoose");

const laptopSchema = mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  brand: {
    type: String,
  },
  productLine: {
    type: String,
  },
  model: {
    type: String,
  },
  processor: {
    type: String,
    enum: ["intel", "amd"],
  },
  core: {
    type: String,
  },
  generation: {
    type: String,
  },
  storage: {
    type: String,
    enum: ["ssd", "hdd"],
  },
  size: {
    type: String,
  },
});

module.exports = mongoose.model("Laptop", laptopSchema);
