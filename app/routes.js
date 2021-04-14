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
    app.post('/inscription', (req, res) => {


        let Register = require('../src/controllers/Register');
        (new Register()).processForm(req, res);

    });
};
