const categoryModel = require("../models/categoryModel")

const newCategory = (req, res) => {
    try {
        const {name} = req.body

        const category = new categoryModel({
            name: name
        })

        category.save()
        .then(() => {
            req.flash("success", "Categoria criada com sucesso!")
            res.redirect("/admin")   
        }).catch((err) => {
            req.flash("error", "Falha ao salvar categoria!")
            res.redirect("/admin")   
            
        });
    }
    catch (err) {
        req.flash("error", "Erro ao criar categoria")
        res.redirect("/admin") 
    }
}

module.exports = {
    newCategory
}