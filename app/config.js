if (typeof process.env.PORT == 'undefined') {
    module.exports = require('./config-dev');
} else {
    module.exports = {
        port: process.env.PORT || 3000
        , db: {
            id: process.env.db_id
            , pwd: process.env.db_pwd
            , cluster: process.env.db_cluster
            , dbName: process.env.db_dbname
        }
        , appKey: process.env.appKey
        , userDevAdmin: {
            email: "devAdmin@yooo.univers"
            , pass: "versLinfiniEtLauDela"
            , civility: "male"
            , prenom: "dev"
            , nom: "admin"
            , phone: "0612345678"
        }
        , directory_product_image: __dirname + '/../public/images/realty'
        , smtp: {
            service: 'gmail'
            , auth: {
                user: 'solenhyathepickles@gmail.com'
                , pass: process.env.pass
            }
        }
    }
}