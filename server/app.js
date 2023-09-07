const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const cors = require("cors");
const usersRoute = require("./routes/usersRoutes");

require("dotenv").config();

// REGISTER HTTP MIDDLEWARE
app.use(morgan("dev"));

//SECURITY MIDDLEWERES
app.use(helmet());

// SANITAZE FILTER
mongoose.set("sanitizeFilter", true);

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//ROUTES

app.use("/api/users", usersRoute);

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Benvenuti" });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Risorsa non trovata" });
});

module.exports = app;
