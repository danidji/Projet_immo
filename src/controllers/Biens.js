let Realty = require('../repository/Biens')

module.exports = class Biens {
    print(req, res) {
        res.render('admin/biens', {
            title: 'TeLoger'
            , session: res.locals.session //=> remettre .users en dehors du dev admin
        });
    }

    processForm(req, res) {
        // console.log(req.body);

        let realtyAdress = {
            sellerName: req.body.seller
            , adress: req.body.adress
            , postalCode: req.body.postalCode
            , city: req.body.city
            , surface: req.body.surface
            , room: req.body.room
            , infosAdress: req.body.infosAdress
        };
        let contact = {
            nom: req.body.contactName
            , prenom: req.body.contactFirstName
            , email: req.body.mail
            , phone: req.body.phoneNumber
            , infosContact: req.body.infosContact
        };

        // console.log(realtyAdress)
        let repo = new Realty();

        repo.add({ realtyAdress, contact })

        res.redirect('/admin/realtyList');
    }
};