const mongoose = require("mongoose");

const connect_DB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connect_DB;
