const mongoose = require('mongoose');
// Connection à la BDD
require('../bdd/database')();

//Schéma de données user
const contactSchema = mongoose.Schema({
    email: { type: String }
    , nom: { type: String }
    , date: { type: Date, default: Date.now }
    , textDate: { type: String, default: Date.now }
    , sujet: { type: String }
    , message: { type: String }
    , non_lue: { type: Boolean }

}, { versionKey: false });

module.exports = class Contact {
    constructor() {
        this.db = mongoose.model('contact', contactSchema);
    }

    add(contactData) {
        return new Promise((resolve, reject) => {
            this.db.create(contactData, (err, doc) => {
                if (err) reject(err)
                resolve(doc)
            })
        })
    }
    findAllMsg() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, docs) => {
                if (err) reject(err);
                resolve(docs);
            });
        })
    }

    findOneMsg(id) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ _id: id }, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            });
        });
    }

    updateMsg(id, obj) {
        return new Promise((resolve, reject) => {
            this.db.updateOne({ _id: id }
                , obj
                , (err) => {
                    console.log('élément modifié')
                    if (err) reject(err)
                    resolve() // renvoie une indication de fin de promesse
                })
        })
    }
    countUnreadMsg() {
        return new Promise((resolve, reject) => {
            this.db.aggregate([
                { $match: { non_lue: true } }
                , { $count: "unread" }
            ]
                , (err, doc) => {
                    if (err) reject(err);
                    resolve(doc);
                })
        })
    }
}
