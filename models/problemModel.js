const mongoose = require("mongoose")
const Schema = mongoose.Schema

const problemsModel = new Schema({
    title: {
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
    keywords: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: false,
        default: Date.now()
    }
})

module.exports = mongoose.model("problemsModel", problemsModel)