const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userModel = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    adminLevel: {
        type: Number,
        required: false,
        default: 0
    },
    blocked: {
        type: Boolean,
        required: false,
        default: false
    }
})
module.exports = mongoose.model("userModel", userModel)