const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://admin:admin@cluster0.ifasc.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority";

const connectDB = (url) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
