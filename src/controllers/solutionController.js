const categoryModel = require("../models/categoryModel")
const problemsModel = require("../models/problemModel")
const solutionModel = require("../models/solutionModel")

const addSolution = (req, res) => {
    try {
        const {id} = req.params
        const {title, description} = req.body
        const newSolution = new solutionModel({
            problemId: id,
            title: title,
            description: description
        })

        newSolution.save().then(() => {
            req.flash("success", "Solução salva com sucesso!")
            res.redirect(`/problems/view/${id}`)
        })
        .catch((err) => {
            req.flash("error", "Houve um erro ao salvar sua solução. Por favor, tente novamente!")
            res.redirect(`/problems/view/${id}`)
        })
    }
    catch (err) {
        req.flash("error", "Houve um erro ao criar sua solução. Por favor, tente novamente!")
        res.redirect(`/`)
    }
}

module.exports = {
    addSolution
}