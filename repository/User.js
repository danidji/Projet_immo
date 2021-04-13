const mongoose = require('mongoose');

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
    add(userData) {
        this.db.create(userData);
        console.log('Utilisateur ajouté')
    }
}


