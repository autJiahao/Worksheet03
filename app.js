// app.js
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const bodyParser = require("body-parser");
require("dotenv").config();

// routes
const books = require('./routes/api/books');

const app = express();

mongoose
  .connect(
    "mongodb+srv://tss4432:Gjh_5922522@cluster0.gs4rx.mongodb.net/Worksheet03?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));


// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8082;

const path = require("path");
// Step 1:
app.use(express.static(path.resolve(__dirname, "./mern-app/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./mern-app/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});