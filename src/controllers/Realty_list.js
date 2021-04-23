let Realty = require('../repository/Biens');
let repo = new Realty();
let UploadImageRealtyService = require('../services/UploadImageRealty');
// const fs = require('fs');

module.exports = class Biens {
    printRealty(req, res) {

        repo.findAllRealty()
            .then((result) => {
                // console.log(result)
                // console.log(result[0]._id)

                res.render('admin/realtyList', {
                    title: 'TeLoger'
                    , realtyList: result
                });
            })

    }
    deleteRealty(req, res) {
        // console.log('controler delete');
        repo.deleteOneRealty(req.params.id)
            .then(() => {
                req.flash('notify', 'Bien supprimé');
                res.redirect('/admin/realtyList');
            })
            .catch((err) => {
                console.error(err.message)
            })
    }

    printModifyForm(req, res) {
        repo.findOneRealty(req.params.id)
            .then((result) => {
                console.log(result)
                res.render('admin/modify_realty', {
                    title: 'TeLoger'
                    , realty: result
                });

            })
    }
    updateForm(req, res) {
        // console.log('req.body');
        // console.log(req.body)
        let updateData = {
            realtyAdress: {
                sellerName: req.body.seller
                , adress: req.body.adress
                , postalCode: req.body.postalCode
                , city: req.body.city
                , surface: req.body.surface
                , room: req.body.room
                , rent: req.body.rent
                , type_realty: req.body.type_realty
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
        // console.log('--realty_list----');
        // console.log(updateData);

        let photosPathName = [];
        let photos = [];
        // Enregistrement des images
        //Si mon obj req.files n'est pas vide (alors j'ai bien des fichiers d'upload)
        if (typeof req.files != 'undefined' && req.files != null) {

            const UploadImageRealty = new UploadImageRealtyService();

            // Si je ne charge qu'une photo
            if (typeof req.files.photos[0] === 'undefined') {
                //je stocke mon image dans un tableau
                let img = req.files.photos;
                req.files.photos = new Array();
                req.files.photos.push(img);
            }
            //Si mon tableau contient des données
            if (typeof req.files.photos != 'undefined' && req.files.photos.length > 0) {
                // console.log(typeof (req.files.photos));
                // console.log('req.files.photos :');
                // console.log(req.files.photos);

                //Je rajoute ma promesse de déplacement des photos upload
                Object.values(req.files.photos).forEach(file => {
                    photos.push(UploadImageRealty.moveFile(file, req.params.id, photosPathName));
                });


            }
        }
        //On rajoute les url des images dans la bdd

        // console.log('--realty_list----');
        // console.log(updateData);
        // //J'exécute mes déplacements de photo
        Promise.all(photos);

        //je récupère mon tableau de lien enregistré en bdd
        repo.findOneRealty(req.params.id).then((result) => {
            console.log('Old Url_images :', result.url_images);
            console.log('photosPathName : ', photosPathName);
            //je compare mon nouveau tableau avec l'initial
            let verif = false;
            photosPathName.forEach(url => {
                verif = false
                // si une url n'est pas présente je la rajoute à la bdd    
                for (let i in result.url_images) {
                    if (url === result.url_images[i]) {
                        verif = true;
                    }
                }
                if (!verif) {
                    result.url_images.push(url)
                }
                // console.log(`url : ${url} 
                // présente : ${verif}`)

            })
            // console.log('new tab :', result.url_images);

            updateData.url_images = result.url_images;

            repo.updateOneRealty(req.params.id, updateData)

        }).then(() => {
            req.flash('notify', 'élément modifié !!')
            res.redirect('/admin/realtyList')

        }).catch((err) => {
            console.error(err.message)
        });

    }
}


