const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
});

const usermodel = mongoose.model("User", Userschema);

module.exports = usermodel;
