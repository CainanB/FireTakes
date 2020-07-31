let auth = (req, res, next) => {

    if (req.session.username) {
        next()
    }
    else {
        res.redirect('/login')
    }
}

module.exports = auth;