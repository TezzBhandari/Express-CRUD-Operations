const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const route = require('./routes/route');
var mongoose = require('mongoose');
const { request } = require('express');

const app = express();
dotenv.config();
//Set up default mongoose connection
const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mflix.md7qc.mongodb.net/Mongoose?retryWrites=true&w=majority`;

const connectDatabse = async () => {
  try {
    const result = await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('Connected to the database');

    app.listen(12000, () => {
      console.log('Listening For Requests....');
    });
  } catch (e) {
    if (e) console.log(`\n\nError:\n${e}`);
  }
};

connectDatabse();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/dishes', route);

// Error Handling Function
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    stack: error.stack,
    status: error.status,
  });
});
