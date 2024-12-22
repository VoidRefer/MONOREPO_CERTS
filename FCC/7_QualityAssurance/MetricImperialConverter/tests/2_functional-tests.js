const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite("GET /api/convert => conversion results", function () {

        // #1: Convert a valid input
        test("Convert a valid input such as 10L", function (done) {
            chai.request(server)
            .get("/api/convert?input=10L")
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 10);
                assert.equal(res.body.initUnit, "L");
                assert.equal(res.body.returnUnit, "gal");
                assert.approximately(res.body.returnNum, 2.64172, 0.00001);
                done();
            });
        });

        // #2: Convert an invalid input
        test("Convert an invalid input such as 32g", function (done) {
            chai.request(server)
            .get("/api/convert?input=32g")
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body, "invalid unit")
                done();
            });
        });

        // #3: Convert an invalid number
        test("Convert an invalid number such as 3/7.2/4kg", function (done) {
            chai.request(server)
                .get('/api/convert?input=3/7.2/4kg')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body, 'invalid number');
                    done();
            });
        });

        // #4: Convert an invalid number AND unit
        test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', function (done) {
            chai.request(server)
                .get('/api/convert?input=3/7.2/4kilomegagram')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body, 'invalid number and unit');
                    done();
            });
        });

        // #5: Convert with no number
        test('Convert with no number such as kg: GET request to /api/convert', function (done) {
            chai.request(server)
                .get('/api/convert?input=kg')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.initNum, 1); // Defaults to 1
                    assert.equal(res.body.initUnit, 'kg');
                    assert.equal(res.body.returnUnit, 'lbs');
                    assert.approximately(res.body.returnNum, 2.20462, 0.0001);
                    done();
                });
        });
    });
});
