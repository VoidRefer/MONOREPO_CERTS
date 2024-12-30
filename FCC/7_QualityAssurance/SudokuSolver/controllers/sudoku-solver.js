class SudokuSolver {
  rowToNumMap = { a: 1, b:2, c:3, d:4, e:5, f:6, g:7, h:8, i:9};

  validate(puzzleString) {
    // Ensure elements in string are valid
    const validStringRegex = /^[1-9.]{81}$/;
    return validStringRegex.test(puzzleString);
  }

  checkRowPlacement(puzzleString, row, column, value) {
    // Given row, column and value validate from puzzle String
    if ( !/^[a-iA-I]$/.test(row)) {
      return false;
    }
    const rowNum = this.rowToNumMap[row.toLowerCase()]

    // Extract row substring
    const startPos = (rowNum - 1) * 9;
    const rowString = puzzleString.substring(startPos, startPos + 9);

    if (puzzleString[startPos+column-1]===`${value}`) {
      return false
    }

    // Check if value is not already in the row
    return !rowString.includes(`${value}`);
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let i = column-1; i < 81; i += 9) { 
      
      if (puzzleString[i] == value) {
        return false;
      }
    }    
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // Determine starting row and column of the region
    const startRow = Math.floor((this.rowToNumMap[row.toLowerCase()] - 1) / 3) * 3;
    const startCol = Math.floor((column - 1) / 3) * 3;

    // Iterate through the 3x3 grid
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const index = (startRow + r) * 9 + (startCol + c);
        if (puzzleString[index] === `${value}`) return false;      
      }
    }
    return true
  }

  solve(puzzleString) {
  // Validate the puzzle input
  if (!this.validate(puzzleString)) {
    return false;
  }

  // Find the first empty cell
  const emptyCellIndex = puzzleString.indexOf(".");
  if (emptyCellIndex === -1) {
    // No empty cells: verify if the puzzle is fully solved
    return this.validate(puzzleString) ? puzzleString : false;
  }

  // Determine row and column numbers
  const rowNumber = Math.floor(emptyCellIndex / 9);
  const colNumber = (emptyCellIndex % 9) + 1;
  const rowLetter = String.fromCharCode(65 + rowNumber); // Convert 0-based index to 'A'-'I'

  for (let digit = 1; digit <= 9; digit++) {
    // Check if placing the digit is valid
    if (
      this.checkRowPlacement(puzzleString, rowLetter, colNumber, digit) &&
      this.checkColPlacement(puzzleString, rowLetter, colNumber, digit) &&
      this.checkRegionPlacement(puzzleString, rowLetter, colNumber, digit)
    ) {
      // Update the puzzle string with the digit
      const updatedPuzzleString =
        puzzleString.substring(0, emptyCellIndex) +
        digit +
        puzzleString.substring(emptyCellIndex + 1);

      // Recursively solve the updated puzzle
      const solvedPuzzle = this.solve(updatedPuzzleString);

      // Return the solution if found
      if (solvedPuzzle) {
        return solvedPuzzle;
      }
    }
  }

  // If no valid digits work, backtrack
  return false;
}

}

module.exports = SudokuSolver;

