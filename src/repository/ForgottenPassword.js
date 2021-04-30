const mongoose = require('mongoose');
// Connection à la BDD
require('../bdd/database')();

const newPasswordSchema = mongoose.Schema({
    email: { type: String }
    , token: { type: String }
    , date: { type: Date, default: Date.now }

}, { versionKey: false });

module.exports = class ForgottenPassword {
    constructor() {
        this.db = mongoose.model('forgotten-password', newPasswordSchema);
    }

    add(requestPasswordData) {
        return new Promise((resolve, reject) => {
            this.db.create(requestPasswordData, (err, doc) => {
                // console.log('élément ajouté à la bdd');
                if (err) reject(err)
                // console.log(doc)
                resolve(doc)
            })
        })
    }

    findOneRequest(token) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ token: token }, (err, doc) => {
                if (err) reject(err);
                // console.log('élément trouvé en base');
                resolve(doc);
            });
        });
    }

    deleteOneRequest(token) {
        return new Promise((resolve, reject) => {
            this.db.deleteOne({ token: token }, (err) => {
                console.log('élément supprimé');
                if (err) reject(err)
                resolve();
            })
        })
    }
}