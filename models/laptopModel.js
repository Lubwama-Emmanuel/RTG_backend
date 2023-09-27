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
  },
  core: {
    type: String,
  },
  generation: {
    type: String,
  },
  storage: {
    type: String,
  },
  size: {
    type: String,
  },
});

module.exports = mongoose.model("Laptop", laptopSchema);
