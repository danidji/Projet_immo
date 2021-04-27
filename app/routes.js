//Fichier de gestion des routes
let Home = require('../src/controllers/Home');
let Register = require('../src/controllers/Register');
let Login = require('../src/controllers/Login');
let Logout = require('../src/controllers/logout');
let Admin = require('../src/controllers/Admin');
let Biens = require('../src/controllers/Biens');
let Realty_list = require('../src/controllers/Realty_list');

const csrf = require('../src/services/randomTokenCsrf')


module.exports = (app) => {

    ///// routes vers l'accueil
    app.get('/', (req, res) => {
        (new Home()).print(req, res);

    });
    app.get('/accueil/:slug', (req, res) => {
        (new Home()).print(req, res);
    })
    app.get('/mon-bien/:id', (req, res) => {
        (new Home()).printOneRealty(req, res);
    })

    // routes vers la page d'inscription 
    app.get('/register'
        // , require('../src/services/randomTokenCsrf')-è
        , csrf.generate
        , (req, res) => {
            (new Register()).printForm(req, res);

        });

    // gestion du formulaire post inscription
    app.post('/inscription'
        , csrf.verify
        , (req, res) => {
            (new Register()).processForm(req, res);

        });

    // Création d'une route vers la page de connexion
    app.get('/login'
        , csrf.generate
        , (req, res) => {
            (new Login()).printLogin(req, res);

        });

    // gestion du formulaire post connexion
    app.post('/connexion'
        , csrf.verify
        , (req, res) => {
            (new Login()).processLogin(req, res);
        })
    //route de déconnexion utilisateur
    app.get('/logout', (req, res) => {
        (new Logout()).quitSession(req, res);

    });

    /////////
    // 
    // Gestion des routes de la page admin
    // 
    /////////

    //Controle si admin 

    app.use('/admin', require('../src/services/jwt_controllers'))

    // route vers la page admin
    app.get('/admin/dashboard'
        , (req, res) => {
            (new Admin()).print(req, res);

        });

    // route vers la page biens
    app.get('/admin/biens'
        , csrf.generate
        , (req, res) => {
            (new Biens()).print(req, res);

        });

    //utilisation d'express-fileupload pour le téléchargement de fichier : https://www.npmjs.com/package/express-fileupload
    //                                                                   : https://github.com/richardgirges/express-fileupload/tree/master/example


    // gestion du formulaire des biens immo
    app.post('/admin/biensImmo'
        , csrf.verify
        , require('express-fileupload')({ createParentPath: true })
        , (req, res) => {
            // console.log('Voici ma route !!!!!!!!!');
            // console.log(req.files);
            (new Biens()).processForm(req, res);

        });


    let repoRealtyList = new Realty_list();

    // routes vers la liste des biens 
    app.get('/admin/realtyList'
        , (req, res) => {
            repoRealtyList.printRealty(req, res);
        })

    // routes pour supprimer un bien 
    app.get('/admin/realtyList/delete/:id'
        , (req, res) => {
            // console.log('route delete');
            repoRealtyList.deleteRealty(req, res);
        })
    //route pour accéder au formulaire de modification d'un bien
    app.get('/admin/realtyList/modify/:id'
        , csrf.generate
        , (req, res) => {
            repoRealtyList.printModifyForm(req, res)
        })

    // gestion du formulaire de modification des biens
    app.post('/admin/modifyRealty/:id'
        , csrf.verify
        , require('express-fileupload')({ createParentPath: true })
        , (req, res) => {
            repoRealtyList.updateForm(req, res);
        })

    // route vers la page utilisateurs
    app.get('/admin/users'
        , (req, res) => {
            (new Admin()).printUsers(req, res);

        });

    // route vers la page biens
    app.get('/admin/users/add'
        , csrf.generate
        , (req, res) => {
            (new Admin()).printFormNewUser(req, res);

        });

    // routes pour supprimer un utilisateur 
    app.get('/admin/users/delete/:id'
        , (req, res) => {
            // console.log('route delete');
            (new Admin()).deleteUser(req, res);
        })
    //route pour modifier un utilisateur
    app.get('/admin/users/update/:id'
        , csrf.generate
        , (req, res) => {
            // console.log('route delete');
            (new Admin()).printUpdateForm(req, res);
        })

    app.post('/admin/users/update/:id'
        , csrf.verify
        , (req, res) => {
            (new Admin()).processUpdateForm(req, res);
        })

    //route de deconnexion admin 
    app.get('/admin/logout_admin'
        , (req, res) => {
            res.redirect('/')
        });

};
