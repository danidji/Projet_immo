module.exports = (mongoose) => {
    const config = require('../config/config')

    mongoose.connect(`mongodb+srv://danUser:${config.db.pwd}@dancluster0.kouk3.mongodb.net/${config.db.dbName}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));
}