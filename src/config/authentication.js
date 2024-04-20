const bcryptjs = require("bcryptjs")
const LocalStrategy = require("passport-local")
const usersModel = require("../models/userModel")
const passport = require("passport")

const getUserCompare = async (email, password) => {

    const user = await usersModel.findOne({email: email}).lean()
        if(!user){
            return done(null, false, {message: "Usuario não encontrado!"})
        } 
        else {
            const passwordVerify = await bcryptjs.compare(password, user.password)
            if(passwordVerify){
                return passwordVerify
            } else {
                return done(null, false, {message: "Senha incorreta!"})
            }
    }
}

const verify = (passport) => {
    try{
        passport.use(
            new LocalStrategy(
                {usernameField: "email", passwordField: "password"}, async (email, password, done) => {
                    usersModel.findOne({email: email}).lean()
                    .then(async (user) => {
                        
                        if(!user){
                            return done(null, false, {message: "Usuario não existente"})
                        } 
                        else {
                            const passwordVerify = await bcryptjs.compare(password, user.password)

                            if(passwordVerify){
                                return done(null, user, {message: "Logado com sucesso"})
                            } 
                            else {
                                return done(null, false, {message: "Senha incorreta"})
                            }
                        }
                    })
                    .catch((err) => {
                        return done(null,false, {message: "Erro ao procurar usuário!"})
                    }) 

                }
            )
        )
        passport.serializeUser((user, done) => {
            return done(null, user._id)
        })
        passport.deserializeUser((id, done) => {
            usersModel.findById(id).lean().then(user => {
                if(!user){
                    return done(null, false)
                } else {
                    return done(null, user)
                }
            }, (err) => {
                return done(err, false)
            })
            .catch((err) => done(err,false))
        })
    }
    catch (err){
        console.log(err)
        console.log("Erro")
    }
}

module.exports = verify
