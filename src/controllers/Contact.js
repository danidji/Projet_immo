let Contact = require('../repository/Contact');
let repo = new Contact();



module.exports = class Contact {
    print(req, res) {
        res.render('contact', { title: 'TeLoger' });
    }

    processForm(req, res) {
        let contactData = {
            email: req.body.email
            , nom: req.body.nom
            , sujet: req.body.sujet
            , message: req.body.message
            , non_lue: true
        }
        repo.add(contactData).then(() => {
            req.flash('notify', 'Votre message est bien envoyé !');
            res.redirect(`/contact`);
        })
    }


}