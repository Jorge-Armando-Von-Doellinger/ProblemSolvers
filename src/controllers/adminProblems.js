const categoryModel = require("../models/categoryModel")
const problemsModel = require("../models/problemModel")
const solutionModel = require("../models/solutionModel")

const getProblemsADM = (req, res) => {
    try {
        problemsModel.find().lean().sort({created_at: -1}).then((problems) => {
            categoryModel.find().lean().then((categoryes) => {
                res.render("./mainPrincipal", {problems: problems, categoryes: categoryes})
            })
            .catch((err) => {
                req.flash("error", 'Houve um erro ao carregar as categorias!')
                res.redirect("/")
            })
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
}

module.exports = {
    getProblemsADM
}