//Fichier de gestion des routes
module.exports = (app) => {

    // route vers l'accueil
    app.get('/', (req, res) => {
        let Home = require('../src/controllers/Home');
        (new Home()).print(req, res);

    });

    // route vers la page d'inscription
    app.get('/register', (req, res) => {
        let Register = require('../src/controllers/Register');
        (new Register()).printForm(req, res);

    });

    // gestion du formulaire post
    app.post('/register', (req, res) => {


        let Register = require('../src/controllers/Register');
        (new Register()).processForm(req, res);


        // //On récupère les informations du formulaire dans req.body
        // // console.log(req.body);
        // let userData = req.body
        // console.log(userData)


        // // Connection à la BDD
        // require('../bdd/database')(mongoose);

        // //création d'un nouvel utilisateur 
        // let User = require('../repository/User');
        // (new User()).add(userData);


        // //fermeture de la bdd ??



        // // On redirige l'utilisateur vers la page d'accueil
        // res.redirect('/'); l
    });
};