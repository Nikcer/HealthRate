const HealthCenter = require("../models/healthCenter");

const addHealthCenter = async (req, res) => {
  const {
    nome,
    indirizzo,
    citta,
    provincia,
    regione,
    cap,
    telefono,
    email,
    sitoWeb,
  } = req.body;
  try {
    const healthCenter = await HealthCenter.create({
      nome,
      indirizzo,
      citta,
      provincia,
      regione,
      cap,
      telefono,
      email,
      sitoWeb,
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
      nome,
      indirizzo,
      citta,
      provincia,
      regione,
      cap,
      telefono,
      email,
      sitoWeb,
    } = req.body;
    const healthCenter = await HealthCenter.findByIdAndUpdate(id, {
      nome,
      indirizzo,
      citta,
      provincia,
      regione,
      cap,
      telefono,
      email,
      sitoWeb,
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
  const { nome, citta, provincia, regione } = req.query;

  const searchQuery = {};

  if (nome) {
    searchQuery.nome = new RegExp(nome, "i");
  }

  if (citta) {
    searchQuery.citta = new RegExp(citta, "i");
  }

  if (regione) {
    searchQuery.regione = new RegExp(regione, "i");
  }

  if (provincia) {
    searchQuery.provincia = new RegExp(provincia, "i");
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
