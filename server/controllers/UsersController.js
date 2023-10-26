const User = require("../models/user");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
//Create token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Required fields");
  }
  try {
    const user = await User.findOne({ email });

    if (!user) throw new Error("Wrong Email");

    const storePasswordHash = user.password;

    const match = await bcrypt.compare(password, storePasswordHash);

    if (!match) throw new Error("Wrong Password");

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
    const emailUser = await User.findOne({ email });

    if (emailUser) {
      throw new Error("Email already exists");
    }

    if (!email || !password || !username) {
      throw new Error("Required fields");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Wrong Email");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error(
        "Your password needs to have at least 8 characters with at least one uppercase letter, one lowercase letter, one number and one special character."
      );
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hash,
      username,
    });
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
      return res.status(404).json({ message: "User not found" });
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
    const emailUser = await User.findOne({ email: req.body.email });

    if (emailUser) {
      throw new Error("Email already exists");
    }
    const user = await User.updateOne({ _id: id }, { email });

    const updatedUser = await User.findById(id).select("-password");
    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Update user password

const updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    if (!validator.isStrongPassword(password)) {
      throw new Error(
        "Your password needs to have at least 8 characters with at least one uppercase letter, one lowercase letter, one number and one special character."
      );
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.updateOne({ _id: id }, { password: hash });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete user

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
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
