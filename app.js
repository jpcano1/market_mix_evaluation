const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// Routes
const usersRouter = require('./routes/users');
const itemRouter = require("./routes/items");
const cartRouter = require("./routes/cart");

// Configurations
const config = require("./config");
const mongoose = require("mongoose");

// MongoDB connection
const mongoUrl = config.mongoUrl;
const connection = mongoose.connect(mongoUrl);
connection.then((_) => {
    console.log("Connected correctly to the server")
}, (err) => {
    console.log(err);
})

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use("/items", itemRouter);
app.use("/cart", cartRouter);

module.exports = app;
