const mongoose = require("mongoose");
const Schema = mongoose.Schema;

Cart = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    quantity: {
        type: Number,
        default: 0
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }
})
