const express = require("express")
const router = express.Router()

const newCategory = require("../controllers/postCategoryes")

router.get("/", (req, res) => {
    res.render("./admin/index")
})

router.get("/categoryes/new", (req, res) => {
    res.render("./admin/newCategory")
})
router.post("/categoryes/new", newCategory.newCategory)



module.exports = router