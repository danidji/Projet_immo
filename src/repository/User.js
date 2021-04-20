const mongoose = require('mongoose');
// Connection à la BDD
require('../bdd/database')();

//utilisation de slug, voici la doc : https://www.npmjs.com/package/mongoose-slug-updater

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

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
    , slug: { type: String, slug: ["nom", "prenom"] }

}, { versionKey: false });

module.exports = class User {
    constructor() {
        this.db = mongoose.model('user', userSchema); // (nom de la collection, schema utilisé)
    }
    //Methode d'ajout d'utilisateur
    async add(userData) {
        let status = true;
        await this.db.create(userData, (err) => {
            if (err) status = false;
            console.log('Utilisateur ajouté en base');
        });
        return status;
    }
    //Methode qui vérifie si une adresse mail est en base
    async findMail(mail) {
        const docs = await this.db.findOne(
            { email: mail });

        return docs
    }


}


