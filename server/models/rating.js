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
  healthCenterName: {
    type: String,
  },
  test: {
    type: String,
    required: true,
  },
  interval: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  inputDate: { type: Date, default: Date.now },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
