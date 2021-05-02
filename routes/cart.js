const express = require("express");
const router = express.Router();
const resp = require("../utils/responses");
const Cart = require("../models/cart");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.route("/:userId/items")
    .get((req, res, next) => {
        Cart.find({
            customer: req.params.userId
        })
            .then((cart) => {
                let response = resp.responseWith({
                    response: resp.SUCCESS_200,
                    value: cart
                })
                res.statusCode = response[1];
                res.headers = response[2];
                res.json(response[0]);
            }, (err) => next(err))
            .catch(next);
    })
    .post((req, res, next) => {
        req.body.customer = req.params.userId;
        Cart.create(req.body)
            .then((addedItem) => {
                let response = resp.responseWith({
                    response: resp.SUCCESS_201,
                    value: addedItem
                });
                res.statusCode = response[1];
                res.headers = response[2];
                res.json(response[0]);
            }, (err) => next(err))
            .catch(next)
    })

router.route("/items/:itemId")
    .get((req, res, next) => {
        Cart.findById(req.params.itemId)
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
    .delete((req, res, next) => {
        Cart.findByIdAndDelete(req.params.itemId)
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
            }, (err) => next(err))
            .catch(next);
    })
    .put((req, res, _) => {
        Cart.findOneAndUpdate(req.params.itemId, {
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
                    });
                } else {
                    response = resp.responseWith({
                        response: resp.SERVER_ERROR_404,
                        error: "Item in cart not found"
                    })
                }
                res.statusCode = response[1];
                res.headers = response[2];
                res.json(response[0])
            })
    })

module.exports = router;
