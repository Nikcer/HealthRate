const mongoose = require("mongoose");

require("dotenv").config();

const dbUrl = process.env.DB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Database: connection error.", error);
  }
};

module.exports = connectDB;
