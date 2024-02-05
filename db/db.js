const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://leelasarathbaswa:sarath123@cluster0.n1xchlc.mongodb.net/?retryWrites=true&w=majority"
    );

    console.log("mongodb connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
