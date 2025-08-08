const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DATABASE_CONNECTION_STRING;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.log("❌ MongoDB connection error:", err);
  }
};

module.exports = connectDB;
