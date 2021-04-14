let User = require('../repository/User')
let bcrypt = require('bcryptjs');


module.exports = class Register {
    printForm(req, res) {
        res.render('register');
    }

    async processForm(req, res) {
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

        ////////  Verifier si l'email n'est pas présente en base 

        const verif = await (new User()).findMail(userData.email)

        //si ma verif est vide alors ajout mon utilisateur
        if (verif.length === 0) {

            //Hashage du mdp => sécurité
            userData.pass = bcrypt.hashSync(
                req.body.pass,
                bcrypt.genSaltSync(10)
            );
            // console.log(userData); // => le mdp rest hashé

            //création d'un nouvel utilisateur 
            (new User()).add(userData);

            //Message flash de création utilisateur
            req.flash('notify', 'Votre compte a bien été créé.');

            // On redirige l'utilisateur vers la page d'accueil
            res.redirect('/');
        } else {
            //Sinon renvoie un message d'erreur
            req.flash('error', 'Email dejà présent en base.');
            // On redirige l'utilisateur vers la page d'inscription
            res.redirect('/register')
        }



    }
};
