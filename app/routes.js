//Fichier de gestion des routes
let Home = require('../src/controllers/Home');
let Register = require('../src/controllers/Register');
let Login = require('../src/controllers/Login');
let Logout = require('../src/controllers/logout');
let Admin = require('../src/controllers/Admin');
let Biens = require('../src/controllers/Biens');
let Realty_list = require('../src/controllers/Realty_list');



module.exports = (app) => {

    // route vers l'accueil
    app.get('/', (req, res) => {

        (new Home()).print(req, res);

    });

    // route vers la page d'inscription
    app.get('/register', (req, res) => {

        (new Register()).printForm(req, res);

    });

    // gestion du formulaire post inscription
    app.post('/inscription', (req, res) => {

        (new Register()).processForm(req, res);

    });

    // Création d'une route vers la page de connexion
    app.get('/login', (req, res) => {

        (new Login()).printLogin(req, res);

    });

    // gestion du formulaire post connexion
    app.post('/connexion', (req, res) => {

        (new Login()).processLogin(req, res);
    })
    //route de déconnexion utilisateur
    app.get('/logout', (req, res) => {

        (new Logout()).quitSession(req, res);

    });

    // route vers la page admin
    app.get('/admin/dashboard', (req, res) => {

        (new Admin()).print(req, res);

    });

    // route vers la page biens
    app.get('/admin/biens', (req, res) => {

        (new Biens()).print(req, res);

    });

    // gestion du formulaire des biens immo
    app.post('/admin/biensImmo', (req, res) => {

        (new Biens()).processForm(req, res);

    });

    //route de deconnexion admin 
    app.get('/admin/logout_admin', (req, res) => {
        res.redirect('/')
    });


    let repoRealtyList = new Realty_list();

    // routes vers la liste des biens 
    app.get('/admin/realtyList', (req, res) => {


        repoRealtyList.printRealty(req, res);
    })

    // routes pour supprimer un bien 
    app.get('/admin/realtyList/delete/:id', (req, res) => {
        repoRealtyList.deleteRealty(req, res);
    })
    //route pour accéder au formulaire de modification d'un bien
    app.get('/admin/realtyList/modify/:id', (req, res) => {
        repoRealtyList.printModifyForm(req, res)
    })

    // gestion du formulaire de modification des biens
    app.post('/admin/modifyRealty/:id', (req, res) => {
        repoRealtyList.updateForm(req, res);
    })
};
