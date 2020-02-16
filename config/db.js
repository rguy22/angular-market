const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.get("MongoURI"), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("OK");
  } catch (e) {
    console.error(e.message);
  }
};
module.exports = connectDB;
