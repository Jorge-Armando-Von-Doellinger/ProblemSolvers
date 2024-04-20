const express = require("express")
const router = express.Router()
const checkAdmin = require("../config/adminLevel")


const admController = require("../controllers/admController")

const categoriesController = require("../controllers/categoriesController")

router.use(checkAdmin)

router.get("/", (req, res) => {
    res.render("./admin/index")
})

router.get("/categoryes/new", (req, res) => {
    res.render("./admin/newCategory")
})

router.post("/categoryes/new", categoriesController.newCategory)



module.exports = router