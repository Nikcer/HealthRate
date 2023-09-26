const mongoose = require("mongoose");

const healthCenterSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  indirizzo: {
    type: String,
    required: true,
    trim: true,
  },
  citta: {
    type: String,
    required: true,
    trim: true,
  },
  provincia: {
    type: String,
    required: true,
    trim: true,
  },
  regione: {
    type: String,
    required: true,
    trim: true,
  },
  cap: {
    type: String,
    trim: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  sitoWeb: {
    type: String,
    trim: true,
  },
  rating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rating",
  },
});

const HealthCenter = mongoose.model("HealthCenter", healthCenterSchema);

module.exports = HealthCenter;
