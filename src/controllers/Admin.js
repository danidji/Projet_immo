module.exports = class Admin {
    print(req, res) {
        res.render('dashboard', {
            title: 'TeLoger'
            , session: res.locals.session //=> remmettre .users en dehors du dev admin
        });
    }
};