module.exports = class Admin {
    print(req, res) {
        res.render('admin/dashboard', {
            title: 'TeLoger'
        });
    }
};