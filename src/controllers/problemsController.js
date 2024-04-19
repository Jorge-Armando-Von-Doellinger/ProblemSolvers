const { urlencoded } = require("body-parser")
const categoryModel = require("../models/categoryModel")
const problemsModel = require("../models/problemModel")
const solutionModel = require("../models/solutionModel")

const getProblems = (req, res) => {
    try {
        problemsModel.find().lean().sort({created_at: -1}).then((problems) => {
            categoryModel.find().lean().then((categoryes) => {
                res.render("./mainPrincipal", {problems: problems, categoryes: categoryes})
            })
            .catch((err) => {
                req.flash("error", 'Houve um erro ao carregar as categorias!')
                res.redirect("/")
            })
            // res.render("./problemsWeb/index", {problems})
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

const getNewProblem = (req, res) => {
    try {
        categoryModel.find().lean().then((categoryes) => {
            res.render("./problemsWeb/postNewProblem", {categoryes})
        })
        .catch((err) => {
            req.flash("error", "Houve um erro interno ao procurar as categorias")
            res.render("/")
        })
    }
    catch (err) {
        req.flash("error", "Houve um erro ao procurar as categorias. Por favor, tente novamente!")
    }
}


const postNewProblem = async (req, res) => {
    try {
        const {title, summary, description, keywords, category} = req.body

        const newProblem = new problemsModel({
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

const redirectForCategory = (req, res) => {
    try {
        const {categoryes} = req.body
        res.redirect(`/problems/filters/${categoryes}`)
    }
    catch (err) {
        req.flash("error", "Ocorreu um erro durante a filtragem. Por favor, tente novamente!")
        res.redirect("/")
    }
}

const getProblemsCategory = (req, res) => {
    try {
        const {category} = req.params

        problemsModel.find({category: category}).lean()
        .then((problemsFiltered) => {
            res.render("./problemsWeb/filteredProblems", {problemsFiltered: problemsFiltered, title: category})
        })
        .catch((err) => {
            req.flash("error", "Erro ao procurar estes problemas")
            res.redirect("/")
        })
    }
    catch (err) {
        req.flash("error", "Houve um erro interno ao procurar estes problemas")
        res.redirect("/")
    }
}

const redirectCategoryDateAddition = (req, res) => {
    try {
        const {dateAddition, category} = req.body
        res.redirect(`/problems/filters/${category}/${dateAddition}`)
    }
    catch{
        req.flash("error", "Houve um erro durante a filtragem dos problemas. Tente novamente!")
        res.redirect("/")
    }
}

const getProblemsCategoryDateAddition = (req, res) => {
    try {
        const {dateAddition, category} = req.params
        
        problemsModel.find({category: category}).lean()
        .sort({created_at: parseInt(dateAddition)})
        .then((problemsFiltered) => {
            res.render("./problemsWeb/filteredProblems", {problemsFiltered: problemsFiltered, title: category})
        })
        .catch((err) => {
            req.flash("error", "Erro ao procurar estes problemas")
            res.redirect("/")
        })
    }
    
    catch (err) {
        req.flash("error", "Houve um erro interno ao procurar estes problemas")
        res.redirect("/")
    }
}

const viewProblemById = async (req, res) => {
    
    try{
        const {id} = req.params
        await problemsModel.findById(id).lean().then(async(problem) => {
            await solutionModel.find({problemId: id}).lean().then((solutions) => {
                res.render("./problemsWeb/seeProblem", {problem: problem, solutions: solutions})
            })
            .catch((err) => {
                req.flash("error", "Houve um erro ao procurar as soluções. Por favor, tente novamente!")
                res.redirect("/")
            })
        })
        .catch((err) => {
            req.flash("error", "Erro ao carregar este problema. Tente novamente!")
            res.render("./problemsWeb/seeProblem")
            
        })
    }
    catch (err) {
        req.flash("error", "Houve algum ao procurar este problema. Por favor, tente novamente!")
        redirect("/")
    }
}

const searchProblems = (req, res) => {
    try {
        const {search} = req.body
        const URLSearch = encodeURIComponent(search)
        
        res.redirect(`/problems/search/view/${URLSearch}`)
    }
    catch {
        req.flash("error", "Erro ao redirecionar para a rota de pesquisa. Por favor, tente novamente!")
        res.redirect("/")
    }

}

const getSearchProblems = async (req, res) => {
    try {
        const {keywords} = req.params
        const decodeKeywords = decodeURIComponent(keywords)
        
        let splitKeywords = await decodeKeywords.split(" ")
        
        const promises = splitKeywords.map(async (keyword) => {
            if(keyword){

                const regex = new RegExp(`${keyword.replace(" ", "")}`, 'i')
                //Aqui ele passa uma expressão regular
                    //Assim consegue fazer não precisar ser exatamente igual
                        //Assim precisando só de uma parte para mostrar o resto
                            //i: Minusculas/Maiúsculas
                            
                return await problemsModel.find({
                    $or: [
                        {summary: regex},
                        {description: regex},
                        {title: regex}
                    ]
                }).lean()
            }
            
        })
            const allPromises = await Promise.all(promises)
            console.log(allPromises)
            res.render("./problemsWeb/searchedProblems", {allPromises: allPromises, search: decodeKeywords})
    }
    catch {
        req.flash("error", "Erro ao realizar a procura")
        res.redirect("/")
    }
}

module.exports = {
    getProblems,
    postNewProblem,
    redirectForCategory,
    getProblemsCategory,
    redirectCategoryDateAddition,
    getProblemsCategoryDateAddition,
    viewProblemById,
    getNewProblem,
    searchProblems,
    getSearchProblems
}