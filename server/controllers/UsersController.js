const User = require("../models/user");
const jwt = require("jsonwebtoken");

//Create token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    const id = user._id;

    const token = createToken(id);

    res.status(200).json({ email, id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(password);
  }
};

//Signup

const signupUser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.signup(email, password, username);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get user profile

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get all users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Update user profile

const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username } = req.body;
    const user = await User.updateUser(id, email, username);
    res.status(200).json({ message: "Profilo aggiornato correttamente", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Update user password

const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const newPassword = await User.updatePassword(id, password);
    res.status(200).json({ message: "Password aggiornata correttamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete user

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Utente eliminato correttamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  deleteUser,
  getAllUsers,
};
