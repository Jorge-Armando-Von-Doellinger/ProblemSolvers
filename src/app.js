const express = require("express")
const app = express()

require("dotenv").config()
const expressSession = require("express-session")
const bodyParser = require("body-parser")
const connectFlash = require("connect-flash")
const handlebars = require("express-handlebars")
const path = require("path")

const mongoose = require("./connection/mongoose")

app.use(
    expressSession({
        secret: "node",
        resave: true,
        saveUninitialized: true
    })
)

app.use(bodyParser.urlencoded({extended: true}))

app.use(connectFlash())
app.use((req, res, next) => {
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")

    next()
})

app.use(express.static(path.join(__dirname, "public")))
app.engine("handlebars", handlebars.engine({defaultLayout: "main"}))
app.set("view engine", 'handlebars')
app.set("views", `${__dirname}/views`)

const mainPrincipalrouter = require("./routes/mainPrincipalRouter")
const adminRouter = require("./routes/adminRouter")
const userRouter = require("./routes/userRouter")

app.use(mainPrincipalrouter)
app.use("/admin", adminRouter)
app.use("/user", userRouter)

const PORT = process.env.SERVER_PORT
app.listen(PORT)