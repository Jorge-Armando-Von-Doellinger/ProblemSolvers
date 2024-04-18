const express = require("express")
const router = express.Router()

const middlewareCredentials = require("../middlewares/verifyCredentials")
const postProblemsController = require("../controllers/postProblems")
const categoryModel = require("../models/categoryModel")
const problemsModel = require("../models/problemModel")

router.get("/", (req, res) => {
    try {
        problemsModel.find().lean().then((problems) => {
            res.render("./mainPrincipal", {problems})
            // res.render("./problemsWeb/index", {problems})
        })
        .catch((err) => {
            req.flash("error", "Houve um erro interno ao procurar as categorias")
            res.render("/")
        })
    }
    catch (err) {
        req.flash("error", "Houve um erro ao procurar as categorias. Por favor, tente novamente!")
    }
})
router.get("/problems/view/:id", (req, res) => {
    
})
router.get("/problems/post", (req, res) => {
    try {
        categoryModel.find().lean().then((categoryes) => {
            res.render("./problemsWeb/postNewProblem", {categoryes})
        })
        .catch((err) => {
            req.flash("error", "Houve um erro interno ao procurar as categorias")
            res.render("/")
        })
    }
    catch (err) {
        req.flash("error", "Houve um erro ao procurar as categorias. Por favor, tente novamente!")
    }
})

router.post("/problems/post", middlewareCredentials.verifyCredentials, postProblemsController.postNewProblem)

module.exports = router