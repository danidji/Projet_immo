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

};
