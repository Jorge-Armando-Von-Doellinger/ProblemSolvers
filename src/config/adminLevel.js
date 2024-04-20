const adminLevel = (req, res, next) => {
    if(req.isAuthenticated() && req.user.adminLevel > 0){
        next()
    } else {
        req.flash("error", "É necessário ser parte dos admininstradores para acessar esta area")
        return res.redirect("/")
    }
}
module.exports = adminLevel