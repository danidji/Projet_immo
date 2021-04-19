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
        console.log(realtyData)
        let status = true;
        this.db.create(realtyData, (err) => {
            if (err) status = false;
        });
        return status;
    }

}