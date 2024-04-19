const userModel = require("../models/userModel")

const registerUser = (req, res) => {
    try{
        const {name, email, password} = req.body
        const newUser = new userModel({
            name: name,
            email: email,
            password: password
        })
    }
    catch{

    }
}