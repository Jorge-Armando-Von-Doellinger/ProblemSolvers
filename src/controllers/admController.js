const categoryModel = require("../models/categoryModel")
const problemsModel = require("../models/problemModel")
const solutionModel = require("../models/solutionModel")
const reportsModel = require("../models/reportsModel")
const userModel = require("../models/userModel")

const getReports = async(req, res) => {
    try{
        const reports = await reportsModel.find().lean()
        const problems = await problemsModel.find().lean()
        res.render("./admin/index", {reports: reports, problems:problems})
    }
    catch {
        req.flash("error", "Houve um erro ao carregar a página")
        res.redirect("/")
    }
}

const blockUser = async (req, res, next) => {
    try {
        const {idReference} = req.body
        const findUser = await problemsModel.findById(idReference).lean()
        const userAuthorID = findUser.authorID

        userModel.findById(userAuthorID).then(async(user) => {
            user.blocked = true

            await user.save()
        })
        .then(() => {
            req.customData = {id:userAuthorID, block: true}
            next()

        })
        .catch((err) => {
            req.flash("error", "Houve um erro ao encontrar o usuario. Por favor, tente novamente ou reclame com os desenvolvedores!")
            res.redirect("/admin")
        })
    }
    catch{
        req.flash("error", "Houve um erro interno ao realizar o bloqueio do usuario. Tente novamente!")
        res.redirect("/admin")
    }
}

const getReportsOrdem = async (req, res) => {
    const {ordem} = req.params
    const ordemNumber = Number(ordem)
    const reportsOredenado = await reportsModel.find().lean().sort({created_at: ordemNumber})
    res.render("./admin/filtersReports", {reports: reportsOredenado})
}

// const unblockUser = async (req, res) => {
//     try {
//         const {idReference} = req.body
//         const findUser = await problemsModel.findById(idReference).lean()
//         const userAuthorID = findUser.authorID

//         userModel.find().then(async(user) => {
//             user.blocked = false

//             await user.save()
//         })
//         .then(() => {
//             req.flash("success", "Desbloqueado com sucesso!")
//             res.redirect("/admin")
//         })
//         .catch((err) => {
//             req.flash("error", "Houve um erro ao encontrar o usuario. Por favor, tente novamente ou reclame com os desenvolvedores!")
//             res.redirect("/admin")
//         })
//     }
//     catch{
//         req.flash("error", "Houve um erro interno ao realizar o desbloqueio do usuario. Tente novamente!")
//         res.redirect("/admin")
//     }
// }

module.exports = {
    getReports,
    blockUser,
    getReportsOrdem
    // unblockUser
}