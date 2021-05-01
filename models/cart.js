const mongoose = require("mongoose");
const Schema = mongoose.Schema;

Cart = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
    }
})

Cart.index({
    customer: 1,
    item: 1
}, {
    unique: true
})

module.exports = mongoose.model("Cart", Cart);
