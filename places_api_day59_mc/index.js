const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const MONGODB_URL= "mongodb://127.0.0.1:27017/places"

//importing routes 
const placesRouter = require('./routes/places');

//importing controllers
const placesController = require('./controllers/placesController');

//middleware setup
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use("/places", placesRouter);
// app.use(express.urlencoded());

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("connected to mongoose"))
    .catch(err => console.log(err));

    app.all(/.*/, (req, res) => {
        res.statusCode = 404;
        res.send("404 - Page not found");
      });
      
      const PORT = 8100;
      app.listen(PORT, () => {
        console.log(`Server is listening at port ${PORT}`);
      });
      
// https://gist.github.com/McLarenCollege/0ebd5a6724e6f2c19226340556949ea0      