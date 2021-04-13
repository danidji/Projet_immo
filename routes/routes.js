//Fichier de gestion des routes
module.exports = (app, mongoose) => {

    // route vers l'accueil
    app.get('/', (req, res) => {
        let Home = require('../controllers/Home');
        (new Home()).print(req, res);

    });

    // route vers la page d'inscription
    app.get('/register', (req, res) => {
        let Register = require('../controllers/Register');
        (new Register()).print(req, res);

    });

    // gestion du formulaire post
    app.post('/register', (req, res) => {


        let Register = require('../controllers/Register');
        (new Register()).process(req, res);


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