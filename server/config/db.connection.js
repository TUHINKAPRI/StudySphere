const mongoose = require("mongoose");

exports.connectToDb = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connection is successfully");
    })
    .catch((err) => {
      console.log("connection error");
      console.error(err);
    });
};
