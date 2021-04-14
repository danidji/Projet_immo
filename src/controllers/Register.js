let User = require('../repository/User')
let bcrypt = require('bcryptjs');

module.exports = class Register {
    printForm(req, res) {
        res.render('register');
    }

    processForm(req, res) {
        //On récupère les informations du formulaire dans req.body
        // console.log(req.body);

        let userData = {
            email: req.body.email
            , pass: req.body.pass
            , civility: req.body.civility
            , prenom: req.body.prenom
            , nom: req.body.nom
            , phone: req.body.phone

        };

        // console.log(userData); //=> le mdp n'est pas encore hashé

        //Hashage du mdp => sécurité
        userData.pass = bcrypt.hashSync(
            req.body.pass,
            bcrypt.genSaltSync(10)
        );

        // console.log(userData); // => le mdp rest hashé

        //création d'un nouvel utilisateur 
        (new User()).add(userData);

        // On redirige l'utilisateur vers la page d'accueil
        res.redirect('/');
    }
};
