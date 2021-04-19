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

        ).catch((err) => {
            console.error(err.message)
        })
    }
    printModifyForm(req, res) {
        repo.findOneRealty(req.params.id).then((result) => {
            // console.log(result)

            res.render('admin/modify_realty', {
                title: 'TeLoger'
                , session: res.locals.session //=> remettre .users en dehors du dev admin
                , realty: result
            });

        })
    }
    updateForm(req, res) {
        // console.log(req.body)
        let updateData = {
            realtyAdress: {
                sellerName: req.body.seller
                , adress: req.body.adress
                , postalCode: req.body.postalCode
                , city: req.body.city
                , surface: req.body.surface
                , room: req.body.room
                , infosAdress: req.body.infosAdress
            },
            contact: {
                nom: req.body.contactName
                , prenom: req.body.contactFirstName
                , email: req.body.mail
                , phone: req.body.phoneNumber
                , infosContact: req.body.infosContact
            }
        }
        // console.log(req.params.id)
        // console.log(updateData);


        repo.updateOne(req.params.id, updateData).then(
            res.redirect('/admin/realtyList')
        ).catch((err) => {
            console.error(err.message)
        });

    }
}


