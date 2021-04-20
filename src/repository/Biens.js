const mongoose = require('mongoose');
// Connection à la BDD
require('../bdd/database')();

//Schéma de données propres aux biens 
const realtySchema = mongoose.Schema({
    realtyAdress: {
        sellerName: { type: String }
        , adress: { type: String }
        , postalCode: { type: Number }
        , city: { type: String }
        , surface: { type: String }
        , room: { type: Number }
        , infosAdress: { type: String }
    }
    , contact: {
        nom: {
            type: String, match:
                /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i
        }
        , prenom: {
            type: String, match:
                /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i
        }
        , email: { type: String }
        , phone: {
            type: String, match:
                /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/
        }
        , infosContact: { type: String }
    }
}, { versionKey: false });

module.exports = class Realty {
    constructor() {
        this.db = mongoose.model('realty', realtySchema);
    }

    //Methode d'ajout d'un bien immo
    add(realtyData) {
        return new Promise((resolve, reject) => {
            // console.log(realtyData)
            let status = true;
            this.db.create(realtyData, (err) => {
                console.log('élément ajouté à la bdd');
                if (err) status = false;
            });
            // console.log(status)
        })
    }

    findAllRealty() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, docs) => {
                if (err) reject(err);
                resolve(docs);
            });

        });
    }
    findOneRealty(id) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ _id: id }, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            });
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            this.db.deleteOne({ _id: id }, (err) => {
                console.log('élément supprimé');
                if (err) reject(err)
            })
        })
    }



    updateOne(id, obj) {
        return new Promise((resolve, reject) => {
            this.db.updateOne({ _id: id }
                , obj
                , (err) => {
                    console.log('élément modifié')
                    if (err) reject(err)
                })
        })
    }
}