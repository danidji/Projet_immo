let Realty = require('../repository/Biens')
let repo = new Realty()

module.exports = class Biens {
    printRealty(req, res) {

        repo.findAllRealty().then((result) => {
            // console.log(result)
            // console.log(result[0]._id)

            res.render('admin/realtyList', {
                title: 'TeLoger'
                , session: res.locals.session //=> remettre .users en dehors du dev admin
                , realtyList: result
            });
        })

    }
    deleteRealty(req, res) {
        repo.deleteOne(req.params.id).then(

            res.redirect('/admin/realtyList')
            // res.render('admin/realtyList', {
            //     title: 'TeLoger'
            //     , session: res.locals.session //=> remettre .users en dehors du dev admin
            //     , realtyList: result
            // })
        ).catch((err) => {
            console.error(err.message)
        })
    }

}
