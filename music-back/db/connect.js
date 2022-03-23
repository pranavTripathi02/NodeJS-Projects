const mongoose = require('mongoose');

const connectDB = (url) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log('DB connected...');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
