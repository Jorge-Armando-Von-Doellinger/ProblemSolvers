const express = require("express")
const app = express()

require("dotenv").config()
const expressSession = require("express-session")
const bodyParser = require("body-parser")
const connectFlash = require("connect-flash")
const handlebars = require("express-handlebars")

const path = require("path")
const passport = require("passport")

const mongoose = require("./connection/mongoose")
const verify = require("./config/authentication")
app.use(
    expressSession({
        secret: "node",
        resave: true,
        saveUninitialized: true
    })
)

app.use(connectFlash())

app.use(passport.initialize())
app.use(passport.session())

verify(passport)

app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    res.locals.user = req.user  
    next()
})

app.use(express.static(path.join(__dirname, "public")))
app.engine("handlebars", handlebars.engine({defaultLayout: "main"}))
app.set("view engine", 'handlebars')
app.set("views", `${__dirname}/views`)

const mainPrincipalrouter = require("./routes/mainPrincipalRouter")
const adminRouter = require("./routes/adminRouter")
const userRouter = require("./routes/userRouter")
// const adminLevelCheck = require("./config/adminLevel")
app.use(mainPrincipalrouter)
app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.get("/a", (req, res) => {
    console.log(req.flash())
})
const PORT = process.env.SERVER_PORT
app.listen(PORT)