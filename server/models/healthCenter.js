const mongoose = require("mongoose");

const healthCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  region: {
    type: String,
    required: true,
    trim: true,
  },
  zip_code: {
    type: String,
    trim: true,
  },
  phone_number: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
});

const HealthCenter = mongoose.model("HealthCenter", healthCenterSchema);

module.exports = HealthCenter;
