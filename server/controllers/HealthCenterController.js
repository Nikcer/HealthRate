const HealthCenter = require("../models/healthCenter");

const addHealthCenter = async (req, res) => {
  const {
    name,
    address,
    city,
    district,
    region,
    zip_code,
    phone_number,
    email,
    website,
  } = req.body;
  try {
    const healthCenter = await HealthCenter.create({
      name,
      address,
      city,
      district,
      region,
      zip_code,
      phone_number,
      email,
      website,
    });
    res.status(200).json(healthCenter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateHealthCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      address,
      city,
      district,
      region,
      zip_code,
      phone_number,
      email,
      website,
    } = req.body;
    const healthCenter = await HealthCenter.findByIdAndUpdate(id, {
      name,
      address,
      city,
      district,
      region,
      zip_code,
      phone_number,
      email,
      website,
    });
    res.status(200).json(healthCenter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllHealthCenters = async (req, res) => {
  try {
    const healthCenters = await HealthCenter.find();
    res.status(200).json(healthCenters);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getHealtCenterData = async (req, res) => {
  try {
    const { id } = req.params;
    const healthCenter = await HealthCenter.findById(id);
    res.status(200).json(healthCenter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchHealthCenters = async (req, res) => {
  const { name, city, district, region } = req.query;

  const searchQuery = {};

  if (name) {
    searchQuery.name = new RegExp(name, "i");
  }

  if (city) {
    searchQuery.citta = new RegExp(city, "i");
  }

  if (region) {
    searchQuery.regione = new RegExp(region, "i");
  }

  if (district) {
    searchQuery.provincia = new RegExp(district, "i");
  }

  try {
    const healthCenters = await HealthCenter.find(searchQuery);
    res.json(healthCenters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteHealthCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const healthCenter = await HealthCenter.findByIdAndDelete(id);
    res.status(200).json({ message: "Health Center deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addHealthCenter,
  updateHealthCenter,
  getAllHealthCenters,
  getHealtCenterData,
  searchHealthCenters,
  deleteHealthCenter,
};
