const userModel = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const passport = require("passport")
const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body
        const passHashed = await bcryptjs.hash(password, 10)
        
        const newUser = new userModel({
            name: name,
            email: email,
            password: passHashed,
            adminLevel: 10
            
        })

        
        await newUser.save()
        .then(() => {
            req.flash("success", "Conta criada com sucesso!")
            res.redirect("/")
        })
        .catch((err) => {
            // console.log(err)
            req.flash("error", "Houve um erro ao salvar sua conta. Por favor, tente novamente!")
            res.redirect("/")
        })
        
    }
    catch {
        req.flash("error", "Houve um erro ao criar sua conta. Por favor, tente novamente!")
        res.redirect("/")
    }
}

const authenticateUser = (req, res, next) => {
    passport.authenticate("local", {
        failureFlash: true,
        failureMessage: true,
        failureRedirect: "/user/login",
        successRedirect: "/",
        
    })(req, res,next)
    
}

module.exports = {
    registerUser,
    authenticateUser
}