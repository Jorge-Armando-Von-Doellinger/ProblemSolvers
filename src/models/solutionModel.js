const mongoose = require("mongoose")
const Schema = mongoose.Schema

const solutionModel = new Schema({
    problemId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
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

module.exports = mongoose.model("solutionModel", solutionModel)
