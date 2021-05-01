const express = require("express");
const router = express.Router();
const Item = require("../models/items");
const bodyParser = require("body-parser");
const resp = require("../utils/responses");

router.use(bodyParser.json());

router.route("/")
    .get((req, res, next) => {
        Item.find({})
            .then((items) => {
                let response = resp.responseWith({
                    response: resp.SUCCESS_200,
                    value: items
                })
                res.statusCode = response[1];
                res.headers = response[2];
                res.json(response[0]);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        Item.create(req.body)
            .then((createdItem) => {
                let response = resp.responseWith({
                    response: resp.SUCCESS_201,
                    value: createdItem
                })
                res.statusCode = response[1];
                res.headers = response[2];
                res.json(response[0]);
            }, (err) => next(err))
            .catch(next)
    })

router.route("/:itemId")
    .get((req, res, next) => {
        Item.findById(req.params.itemId)
            .then((item) => {
                let response;
                if (item != null) {
                    response = resp.responseWith({
                        response: resp.SUCCESS_200,
                        value: item
                    })
                } else {
                    response = resp.responseWith({
                        response: resp.SERVER_ERROR_404,
                        error: "Item not found"
                    })
                }
                res.statusCode = response[1];
                res.headers = response[2];
                res.json(response[0]);
            }, (err) => next(err))
            .catch(next);
    })
    .put((req, res, next) => {
        Item.findByIdAndUpdate(req.params.itemId, {
            $set: req.body
        }, {
            new: true
        })
            .then((updatedItem) => {
                let response;
                if (updatedItem != null) {
                    response = resp.responseWith({
                        response: resp.SUCCESS_200,
                        value: updatedItem
                    })
                } else {
                    response = resp.responseWith({
                        response: resp.SERVER_ERROR_404,
                        error: "Item not found"
                    })
                }
                res.statusCode = response[1];
                res.headers = response[2];
                res.json(response[0]);
            }, (err) => next(err))
            .catch(next);
    })
    .delete((req, res, next) => {
        Item.findByIdAndDelete(req.params.itemId)
            .then((result) => {
                let response;
                if (result != null) {
                    response = resp.responseWith({
                        response: resp.SUCCESS_204,
                    })
                } else {
                    response = resp.responseWith({
                        response: resp.SERVER_ERROR_404,
                        error: "Item not found"
                    })
                }
                res.statusCode = response[1];
                res.headers = response[2];
                res.json(response[0]);
            }, (err) => next(err))
            .catch(next);
    })

module.exports = router;
