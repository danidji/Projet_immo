module.exports = class Logout {
    quitSession(req, res) {

        req.session.users = null;
        // console.log(res.locals.session);

        res.render('home', {
            title: 'TeLoger'
            , session: res.locals.session.users //=> remmettre .users en dehors du dev admin
        });
    }
};
