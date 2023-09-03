const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLenght: 8,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

//signup static method
userSchema.statics.signup = async function (email, password, username) {
  const emailUser = await this.findOne({ email });

  if (emailUser) {
    throw new Error(" L' Email è già in uso");
  }

  if (email || password || username) {
    throw new Error("I campi sono obbligatori");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email non valida");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password non valida: inserire almeno 8 caratteri con almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale"
    );
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await this.create({
    email,
    password: hash,
    username,
  });

  return user;
};

//login static method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Riempire i campi obbligatori");
  }

  const user = await this.findOne({ email });

  if (!user) throw new Error("Email o password non corretti");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new Error("Password non corretta");

  return user;
};

userSchema.statics.updateUser = async function (email, username) {
  const user = await this.updateOne({ _id: id }, { email, username });

  return user;
};

userSchema.statics.updatePassword = async function (id, password) {
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password non valida: inserire almeno 8 caratteri con almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale"
    );
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await this.updateOne({ _id: id }, { password: hash });

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
