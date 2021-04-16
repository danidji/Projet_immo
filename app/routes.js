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

    // gestion du formulaire post inscription
    app.post('/inscription', (req, res) => {

        let Register = require('../src/controllers/Register');
        (new Register()).processForm(req, res);

    });

    // Création d'une route vers la page de connexion
    app.get('/login', (req, res) => {
        let Login = require('../src/controllers/Login');
        (new Login()).printLogin(req, res);

    });

    // gestion du formulaire post connexion
    app.post('/connexion', (req, res) => {
        let Login = require('../src/controllers/Login');
        (new Login()).processLogin(req, res);
    })
    //route de déconnexion utilisateur
    app.get('/logout', (req, res) => {
        let Logout = require('../src/controllers/logout');
        (new Logout()).quitSession(req, res);

    });

    // route vers la page admin
    app.get('/dashboard', (req, res) => {
        let Admin = require('../src/controllers/Admin');
        (new Admin()).print(req, res);

    });

    // route vers la page biens
    app.get('/biens', (req, res) => {
        let Biens = require('../src/controllers/Biens');
        (new Biens()).print(req, res);

    });

    // gestion du formulaire des biens immo
    app.post('/biensImmo', (req, res) => {
        let Biens = require('../src/controllers/Biens');
        (new Biens()).processForm(req, res);

    });

    //route de deconnexion admin 
    app.get('/logOut_admin', (req, res) => {
        res.redirect('/')
    });

};
