//Fichier de gestion des routes
let Home = require('../src/controllers/Home');
let Register = require('../src/controllers/Register');
let Login = require('../src/controllers/Login');
let Logout = require('../src/controllers/logout');
let Admin = require('../src/controllers/Admin');
let Biens = require('../src/controllers/Biens');
let Realty_list = require('../src/controllers/Realty_list');



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

    /////////
    // 
    // Gestion des routes de la page admin
    // 
    /////////

    //Controle si admin 

    app.use('/admin', require('../src/services/jwt_controllers'))

    // route vers la page admin
    app.get('/admin/dashboard'
        // , require('../src/services/jwt_controllers')
        , (req, res) => {
            (new Admin()).print(req, res);

        });

    // route vers la page biens
    app.get('/admin/biens'
        // , require('../src/services/jwt_controllers')
        , (req, res) => {
            (new Biens()).print(req, res);

        });

    //utilisation d'express-fileupload pour le téléchargement de fichier : https://www.npmjs.com/package/express-fileupload
    //                                                                   : https://github.com/richardgirges/express-fileupload/tree/master/example


    // gestion du formulaire des biens immo
    app.post('/admin/biensImmo'
        , require('express-fileupload')({ createParentPath: true })
        // , require('../src/services/jwt_controllers')
        , (req, res) => {
            // console.log('Voici ma route !!!!!!!!!');
            // console.log(req.files);
            (new Biens()).processForm(req, res);

        });


    let repoRealtyList = new Realty_list();

    // routes vers la liste des biens 
    app.get('/admin/realtyList'
        // , require('../src/services/jwt_controllers')
        , (req, res) => {
            repoRealtyList.printRealty(req, res);
        })

    // routes pour supprimer un bien 
    app.get('/admin/realtyList/delete/:id'
        // , require('../src/services/jwt_controllers')
        , (req, res) => {
            // console.log('route delete');
            repoRealtyList.deleteRealty(req, res);
        })
    //route pour accéder au formulaire de modification d'un bien
    app.get('/admin/realtyList/modify/:id'
        // , require('../src/services/jwt_controllers')
        , (req, res) => {
            repoRealtyList.printModifyForm(req, res)
        })

    // gestion du formulaire de modification des biens
    app.post('/admin/modifyRealty/:id'
        , require('express-fileupload')({ createParentPath: true })
        // , require('../src/services/jwt_controllers')
        , (req, res) => {
            repoRealtyList.updateForm(req, res);
        })

    // route vers la page utilisateurs
    app.get('/admin/users'
        // , require('../src/services/jwt_controllers')
        , (req, res) => {
            (new Admin()).printUsers(req, res);

        });

    // route vers la page biens
    app.get('/admin/users/add'
        // , require('../src/services/jwt_controllers')
        , (req, res) => {
            (new Admin()).printFormNewUser(req, res);

        });

    // routes pour supprimer un utilisateur 
    app.get('/admin/users/delete/:id'
        // , require('../src/services/jwt_controllers')
        , (req, res) => {
            // console.log('route delete');
            (new Admin()).deleteUser(req, res);
        })
    //route pour modifier un utilisateur
    app.get('/admin/users/update/:id'
        // , require('../src/services/jwt_controllers')
        , (req, res) => {
            // console.log('route delete');
            (new Admin()).printUpdateForm(req, res);
        })

    app.post('/admin/users/update/:id', (req, res) => {
        (new Admin()).processUpdateForm(req, res);
    })

    //route de deconnexion admin 
    app.get('/admin/logout_admin'
        // , require('../src/services/jwt_controllers')
        , (req, res) => {
            res.redirect('/')
        });

};
