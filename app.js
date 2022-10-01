require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors=require('cors')

//import routes like this
 const userRoutes = require("./api/routes/user");

//connecting with database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


//use routes like this to handle requests
app.use("/users", userRoutes);



//error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
    
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;