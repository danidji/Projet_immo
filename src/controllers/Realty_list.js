let Realty = require('../repository/Biens')

module.exports = class Biens {
    print(req, res) {

        (new Realty()).findAllRealty().then((result) => {
            console.log(result)

            res.render('admin/realtyList', {
                title: 'TeLoger'
                , session: res.locals.session //=> remettre .users en dehors du dev admin
                , realtyList: result
            });
        })

    }

}
