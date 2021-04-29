let User = require('../repository/User');
let Contact = require('../repository/Contact');
let repo = new User();
let repoContact = new Contact();

module.exports = class Admin {
    print(req, res) {
        res.render('admin/dashboard', {
            title: 'TeLoger'
        });
    }

    printUsers(req, res) {
        repo.findAllUsers().then((result) => {
            // console.log(result)
            res.render('admin/users/list', {
                title: 'TeLoger'
                , users: result
            });

        })
    }

    printFormNewUser(req, res) {
        res.render('admin/users/form', {
            title: 'TeLoger'
        });
    }

    deleteUser(req, res) {
        repo.deleteOneUser(req.params.id)
            .then(() => {
                req.flash('notify', 'Utilisateur supprimé');
                res.redirect('/admin/users');
            })
            .catch((err) => {
                console.error(err.message)
            })
    }

    printUpdateForm(req, res) {
        repo.findOneUser(req.params.id)
            .then((result) => {
                // console.log(result)
                res.render('admin/users/form-update', {
                    title: 'TeLoger'
                    , user: result
                });

            });
    }

    processUpdateForm(req, res) {
        let userData = {
            email: req.body.email
            , civility: req.body.civility
            , prenom: req.body.prenom
            , nom: req.body.nom
            , phone: req.body.phone
            , role: req.body.role
        };
        // console.log(req.body)
        repo.updateOneUser(req.params.id, userData).then(() => {
            req.flash('notify', 'élément modifié !!')
            res.redirect('/admin/users')

        }).catch((err) => {
            console.error(err.message)
        });

    }

    printListMsg(req, res) {
        repoContact.findAllMsg().then((result) => {
            res.render('admin/messages/list', {
                title: 'TeLoger'
                , messages: result
            });
        });
    }

    printMsg(req, res) {
        res.render('admin/messages/affichage', {
            title: 'TeLoger'
        })
    }


};