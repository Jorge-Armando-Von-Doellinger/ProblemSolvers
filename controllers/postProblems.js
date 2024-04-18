const problemModel = require("../models/problemModel")

const postNewProblem = async (req, res) => {
    try {
        const {title, summary, description, keywords, category} = req.body

        const newProblem = new problemModel({
            title: title,
            description: description,
            summary: summary,
            keywords: keywords,
            category: category
        })
        newProblem.save()
        .then(() => {
            
            req.flash("success", "Problema registrado com sucesso")
            res.redirect("/")
        })
        .catch((err) => {
            req.flash("error", "Erro. Verifique os campos e tente novamente!")
        })
        
    }
    catch (err) {
        req.flash("error", "Houve um erro ao registrar seu problema. Por favor, tente novamente!")
        res.redirect("/")
    }
}


module.exports = {
    postNewProblem
}