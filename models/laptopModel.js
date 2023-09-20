const mongoose = require("mongoose");

const laptopSchema = mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Laptop", laptopSchema);
