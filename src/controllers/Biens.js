let Realty = require('../repository/Biens')
let UploadImageRealtyService = require('../services/UploadImageRealty')

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

        // gestion du chargement des images : 
        // WIP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        let photos = [];
        // Enregistrement des images
        if (typeof req.files != 'undefined' && req.files != null) {
            const UploadImageRealty = new UploadImageRealtyService();
            if (typeof req.files.photos != 'undefined' && req.files.photos.length > 0) {

                Object.values(req.files.photos).forEach(file => {
                    photos.push(UploadImageRealty.moveFile(file, idProduct)); //=> d'ou vient le idProduct
                });
            }
        }
        Promise.all(photos)

            .then(() => {
                repo.add({ realtyAdress, contact })
            })
            .then(() => {
                req.flash('notify', 'Bien ajouté à la base');
                res.redirect('/admin/realtyList');
            });
    }
};