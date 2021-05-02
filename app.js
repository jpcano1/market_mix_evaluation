const express = require('express');
const path = require('path');
const passport = require("passport");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// Routes
const usersRouter = require('./routes/users');
const itemRouter = require("./routes/items");
const cartRouter = require("./routes/cart");
const createError = require("http-errors");

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

app.use(passport.initialize({}));

app.use('/users', usersRouter);
app.use("/items", itemRouter);
app.use("/cart", cartRouter);

app.use((req, res, next) => {
    next(createError(404));
})

app.use((err, req, res, _) => {
    res.locals.error = req.app.get("env") === "development"? err: {};

    res.status(err.status || 500);
    res.json({
        "error": err.message
    })
})

module.exports = app;
