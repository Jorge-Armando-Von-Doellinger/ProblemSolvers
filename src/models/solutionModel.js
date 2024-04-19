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
    created_at: {
        type: Date,
        required: false,
        default: Date.now()
    }
})

module.exports = mongoose.model("solutionModel", solutionModel)
