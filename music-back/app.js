//env variables
require('dotenv').config();
require('express-async-errors');
//express
const express = require('express');
const app = express();
app.use(express.json());

// const authoriseMiddleware = require('./middleware/authorisationMiddleware');
// const { authoriseUser } = require('./middleware/Authorization');

// const helmet = require('helmet');
// const cors = require('cors');
// const xss = require('xss-clean');
// const fileUpload = require('express-fileupload');
// const rateLimiter = require('express-rate-limit');
// const mongoSanitize = require('express-mongo-sanitize');

// app.use(helmet());
// app.use(cors());
// app.use(xss());
// app.use(fileUpload());
// app.use(mongoSanitize());

// app.set('trust proxy', 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 60,
//   })
// );

//cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.JWT_SECRET));

//routes
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const songsRouter = require('./routes/songs');

app.use('/api/v1/auth/', authRouter);
app.use('/api/v1/user/', userRouter);
app.use('/api/v1/songs/', songsRouter);

//middlewares
const ErrorHandlerMiddleware = require('./middleware/ErrorHandler');
const NotFoundMiddleware = require('./middleware/NotFound');

app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

//start
const connectDB = require('./db/connect');

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
    connectDB(process.env.MONGO_URI);
  } catch (err) {
    console.log(err);
  }
};
start();
