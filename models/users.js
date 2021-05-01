const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String,
        required: true,
        default: "",
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }]
});

module.exports = mongoose.model("User", User);
