const User = require("../models/user");
const jwt = require("jsonwebtoken");
const checkAuthorization = require("../middlewares/checkUserAuth");
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
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not find" });
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
  const { id } = req.params;
  const { email } = req.body;

  try {
    const user = await User.updateUser(id, email);
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Update user password

const updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const newPassword = await User.updatePassword(id, password);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete user

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(reqUserId);
    res.status(200).json({ message: "Profile deleted successfully" });
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
