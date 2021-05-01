const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const Item = new Schema({
    name: {
        type: "String",
        required: true,
        default: ""
    },
    price: {
        type: Currency,
        default: ""
    },
});

module.exports = mongoose.model("Item", Item)
