let Realty = require('../repository/Biens')
let UploadImageRealtyService = require('../services/UploadImageRealty')

module.exports = class Biens {
    print(req, res) {
        res.render('admin/biens', {
            title: 'TeLoger'
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

        repo.add({ realtyAdress, contact }).then((result_id) => {
            console.log('controllers biens.js');
            // console.log(result_id)


            let photos = [];
            // Enregistrement des images
            console.log(req.files)


            if (typeof req.files != 'undefined' && req.files != null) {
                const UploadImageRealty = new UploadImageRealtyService();


                if (typeof req.files.photos != 'undefined' && req.files.photos.length > 0) {

                    Object.values(req.files.photos).forEach(file => {
                        photos.push(UploadImageRealty.moveFile(file, result_id));
                    });
                }

            }
            console.log(photos)
            Promise.all(photos)
        }).then(() => {
            req.flash('notify', 'Bien ajouté à la base');
            res.redirect('/admin/realtyList');
        });

        // // sans l'ajout des photos
        // repo.add({ realtyAdress, contact }).then(() => {
        //     req.flash('notify', 'Bien ajouté à la base');
        //     res.redirect('/admin/realtyList');
        // });

    }
};