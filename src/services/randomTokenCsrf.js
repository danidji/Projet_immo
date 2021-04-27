const crypto = require('crypto')

exports.generate = (req, res, next) => {
    // console.log('---- services token CSRF ----');
    // On génére un token crypté avec la fction de hashage 'sha1'
    let token = crypto.createHash('sha1').update(`${new Date().toDateString()}${Math.random()}`).digest('hex');
    // On stocke le token en locals pour y avoir accès dans les différentes vues et en session pour faire la comparaison plus tard
    req.session.token = token;
    res.locals.token_csrf = token;

    //On appelera ce middleware pour chaque page ayant un formulaire et on stockera le token dans un input 'hidden'

    // console.log(res.locals);
    // console.log(req.session);
    next();
};

exports.verify = (req, res, next) => {
    //On vérifie à présent si le token de la session est bien égale au token du formulaire
    if (req.body.csrf === req.session.token) {

        next();
    } else {
        res.sendStatus(403);
    }
};