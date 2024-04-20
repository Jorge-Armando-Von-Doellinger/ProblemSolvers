const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reportModel = new Schema({
    complaints: {
        type: Number,
        required: false,
        default: 0
    },
    author: {
        type: String,
        required: true
    },
    accused: {
        type: String,
        required: true
    },
    idReference: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: false,
        default: Date.now()
    }
})