const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categoryModel = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("categoryModel", categoryModel)