require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { errorLogger } = require('express-winston');
const mainRouter = require("./routes/index");
const errorHandler = require('./middlewares/error-handler');
const { requestLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/ratelimiter');





const app = express();
const { PORT = 3001 } = process.env;


mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log("Connected to DB")
  })
  .catch((err) => console.error('Database connection error:', err));

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use("/", mainRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});



