const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const validPuzzleStrings = require("../controllers/puzzle-strings.js").puzzlesAndSolutions;

suite('Functional Tests', () => {
    suite("POST /api/solve", function () {
        test("Solve a puzzle with valid puzzle string", function (done) {

            let pending = validPuzzleStrings.length;

            validPuzzleStrings.forEach(([puzzle, solution]) => {
                chai.request(server)
                .post("/api/solve")
                .send( { puzzle } )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.property(res.body, "solution");
                    assert.strictEqual(res.body.solution, solution);
                    
                    pending--;
                    if (pending === 0) done();
                });
            });
        });
        test("Solve a puzzle with missing puzzle string", function (done) {
            chai.request(server)
                .post("/api/solve")
                .send( {} )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, "error", "Required field missing");
                    done();
                });
        });
        test("Solve a puzzle with invalid characters", function (done) {
            const invalidPuzzle = "5..91372.3...8.5.9.9.25..8.68.47.!@...95..46.7.4.....5.2.......4..8916..85.72...3"
            chai.request(server)
                .post("/api/solve")
                .send( { puzzle: invalidPuzzle} )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, "error", "Invalid characters in puzzle");
                    done();
                });
        });
        test("Solve a puzzle with incorrect length", function (done) {
            const shortPuzzle = "5..91372.3...8.5.9.9.25..8.68.47."
            chai.request(server)
                .post("/api/solve")
                .send( { puzzle: shortPuzzle} )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, "error", "Expected puzzle to be 81 characters long");
                    done();
                });
        })
        test("Solve a puzzle that cannot be solved", function (done) {
            const unsolvablePuzzle = "5.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            chai.request(server)
                .post("/api/solve")
                .send( { puzzle: unsolvablePuzzle} )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, "error", "Puzzle cannot be solved");
                    done();
                });
        });
    });

    suite("POST /api/check", function () {
        test("Check a puzzle placement with all fields", function (done) {
            const [puzzle] = validPuzzleStrings[0];
            chai.request(server)
                .post("/api/check")
                .send( { puzzle, coordinate: "A2", value: "3"} )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, "valid", true);
                    done();
                });
        });
        test("Check a puzzle placement with single placement conflict", function (done) {
            const [puzzle] = validPuzzleStrings[0];
            chai.request(server)
                .post("/api/check")
                .send( { puzzle, coordinate: "A2", value: "4"} )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, "valid", false);
                    assert.deepEqual(res.body.conflict, ["row"]);
                    done();
                });
        });
        test("Check a puzzle placement with multiple placement conflicts", function (done) {
            const [puzzle] = validPuzzleStrings[0];
            chai.request(server)
                .post("/api/check")
                .send( { puzzle, coordinate: "A2", value: "6"} )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, "valid", false);
                    assert.deepEqual(res.body.conflict, ["column", "region"]);
                    done();
                });
        });
        test("Check a puzzle placement with all placement conflicts", function (done) {
            const [puzzle] = validPuzzleStrings[0];
            chai.request(server)
                .post("/api/check")
                .send( { puzzle, coordinate: "B1", value: "2"} )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, "valid", false);
                    assert.deepEqual(res.body.conflict, ["row", "column", "region"]);
                    done();
                });
        });
        test("Check a puzzle placement with missing required fields", function (done) {
            const [puzzle] = validPuzzleStrings[0];
            chai.request(server)
                .post("/api/check")
                .send( { puzzle, coordinate: "B1"} )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, "error", "Required field(s) missing");
                    done();
                });
        });
        test("Check a puzzle placement with invalid characters", function (done) {
            const invalidPuzzle = "5..91372.3...8.5.9.9.25..8.68.47.!@...95..46.7.4.....5.2.......4..8916..85.72...3";
            chai.request(server)
                .post("/api/check")
                .send( { puzzle: invalidPuzzle, coordinate: "B1", value: "2"} )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, "error", "Invalid characters in puzzle");
                    done();
                });
            
        });
        test("Check a puzzle placement with incorrect length", function (done) {
            const longPuzzle = "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3..."
            chai.request(server)
                .post("/api/check")
                .send( { puzzle: longPuzzle, coordinate: "B1", value: "2"} )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, "error", "Expected puzzle to be 81 characters long");
                    done();
                });
        });
        test("Check a puzzle placement with invalid placement coordinate", function (done) {
            const [puzzle] = validPuzzleStrings[0];
            chai.request(server)
                .post("/api/check")
                .send( { puzzle, coordinate: "Z8", value: "2"} )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, "error", "Invalid coordinate");
                    done();
                });
        });
        test("Check a puzzle placement with invalid placement value", function (done) {
            const [puzzle] = validPuzzleStrings[0];
            chai.request(server)
                .post("/api/check")
                .send( { puzzle, coordinate: "A8", value: "X"} )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.propertyVal(res.body, "error", "Invalid value");
                    done();
                });
        });
    })
});

