const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  email:String,
  title: String,
  author: String,
  year: Number,
  publisher: String,
});

const Papermodel = mongoose.model("Paper", paperSchema);

module.exports = Papermodel;
