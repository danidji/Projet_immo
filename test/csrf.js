// const sinon = require("sinon");
const { doesNotMatch } = require('assert');
const assert = require('assert');
const csrf = require('../src/services/randomTokenCsrf');

//On génère des variables représentant une (req,res)http de manière fictive, on pourra ainsi les passer en paramètre de nos fonction generate et verify
let stubReq = {
    session: {}
    , body: {}
};
let stubRes = { locals: {} };


describe('test génération et validation token CSRF', () => {
    it('Génération du token', (done) => {
        //                                    v--- représente le next (fct qui ne renvoie rien)
        csrf.generate(stubReq, stubRes, () => { });
        // console.log(typeof stubReq.session.token)
        assert.notStrictEqual(typeof stubReq.session.token, 'undefined');
        assert.notStrictEqual(typeof stubRes.locals.token_csrf, 'undefined');
        assert.strictEqual(stubReq.session.token, stubRes.locals.token_csrf);

        done();
    })

    it('Vérification du token', (done) => {
        stubReq.body = { csrf: stubRes.locals.token_csrf };
        // console.log(stubReq)
        // console.log('test', csrf.verify(stubReq, stubRes, () => true));

        //                                                     v-- représente le next (fct qui renvoie true)
        assert.strictEqual(csrf.verify(stubReq, stubRes, () => true), true);
        done();
    })
})