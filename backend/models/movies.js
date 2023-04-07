const mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
  isShortlisted: {
    type: Boolean,
  },
  isVisible: {
    type: Boolean,
  },
  label: {
    type: String,
  },
  rating: {
    type: Array,
  }
});
//Export the model
module.exports = mongoose.model("movies", movieSchema);
