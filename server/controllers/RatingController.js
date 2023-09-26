const Rating = require("../models/rating");
const HealthCenter = require("../models/healthCenter");
const User = require("../models/user");

const addRating = async (req, res) => {
  const { user, healthCenter, test, interval, comment } = req.body;
  try {
    const rating = await Rating.create({
      user,
      healthCenter,
      test,
      interval,
      comment,
    });
    res.status(200).json(rating);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getRatingsByHealthCenter = async (req, res) => {
  const { id } = req.params;
  try {
    const healthCenter = await HealthCenter.findById(id);

    if (!healthCenter) {
      return res.status(404).json({ message: "Health Center non trovato" });
    }
    const ratings = await Rating.find({ healthCenter: id });
    res.status(200).json({ healthCenter, ratings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRatingsByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "Utente non trovato" });
    }
    const ratings = await Rating.find({ user: id }).populate({
      path: "healthCenter",
      select: "nome",
    });
    res.status(200).json({ user, ratings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRating = async (req, res) => {
  const { id } = req.params;
  try {
    const rating = await Rating.findByIdAndDelete(id);
    res.status(200).json({ message: "Rating eliminato correttamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addRating,
  getRatingsByHealthCenter,
  getRatingsByUser,
  deleteRating,
};
