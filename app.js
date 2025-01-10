const express = require('express');
const mongoose = require('mongoose');
const mainRouter =require("./routes/index")

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log("Connected to DB")
  })
  .catch((err) => console.error('Database connection error:', err));

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '67801f82edff02e74e13a38a'
  };
  next();
});

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});



