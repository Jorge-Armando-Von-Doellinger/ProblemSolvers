const express = require("express")
const router = express.Router()

const middlewareCredentials = require("../middlewares/verifyCredentials")
const middlewareLogged = require("../middlewares/verifyPost")

const problemsController = require("../controllers/problemsController")
const solutionController = require("../controllers/solutionController")

const categoryModel = require("../models/categoryModel")
const problemsModel = require("../models/problemModel")
const solutionModel = require("../models/solutionModel")

//Problems

router.get("/",problemsController.getProblems)

router.get("/problems/post", problemsController.getNewProblem)

router.post("/problems/post", middlewareLogged, middlewareCredentials.verifyCredentials, problemsController.postNewProblem)

router.get("/problems/view/:id", problemsController.viewProblemById)

router.get("/problems/addSolution/:id", (req, res) => res.render("./solutions/addSolution"))

router.post("/problems/addSolution/:id", middlewareLogged ,solutionController.addSolution)



//Filters

router.post("/problems/filters", problemsController.redirectForCategory)

router.get("/problems/filters/:category", problemsController.getProblemsCategory)

router.post("/problems/filters/:category/dateAddition", problemsController.redirectCategoryDateAddition)

router.get("/problems/filters/:category/:dateAddition", problemsController.getProblemsCategoryDateAddition)



//Search

router.post("/problems/search/keywords", problemsController.searchProblems)

router.get("/problems/search/view/:keywords", problemsController.getSearchProblems)

//Reports

router.post("/problems/report/post", problemsController.reportPost)

module.exports = router