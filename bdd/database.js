module.exports = (mongoose) => {
    const config = require('../config/config')

    mongoose.connect(`mongodb+srv://danUser:${config.db.pwd}@${config.db.cluster}.mongodb.net/${config.db.dbName}`,
        {
            connectTimeoutMS: 3000
            , socketTimeoutMS: 20000
            , useNewUrlParser: true
            , useUnifiedTopology: true
        });

    const db = mongoose.connection;
    db.once('open', () => {
        console.log(`connexion OK !`);
    });


}
