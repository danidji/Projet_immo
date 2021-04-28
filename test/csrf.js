// const sinon = require("sinon");
const { doesNotMatch } = require('assert');
const assert = require('assert');
const csrf = require('../src/services/randomTokenCsrf');
let stubReq = {
    session: {}
    , body: {}
};
let stubRes = { locals: {} };

function stubNext() {
    return true
}


describe('test génération et validation token CSRF', () => {
    it('Génération du token', (done) => {

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


        assert.strictEqual(csrf.verify(stubReq, stubRes, () => true), true);
        done();
    })
})