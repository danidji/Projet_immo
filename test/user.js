const assert = require('assert');
const User = require('../src/repository/User');
const Realty = require('../src/repository/Biens');
const repoUser = new User();
const repoRealty = new Realty();


//détermine l'ensemble des tests 
describe('Email présent ou non en base', () => {

    it('Test email présente en base', (done) => {
        let mailTest = "test_admin@test.fr";

        repoUser.findMail(mailTest).then((result) => {

            // console.log(result)
            assert.strictEqual(result.email, mailTest)

            done();
        })

        // console.log(result);
        // assert.ok(true);
    });

    it('Test email non présente en base', (done) => {
        let mailTest = "pasenbase@test.fr";
        // let mailTest = "test_admin@test.fr"

        repoUser.findMail(mailTest).then((result) => {
            // console.log(result);
            assert.ok(!result);

            done();
        });

    });


});

describe("Test de la fonction de recherche d'un bien", () => {
    it("Test recherche d'un bien en fonction de l'id", (done) => {
        let id = '6082cf283b2b675d40dde637';
        // let id = '6082cf283b2b675d40dde63';

        repoRealty.findOneRealty(id).then((result) => {
            console.log(typeof result._id.toString())

            assert.strictEqual(result._id.toString(), id);

            done();
        });

    });
})