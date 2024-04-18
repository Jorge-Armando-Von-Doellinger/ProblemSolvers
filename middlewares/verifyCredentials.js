
const verifyCredentials = (req, res, next) => {
    const {title, description, keywords, category} = req.body
    const stringNull = title == '' || description == '' || keywords == ''
    const shortString = title.length < 4 || description.length < 10 || keywords.length < 5
    const trimmedString = title.trim()
    if(!title || !description|| !keywords || !category || stringNull || trimmedString.length < 4){
        req.flash("error", "Não pode deixar os campos vazios!")
        res.redirect("/problems/post")
    } else if(shortString){
        req.flash("error", "Campos muito curtos. Dê mais detalhes.")
        res.redirect("/problems/post")
    } else {
        next()
    }
}

module.exports = {
    verifyCredentials
}