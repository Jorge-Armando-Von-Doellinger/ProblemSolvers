const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.render("./mainPrincipal")
})
router.get("/problems/view/:id", (req, res) => {

})
router.get("/problems/post", (req, res) => {
    res.render("./problemsWeb/postNewProblem")
})

router.post("/problems/post", (req, res) => {
    
})

module.exports = router