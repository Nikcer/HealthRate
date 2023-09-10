const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  healthCenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HealthCenter",
    required: true,
  },
  test: {
    type: String,
    required: true,
  },
  interval: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
