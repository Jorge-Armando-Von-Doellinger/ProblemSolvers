const express = require("express")
const router = express.Router()

const middlewareCredentials = require("../middlewares/verifyCredentials")
const postProblemsController = require("../controllers/postProblems")


router.get("/", (req, res) => {
    res.render("./mainPrincipal")
})
router.get("/problems/view/:id", (req, res) => {

})
router.get("/problems/post", (req, res) => {
    res.render("./problemsWeb/postNewProblem")
})

router.post("/problems/post", middlewareCredentials.verifyCredentials, postProblemsController.postNewProblem)

module.exports = router