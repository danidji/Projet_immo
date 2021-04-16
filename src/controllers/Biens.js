module.exports = class Biens {
    print(req, res) {
        res.render('admin/biens', {
            title: 'TeLoger'
            , session: res.locals.session //=> remmettre .users en dehors du dev admin
        });
    }

    async processForm(req, res) {
        // console.log(req.body);

        let realtyData = {
            adress: req.body.adress
            , postalCode: req.body.postalCode
            , city: req.body.city
            , infosAdress: req.body.infoAdress
            , contactName: req.body.contactName
            , contactFirstName: req.body.contactFirstName
            , mail: req.body.mail
            , phoneNumber: req.body.phoneNumber
            , infosContact: req.body.infoContact
        }

        // console.log(realtyData)


        res.redirect('/biens');
    }
};