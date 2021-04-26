const Cookies = require("cookies");
const config = require('../../app/config')
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    //vérification du token lors de l'appel de la route admin
    let token = new Cookies(req, res).get('access_token');

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, config.appKey, (err, user) => {
        // Erreur du JWT
        if (err) return res.sendStatus(403);
        // console.log(user.roles)
        // Est admin
        if (typeof user.role != 'undefined' && user.role == 'admin') {


            res.locals.user = user;
            res.locals.user.connected = true;

            console.log('---Service---');
            console.log(res.locals)
            next();
        } else {
            // n'est pas admin
            req.flash('error', "Vous n'êtes pas administrateur");
            res.redirect('/login');
        }
    });

}