const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Accesso non autorizzato" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.user = user; // Aggiungi l'utente autenticato all'oggetto req per utilizzarlo nelle route successive
    next(); // Prosegui con la richiesta
  } catch (error) {
    res.status(401).json({ error: "Accesso non autorizzato" });
  }
};

/* const jwt = require("jsonwebtoken");
const User = require("../models/user"); */

// auth check middleware

/* const authChecker = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_PHRASE);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = authChecker; */
