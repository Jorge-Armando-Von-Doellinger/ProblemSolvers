const mongoose = require("mongoose")
const { type } = require("os")
const Schema = mongoose.Schema

const problemsModel = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: false,
        default: "resolvedFalse"
    },
    category: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: false,
        default: 0
    },
    reports: {
        type: Number,
        required: false,
        default: 0
    },
    created_at: {
        type: Date,
        required: false,
        default: Date.now()
    }
})

module.exports = mongoose.model("problemsModel", problemsModel)