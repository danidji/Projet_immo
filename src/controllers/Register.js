let User = require('../repository/User')
let bcrypt = require('bcryptjs');


module.exports = class Register {
    printForm(req, res) {
        // console.log(res.locals.session)
        res.render('register',
            {
                title: 'TeLoger'
                , session: res.locals.session //=> remettre .users en dehors du dev admin
            });
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
        let repo = new User();
        const verif = await repo.findMail(userData.email);

        //si ma verif est vide alors ajout mon utilisateur
        if (verif === null) {

            //Hashage du mdp => sécurité

            let salt = bcrypt.genSaltSync(10);
            //   v--mdp crypter                  v-- mdp à crypter
            let passwordHash = bcrypt.hashSync(userData.pass, salt);
            userData.pass = passwordHash;
            // console.log(userData); // => le mdp rest hashé

            //création d'un nouvel utilisateur 
            repo.add(userData);

            //Message flash de création utilisateur
            req.flash('notify', 'Votre compte a bien été créé.');

            // On redirige l'utilisateur vers la page d'accueil
            res.redirect('/');
        }
        //Sinon renvoie un message d'erreur
        else {
            req.flash('error', 'Email dejà présent en base.');
            // On redirige l'utilisateur vers la page d'inscription
            res.redirect('/register')
        }



    }
};
