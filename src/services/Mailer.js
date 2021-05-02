const nodemailer = require('nodemailer'); // doc : https://nodemailer.com/about/
const config = require('../../app/config');

module.exports = class Mailer {
    constructor() {
        this.mailer = nodemailer.createTransport(config.smtp);
    }

    send(to, subject, html, from = `<${config.smtp.auth.user}>`) {
        return new Promise((resolve, reject) => {
            this.mailer.sendMail({ to, subject, html, from }, function (error, info) {
                if (error) reject(error);
                else resolve();
            });
        });
    }
}
