const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String }
    , pass: { type: String }
    , civility: { type: String }
    , prenom: { type: String }
    , nom: { type: String }
    , phone: { type: Number }
})

module.exports = class User {
    constructor() {
        this.db = mongoose.model('user', userSchema); // (nom de la collection, schema utilisé)
    }
    add(userData) {
        this.db.create(userData);
        console.log('Utilisateur ajouté')
    }
}


