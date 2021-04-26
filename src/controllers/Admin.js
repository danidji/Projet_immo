let User = require('../repository/User');
let repo = new User();

module.exports = class Admin {
    print(req, res) {
        res.render('admin/dashboard', {
            title: 'TeLoger'
        });
    }

    printUsers(req, res) {
        repo.findAllUsers().then((result) => {
            console.log(result)
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
};