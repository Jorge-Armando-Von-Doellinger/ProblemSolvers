const express = require("express")
const router = express.Router()
const checkAdmin = require("../config/adminLevel")
const checkBloques = require("../config/deletePostBlockeds")

const admController = require("../controllers/admController")

const categoriesController = require("../controllers/categoriesController")

router.use(checkAdmin)

router.get("/", admController.getReports)

router.get("/categoryes/new", (req, res) => {
    res.render("./admin/newCategory")
})

router.post("/categoryes/new", categoriesController.newCategory)

router.post("/user/block", admController.blockUser, checkBloques.deleteAllOfBlockeds)

//Filters
router.post("/filter", (req, res) => {
    const {filter} = req.body
    res.redirect(`/admin/filter/${filter}`)
})

router.get("/filter/:ordem", admController.getReportsOrdem)

// router.post("/user/unblock", admController.unblockUser)



module.exports = router