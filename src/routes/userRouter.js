const express = require("express")
const router = express.Router()

require("dotenv").config()
const nodemailer = require("nodemailer")
const userController = require("../controllers/usersController")

router.get("/register", (req, res) => res.render("./users/register"))

router.post("/register", userController.registerUser)

router.get("/login", (req, res) => res.render("./users/login"))

router.post("/login", userController.authenticateUser)

router.get("/logout", userController.getLogOut)

// router.post("/register/a", async (req, res) => {
//     const transport = await nodemailer.createTransport({
//         host: "smtp.umbler.com",
//         port: 587,
//         secure: false,
//         auth: {
//             user: process.env.NODEMAILER_USER,
//             pass: process.env.NODEMAILER_PASSWORD
//         }
//     })
//         await transport.sendMail({
//             from: `Jorge <${process.env.NODEMAILER_USER}>`,
//             to: "ydarkgameplay7@gmail.com",
//             subject: "Email de teste",
//             html: "<h1> Olá </h1> <p> Email enviado pelo nodemailer </p>",
//             text: "mensagem enviada pelo nodemailer"
//         }).then((response) => {
//             console.log(response)
//             console.log("Email enviado")
//         }).catch((err) => {
//             console.log(err)
//         })
// })


module.exports = router