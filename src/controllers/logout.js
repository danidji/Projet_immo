module.exports = class Logout {
    quitSession(req, res) {
        // on vide l'objet session.user
        req.session.users = null;
        // console.log('---logout.js---');
        // console.log(req.session);
        // console.log(res.locals);
        res.redirect('/');
    }
};
