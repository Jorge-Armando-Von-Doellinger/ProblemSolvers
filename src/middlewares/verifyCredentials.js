const { strictEqual } = require("assert")

const verifyCredentials = (req, res, next) => {
    const {title, summary, description, category} = req.body

    const titleTrimmedString = title.trim()
    const summaryTrimmedString = summary.trim()
    const descriptionTrimmedString = description.trim()

    const stringNull = title == '' || description == '' || title == ''
    const stringSpace = titleTrimmedString.length == 0 || summaryTrimmedString.length == 0 || descriptionTrimmedString.length == 0
    
    const StringUndefinedNull = !title || !description || !category
    // const shortString = title.length < 4 || description.length < 10 || keywords.length < 5 || summary.length < 10

    const stringTrimmedLenght = titleTrimmedString.length < 4 || summary.length < 10 || descriptionTrimmedString.length < 10

    const veryLongText = summaryTrimmedString.length > 150 || titleTrimmedString.length > 50

    if(stringNull || stringSpace){
        req.flash("error", "Não pode deixar os campos vazios!")
        res.redirect("/problems/post")
    } else if(stringTrimmedLenght){
        req.flash("error", "Campos muito curtos. Dê mais detalhes.")
        res.redirect("/problems/post")
    } else if(veryLongText) {
        req.flash("error", "Titulo e resumo muito grandes. Não é necessário tantos detalhes.")
        res.redirect("/problems/post")
    } else {
        next()

    }
}

module.exports = {
    verifyCredentials
}