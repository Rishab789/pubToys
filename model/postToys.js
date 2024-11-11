const mongoose = require("mongoose");

const toysShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = mongoose.model("Post", toysShema);
