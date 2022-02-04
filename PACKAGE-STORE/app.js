require("dotenv").config();
require("express-async-errors");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const productRouter = require("./routes/products");

//middlewares
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href='/api/v1/products'>products route</a>`);
});

app.use("/api/v1/products", productRouter);

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, console.log(`Server listening on port ${port}...`));
    await connectDB(process.env.MONGO_URI)
      .then(() => console.log("DB Connected..."))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

start();
