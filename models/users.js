const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model("User", User);
