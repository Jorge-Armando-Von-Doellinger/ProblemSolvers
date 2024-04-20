const verifyLoginPost = (req, res, next) => {
    if(!req.isAuthenticated() || (!req.user || !req.user.name || !req.user.email)){
        req.flash("error", "Tem que estar logado para realizar postagens!")
        res.redirect("/user/register")
    } else {
        next()
    }
}

module.exports = verifyLoginPost