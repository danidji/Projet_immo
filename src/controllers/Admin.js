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
        console.log(`Admin -> processUpdateForm -> req.body`, req.body)

        repo.updateOneUser(req.params.id, userData).then(() => {
            req.flash('notify', 'élément modifié !!')
            res.redirect('/admin/users')

        }).catch((err) => {
            console.error(err.message)
        });

    }

    printListMsg(req, res) {
        repoContact.findAllMsg().then((result) => {
            function formatDate(thisDate) {
                let add0 = (nb) => {
                    return nb < 10 ? nb = `0${nb}` : nb;
                };
                let year = thisDate.getFullYear();
                let month = add0(thisDate.getMonth() + 1);
                let day = add0(thisDate.getDate());
                let hours = thisDate.getHours();
                let minutes = thisDate.getMinutes();
                return `le ${day}/${month}/${year} à ${hours}:${minutes}`
            }

            result.map(element => {
                element.txtDate = formatDate(element.date);
                return element;
            });
            console.log(result)

            res.render('admin/messages/list', {
                title: 'TeLoger'
                , messages: result
            });
        });
    }

    printMsg(req, res) {
        console.log(`Admin -> printMsg -> req.params`, req.params)

        repoContact.findOneMsg(req.params.id)
            .then((result) => {
                console.log(`Admin -> .then -> result`, result)

                res.render('admin/messages/affichage', {
                    title: 'TeLoger', msg: result
                })

            }).catch((err) => {
                console.error(err.message)
            })

    }


};