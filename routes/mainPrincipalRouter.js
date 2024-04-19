const express = require("express")
const router = express.Router()

const middlewareCredentials = require("../middlewares/verifyCredentials")

const postProblemsController = require("../controllers/postProblems")
const postSolutionController = require("../controllers/postSolution")

const categoryModel = require("../models/categoryModel")
const problemsModel = require("../models/problemModel")
const solutionModel = require("../models/solutionModel")

router.get("/", (req, res) => {
    try {
        problemsModel.find().lean().sort({created_at: -1}).then((problems) => {
            categoryModel.find().lean().then((categoryes) => {
                res.render("./mainPrincipal", {problems: problems, categoryes: categoryes})
            })
            .catch((err) => {
                req.flash("error", 'Houve um erro ao carregar as categorias!')
                res.redirect("/")
            })
            // res.render("./problemsWeb/index", {problems})
        })
        .catch((err) => {
            req.flash("error", "Houve um erro interno ao procurar as categorias")
            // res.render("/")
        })
    }
    catch (err) {
        req.flash("error", "Houve um erro ao procurar as categorias. Por favor, tente novamente!")
        // res.redirect("/")
    }
})

router.post("/problems/filter", (req, res) => {
    try {
        const {categoryes} = req.body
        res.redirect(`/problems/${categoryes}`)
    }
    catch (err) {
        req.flash("error", "Ocorreu um erro durante a filtragem. Por favor, tente novamente!")
        res.redirect("/")
    }
})

router.get("/problems/:category", (req, res) => {
    try {
        
        const {category} = req.params

        problemsModel.find({category: category}).lean()
        .then((problemsFiltered) => {
            
            res.render("./problemsWeb/filteredProblems", {problemsFiltered: problemsFiltered, title: category})
        })
        .catch((err) => {
            req.flash("error", "Erro ao procurar estes problemas")
            res.redirect("/")
        })
    }
    catch (err) {
        req.flash("error", "Houve um erro interno ao procurar estes problemas")
        res.redirect("/")
    }

})

router.post("/problems/:category/dateAddition", (req, res) => {
    try {
        const {dateAddition, category} = req.body
        res.redirect(`/problems/${category}/${dateAddition}`)
    }
    catch{
        req.flash("error", "Houve um erro durante a filtragem dos problemas. Tente novamente!")
        res.redirect("/")
    }
})

router.get("/problems/:category/:dateAddition", (req, res) => {
    try {
        const {dateAddition, category} = req.params
        console.log(category)
        problemsModel.find({category: category}).lean().sort({created_at: parseInt(dateAddition)})
        .then((problemsFiltered) => {
            console.log(problemsFiltered)
            res.render("./problemsWeb/filteredProblems", {problemsFiltered: problemsFiltered, title: category})
        })
        .catch((err) => {
            req.flash("error", "Erro ao procurar estes problemas")
            res.redirect("/")
        })
    }
    catch (err) {
        req.flash("error", "Houve um erro interno ao procurar estes problemas")
        res.redirect("/")
    }

})

router.get("/problems/view/:id", (req, res) => {
    try{
        const {id} = req.params
        problemsModel.findById(id).lean().then((problem) => {
            solutionModel.find({problemId: id}).lean().then((solutions) => {
                res.render("./problemsWeb/seeProblem", {problem: problem, solutions: solutions})
            })
            .catch((err) => {
                req.flash("error", "Houve um erro ao procurar as soluções. Por favor, tente novamente!")
                res.redirect("/")
            })
        })
        .catch((err) => {
            req.flash("error", "Erro ao carregar este problema. Tente novamente!")
            res.render("./problemsWeb/seeProblem")
            
        })
    }
    catch (err) {
        req.flash("error", "Houve algum ao procurar este problema. Por favor, tente novamente!")
    }
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

router.get("/problems/addSolution/:id", (req, res) => {
    res.render("./solutions/addSolution")
})

router.post("/problems/addSolution/:id", postSolutionController.addSolution)

module.exports = router