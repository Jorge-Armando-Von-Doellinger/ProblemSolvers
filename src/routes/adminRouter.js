const express = require("express")
const router = express.Router()
const checkAdmin = require("../config/adminLevel")

const problemsADM = require("../controllers/adminProblems")

router.use(checkAdmin)

const categoriesController = require("../controllers/categoriesController")
const adminLevel = require("../config/adminLevel")

router.get("/", (req, res) => {
    res.render("./admin/index")
})

router.get("/categoryes/new", (req, res) => {
    res.render("./admin/newCategory")
})

router.post("/categoryes/new", categoriesController.newCategory)


router.get("/admin/problems", problemsADM.getProblemsADM)


module.exports = router