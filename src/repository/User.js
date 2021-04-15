const mongoose = require('mongoose');
// Connection à la BDD
require('../bdd/database')();

//Schéma de données user
const userSchema = mongoose.Schema({
    email: { type: String }
    , pass: { type: String }
    , civility: { type: String }
    , prenom: {
        type: String, match:
            /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i
    }
    , nom: {
        type: String, match:
            /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i
    }
    , phone: {
        type: String, match:
            /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/
    }
    , date: { type: Date, default: Date.now }

}, { versionKey: false })

module.exports = class User {
    constructor() {
        this.db = mongoose.model('user', userSchema); // (nom de la collection, schema utilisé)
    }
    //Methode d'ajout d'utilisateur
    async add(userData) {
        await this.db.create(userData);
        return true
    }
    //Methode qui vérifie si une adresse mail est en base
    async findMail(mail) {
        const docs = await this.db.findOne(
            { email: mail });

        return docs
    }


}


