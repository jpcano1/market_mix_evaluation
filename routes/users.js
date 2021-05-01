const express = require('express');
const router = express.Router();
const User = require("../models/users");
const bodyParser = require("body-parser");
const resp = require("../utils/responses");

router.use(bodyParser.json());

/* GET users listing. */
router.route("/")
    .get(function(req, res, next) {
        User.find({})
            .then((users) => {
                let response = resp.responseWith({
                    response: resp.SUCCESS_200,
                    value: users,
                });
                res.statusCode = response[1];
                res.headers = response[2];
                res.json(response[0]);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        User.create(req.body)
            .then((createdUser) => {
                let response = resp.responseWith({
                    response: resp.SUCCESS_200,
                    value: createdUser
                });
                res.statusCode = response[1];
                res.headers = response[2];
                res.json(response[0]);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, _) => {
        let response = resp.responseWith({
            response: resp.FORBIDDEN_403,
            error: "PUT operation not supported on /users"
        });
        res.statusCode = response[1];
        res.headers = response[2];
        res.json(response[0]);
    })

router.route("/:userId")
    .get((req, res, _) => {
        User.findById(req.params.userId)
            .populate("cart")
            .then((user) => {
                let response = resp.responseWith({
                    response: resp.SUCCESS_200,
                    value: user
                });
                res.statusCode = response[1];
                res.headers = response[2];
                res.json(response[0]);
            })
    })
    .post((req, res, _) => {
        let response = resp.responseWith({
            response: resp.FORBIDDEN_403,
            error: "PUT operation not supported on /users/" + req.params.userId
        });
        res.statusCode = response[1];
        res.headers = response[2];
        res.json(response[0]);
    })
    .put((req, res, next) => {
        User.findByIdAndUpdate(req.params.userId, {
            $set: req.body
        }, {
            new: true
        })
            .then((updatedUser) => {
                let response = resp.responseWith({
                    response: resp.SUCCESS_200,
                    value: updatedUser
                });
                res.statusCode = response[1];
                res.headers = response[2];
                res.json(response[0]);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        User.findByIdAndDelete(req.params.userId)
            .then((result) => {
                let response = resp.responseWith({
                    response: resp.SUCCESS_204,
                    value: result
                });
                res.statusCode = response[1];
                res.headers = response[2];
                res.json(response[0]);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

module.exports = router;
