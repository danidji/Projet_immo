module.exports = class Admin {
    print(req, res) {
        console.log('---admin JS----')
        console.log(res.locals.session)
        res.render('admin/dashboard', {
            title: 'TeLoger'
        });
    }
};