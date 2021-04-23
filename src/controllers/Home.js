let Realty = require('../repository/Biens');
let repo = new Realty();

module.exports = class Home {
    print(req, res) {

        // affichage des informations de ma base 
        repo.findAllRealty().then((result) => {

            console.log('mes biens : ', result)
            res.render('home', {
                title: 'TeLoger'
                , realties: result
            });
        })
    }
    printOneRealty(req, res) {
        repo.findOneRealty(req.params.id).then((result) => {
            console.log('mon bien : ', result)
            res.render('mon-bien', {
                title: 'TeLoger'
                , realties: result
            });
        })
    }

};
