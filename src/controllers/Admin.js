module.exports = class Admin {
    print(req, res) {
        console.log('---admin JS----')
        console.log(res.locals.session)
        res.render('admin/dashboard', {
            title: 'TeLoger'
            , session: res.locals.session.users //=> remmettre .users en dehors du dev admin
        });
    }
};