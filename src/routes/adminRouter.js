const express = require("express")
const router = express.Router()

const categoriesController = require("../controllers/categoriesController")

router.get("/", (req, res) => {
    res.render("./admin/index")
})

router.get("/categoryes/new", (req, res) => {
    res.render("./admin/newCategory")
})


router.post("/categoryes/new", categoriesController.newCategory)



module.exports = router