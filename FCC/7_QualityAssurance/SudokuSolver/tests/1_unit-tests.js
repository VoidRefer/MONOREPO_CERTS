const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const validPuzzleStrings = require("../controllers/puzzle-strings.js").puzzlesAndSolutions;

let solver = new Solver();

suite('Unit Tests', () => {
    suite("Sudoku Solver Handler", function () {
        test("Logic handles a valid puzzle string of 81 characters", function () {
            validPuzzleStrings.forEach(puzzle => {
                assert.isTrue(solver.validate(puzzle[0], "The Puzzle string is valid."));
            });
        });
        test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function () {
            const invalidPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.3@.";
            assert.isFalse(solver.validate(invalidPuzzle), "The puzzle string contains invalid characters");
        });
        test("Logic handles a puzzle string that is not 81 characters in length", function () {
            const shortPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....3.7.2..9.47...8..1..16....926914.37.";
            const longPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.758";
            assert.isFalse(solver.validate(shortPuzzle), "The puzzle string is too short.");
            assert.isFalse(solver.validate(longPuzzle), "The puzzle string is too long.");
        });
        test("Logic handles a valid row placement", function () {
            const [puzzle] = validPuzzleStrings[0];
            assert.isTrue(solver.checkRowPlacement(puzzle,"A", 2, 3), "The row placement is valid.");
        });
        test("Logic handles an invalid row placement", function () {
            const [puzzle] = validPuzzleStrings[0];
            assert.isFalse(solver.checkRowPlacement(puzzle,"A", 2, 8), "The row placement is invalid.");
        });
        test("Logic handles a valid column placement", function () {
            const [puzzle] = validPuzzleStrings[0];
            assert.isTrue(solver.checkColPlacement(puzzle,"A", 2, 1), "The col placement is valid.");
        });
        test("Logic handles an invalid column placement", function () {
            const [puzzle] = validPuzzleStrings[0];
            assert.isFalse(solver.checkColPlacement(puzzle,"A", 2, 9), "The col placement is invalid.");
        });
        test("Logic handles a valid region (3x3 grid) placement", function () {
            const [puzzle] = validPuzzleStrings[0];
            assert.isTrue(solver.checkRegionPlacement(puzzle, 'A', 2, 3), "The region placement is valid.");
        });
        test("Logic handles an invalid region (3x3 grid) placement", function () {
            const [puzzle] = validPuzzleStrings[0];
            assert.isFalse(solver.checkRegionPlacement(puzzle, 'A', 2, 6), "The region placement is invalid.");
        });
        test("Valid puzzle strings pass the solver", function () {
            validPuzzleStrings.forEach(([puzzle]) => {
                const solution = solver.solve(puzzle);
                assert.isString(solution, "Solver should return a string.");
                assert.notInclude(solution, '.', "Solved puzzle should not contain empty cells.");
            });
        });
        test("Invalid puzzle strings fail the solver", function () {
            const invalidPuzzle = "82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.55";
            assert.isFalse(solver.solve(invalidPuzzle), "Solver should return false for invalid puzzles.");
        });
        test("Solver returns the expected solution for an incomplete puzzle", function () {
            validPuzzleStrings.forEach(([puzzle, solution]) => {
                const solvedPuzzle = solver.solve(puzzle);
                assert.strictEqual(solvedPuzzle, solution, "Solver should return the correct solution.")
            })
        });
    });

});
