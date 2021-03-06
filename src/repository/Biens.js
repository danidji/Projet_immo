const mongoose = require('mongoose');
// Connection à la BDD
require('../bdd/database')();
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

//Schéma de données propres aux biens 
const realtySchema = mongoose.Schema({
    realtyAdress: {
        sellerName: { type: String }
        , adress: { type: String }
        , postalCode: { type: Number }
        , city: { type: String }
        , surface: { type: String }
        , room: { type: Number }
        , rent: { type: Number }
        , type_realty: { type: String }
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
    , url_images: { type: Array }
    , slug: { type: String, slug: ["realtyAdress.type_realty", "realtyAdress.surface", "realtyAdress.postalCode",], unique: true }
}, { versionKey: false });

module.exports = class Realty {
    constructor() {
        this.db = mongoose.model('realty', realtySchema);
    }

    //Methode d'ajout d'un bien immo
    add(realtyData) {
        return new Promise((resolve, reject) => {
            this.db.create(realtyData, (err, doc) => {
                if (err) reject(err)
                resolve(doc)
            });
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
    deleteOneRealty(id) {
        return new Promise((resolve, reject) => {
            this.db.deleteOne({ _id: id }, (err) => {
                if (err) reject(err)
                resolve();
            })
        })
    }

    updateOneRealty(id, obj) {
        return new Promise((resolve, reject) => {
            this.db.updateOne({ _id: id }
                , obj
                , (err) => {
                    if (err) reject(err)
                    resolve() // renvoie une indication de fin de promesse
                })
        })
    }
}