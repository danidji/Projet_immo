let Contact = require('../repository/Contact');
let repoContact = new Contact();

module.exports = (req, res, next) => {


    repoContact.countUnreadMsg().then((result) => {
        console.log(`repoContact.countUnreadMsg -> result`, result)
        let nb = 0;
        if (result[0] !== undefined) {
            nb = result[0].unread;
        }
        req.session.nbMsg = nb;

        next();
    })
}