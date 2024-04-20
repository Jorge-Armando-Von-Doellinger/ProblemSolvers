const problemsModel = require("../models/problemModel")
const reportsModel = require("../models/reportsModel")

const deleteAllOfBlockeds = async (req, res, next) => {   
    const {id, block}= req.customData
    if(block == true){   
        
        const problems = await problemsModel.find({authorID: id})
        problems.forEach(async(problem) => {

            await problemsModel.findByIdAndDelete(problem._id)
            // await reportsModel.findOneAndDelete({idReference: problem._id})
            await reportsModel.deleteMany({idReference: problem.id})
        })
            req.flash("success", "Bloqueado com sucesso!")
            res.redirect("/admin")
    }
}
module.exports = {
    deleteAllOfBlockeds
}