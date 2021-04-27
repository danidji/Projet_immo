module.exports = class Logout {
    quitSession(req, res) {
        // on vide l'objet session.user
        // req.session.users = null;
        // console.log('---logout.js---');
        // console.log(req.session);
        // console.log(res.locals);
        let Cookies = require("cookies");
        new Cookies(req, res).set('access_token', null, { maxAge: 0 });
        req.flash('notify', 'Vous êtes maintenant déconnecté.');
        res.redirect('/');
    }
};
