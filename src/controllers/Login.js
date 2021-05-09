const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cookies = require("cookies");
const crypto = require('crypto');

const User = require('../repository/User');
const ForgottenPassword = require('../repository/ForgottenPassword');
const MailerService = require('../services/Mailer.js');

const config = require('../../app/config')
const repoPassword = new ForgottenPassword();
const repoUser = new User()


module.exports = class Login {
    printLogin(req, res) {
        res.render('authentification/login', {
            title: 'TeLoger'
        });
    }

    async processLogin(req, res) {
        //On récupère les infos du form post 

        let userLogin = {
            email: req.body.email
            , pass: req.body.pass
        };

        // console.log(userLogin);

        // vérifier si l'email et le mot de passe sont bien présent en bdd 

        const verifMail = await repoUser.findMail(userLogin.email);
        // console.log(verifMail)
        //si le mail tapé est résent en base alors je controle si le mdp est correct 
        if (verifMail !== null) {

            // on décrypte le mdp puis on le compare avec le mdp saisie par l'utilisateur 
            let verifPwd = bcrypt.compareSync(userLogin.pass, verifMail.pass)

            // Si le mail et le mdp est correct on redirige vers la page d'accueil
            if (verifPwd) {

                //Création d'un token JWT : https://docs.google.com/document/d/1C_EqHLWobcBBUWg93xZQ2worj_UQib25MeqV5QCGplo/edit#
                let accessToken = jwt.sign({

                    username: verifMail.email
                    , firstname: verifMail.nom
                    , lastname: verifMail.prenom
                    , role: verifMail.role
                }, config.appKey, { expiresIn: 604800 });
                new Cookies(req, res).set('access_token', accessToken, { httpOnly: true, secure: false });


                req.flash('notify', 'Vous êtes connecté !');
                // on stocke les données utilsateur en session => on utilise un token JWT pour la connexion
                // req.session.users = verifMail;

                res.redirect(`/accueil/${verifMail.slug}`);
            } else {

                req.flash('error', 'Le mot de passe est incorrect');
                res.redirect('/login');
            }

        }
        // Si l'email est incorrect on affiche un msg d'erreur 
        else {

            req.flash('error', "L'email n'existe pas en base.");
            res.redirect('/login');
        }

    }

    printPasswordForget(req, res) {
        res.render('authentification/passwordForget', { title: 'TeLoger' })
    }

    processPasswordForget(req, res, app) {
        let mailer = new MailerService();
        let email = req.body.email;

        let newPasswordData = {
            email: email
            , token: crypto.createHash('sha1').update(`${new Date().toDateString()}${Math.random()}`).digest('hex')
        };

        repoPassword.add(newPasswordData).then((result) => {

            // console.log("🚀 Login ~ result", result);

            // On génére le mail
            app.render('mails/regenerate_password.pug', { pass: result }, (err, html) => {

                // On vérifie si l'adresse email existe dans notre NDD
                // console.log('html:', html);
                (new User()).findMail(email).then((result) => {
                    console.log(`Login -> app.render -> html`, html)
                    // si l'email existe
                    if (result) {
                        // on envoi le mail
                        mailer.send(email, 'Mot de passe oublié', html);
                    }
                    // Dans tout les cas on met une flashbag et une redirection
                    req.flash('notify', 'Un mail vous a été envoyé.');
                    res.redirect('/');
                });
            });
        })

    }

    printNewPassword(req, res) {
        repoPassword.findOneRequest(req.params.token).then((result) => {
            // console.log(result)
            if (result) {
                let today = new Date()
                let timeDiff = today.getTime() - result.date.getTime()
                //              v--- 30min
                if (timeDiff < 1800000) {

                    res.render('authentification/new-password', { title: 'TeLoger', pass: result })
                } else {
                    res.send('Demande échoué - refaire une demande')
                }

            } else {
                res.send('Email non reconnu')
            }

        })
    }

    processNewPassword(req, res) {

        // console.log(req.params)
        repoPassword.findOneRequest(req.params.token)
            .then((result) => {
                repoUser.findMail(result.email)
                    .then((result) => {
                        let newPwd = req.body.pass

                        let salt = bcrypt.genSaltSync(10);
                        //   v--mdp crypter                  v-- mdp à crypter
                        let passwordHash = bcrypt.hashSync(newPwd, salt);


                        // console.log(newPwd)
                        // console.log(passwordHash);
                        repoUser.updateOneUser(result._id, { pass: passwordHash }).then(() => {
                            repoPassword.deleteOneRequest(req.params.token)
                        })
                            .then(() => {

                                req.flash('notify', 'Mot de passe modifié');
                                res.redirect('/login');
                            })
                    })
            })

    }


};
