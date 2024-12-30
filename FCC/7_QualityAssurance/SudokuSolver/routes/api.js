'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;

      // Validate required fields
      if (!puzzle || !coordinate || !value) {
        return res.json( {error: "Required field(s) missing"} );
      }

      // Validate puzzle string
      if (!solver.validate(puzzle)) {
        if (puzzle.length !== 81) {
          return res.json( {error: "Expected puzzle to be 81 characters long"} );
        }
        return res.json( {error: "Invalid characters in puzzle"} );
      }

      
      
      // Validate coordinate
      const coordinateRegex = /^[A-I][1-9]$/i;
      if (!coordinateRegex.test(coordinate)) {
        return res.json( {error: "Invalid coordinate"} );
      }

      // Validate value
      if (!/^[1-9]$/.test(value)) {
        return res.json( {error: "Invalid value"} );
      }

      // Convert coordinate to row and column
      const row = coordinate[0].toLowerCase();
      const column = parseInt(coordinate[1], 10);
      const indexPos = (solver.rowToNumMap[row] - 1) * 9 + (column - 1);

      // Perform checks
      const conflicts = [];
      if (puzzle[indexPos] !== value) {
        if (!solver.checkRowPlacement(puzzle, row, column, value)) {
          conflicts.push('row');
        }
        if (!solver.checkColPlacement(puzzle, row, column, value)) {
          conflicts.push('column');
        }
        if (!solver.checkRegionPlacement(puzzle, row, column, value)) {
          conflicts.push('region');
        }
      }
      

      // Return result
      if (conflicts.length > 0) {
        return res.json({ valid: false, conflict: conflicts });
      }
      res.json({ valid: true });
      
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;

      // Validate required field
      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      }

      // Validate puzzle string
      if (!solver.validate(puzzle)) {
        if (puzzle.length !== 81) {
          return res.json({ error: 'Expected puzzle to be 81 characters long' });
        }
        return res.json({ error: 'Invalid characters in puzzle' });
      }

      

      // Attempt to solve the puzzle
      const solution = solver.solve(puzzle);

      // Check if the puzzle can be solved
      if (!solution) {
        return res.json({ error: 'Puzzle cannot be solved' });
      }

      res.json({ solution });
    });
};
