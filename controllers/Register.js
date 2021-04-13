module.exports = class Register {
    print(req, res) {
        res.render('register');
    }

    process(req, res) {
        //On récupère les informations du formulaire dans req.body
        // console.log(req.body);
        let userData = req.body
        console.log(userData)


        ///=> revoir le cryptage du mdp
        let bcrypt = require('bcryptjs');
        userData.password = bcrypt.hashSync(
            request.body.password,
            bcrypt.genSaltSync(10)
        );

        console.log(userData)

        // // Connection à la BDD
        // require('../bdd/database')(mongoose);

        // //création d'un nouvel utilisateur 
        // let User = require('../repository/User');
        // (new User()).add(userData);


        // //fermeture de la bdd ??



        // // On redirige l'utilisateur vers la page d'accueil
        // res.redirect('/'); l
    }
};
