//Fichier de gestion des routes
module.exports = (app) => {

    // route vers l'accueil
    app.get('/', (req, res) => {
        let Home = require('../controllers/Home');
        (new Home()).print(req, res);

    });

    // route vers la page d'inscription
    app.get('/register', (req, res) => {
        let User = require('../controllers/Users');
        (new User()).print(req, res);

    });

    // gestion du formulaire post
    app.post('/register', (req, res) => {

        //On récupère les informations du formulaire dans req.body
        console.log(req.body);

        // On réaffiche le formulaire => possiblement une autre page plus tard
        let User = require('../controllers/Users');
        (new User()).print(req, res);
    });
};