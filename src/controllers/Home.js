module.exports = class Home {
    print(req, res) {
        res.render('home', {
            title: 'TeLoger'
            , session: res.locals.session //=> remmettre .users en dehors du dev admin
        });
    }
};
