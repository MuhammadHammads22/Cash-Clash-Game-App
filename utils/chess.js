export function extractMoveWithoutChessJS(prevFen, newFen) {
    // Extract board positions from the FEN
    const prevBoard = prevFen.split(" ")[0];
    const newBoard = newFen.split(" ")[0];
  
    // Split rows into arrays
    const prevRows = prevBoard.split("/");
    const newRows = newBoard.split("/");
  
    let from = '';
    let to = '';
  
    // Iterate through the rows
    for (let i = 0; i < 8; i++) {
      const prevRow = expandFENRow(prevRows[i]);
      const newRow = expandFENRow(newRows[i]);
  
      // Compare columns in each row
      for (let j = 0; j < 8; j++) {
        if (prevRow[j] !== newRow[j]) {
          if (prevRow[j] !== ".") {
            from = `${String.fromCharCode(97 + j)}${8 - i}`; // 'a'-'h' for columns, '8'-'1' for rows
          }
          if (newRow[j] !== ".") {
            to = `${String.fromCharCode(97 + j)}${8 - i}`;
          }
        }
      }
    }
  
    // Return the detected move
    return  { from, to } 
  }
  
  // Helper function to expand FEN row notation (e.g., '8' -> '........', '3p4' -> '...p....')
  function expandFENRow(row) {
    return row
      .split("")
      .map((char) =>
        isNaN(char) ? char : ".".repeat(parseInt(char))
      )
      .join("");
  }



  export const flipBoardForBlack = (fen, color) => {
    if (color === 'black') {
      // Flip the FEN string: reverse the ranks
      const fenParts = fen.split(' '); // Split FEN into position and game details
      const board = fenParts[0].split('/'); // Get the board position (before the space)
  
      // Reverse the ranks and swap case for black player
      const flippedBoard = board.reverse().map(rank => {
        return rank.split('').reverse().join('');
      });
  console.log('inverted for black',flippedBoard.join('/') + ' ' + fenParts.slice(1).join(' '))
      // Join the flipped ranks and return the new FEN with 'b' or 'w' to move
      return flippedBoard.join('/') + ' ' + fenParts.slice(1).join(' '); // Add 'w' or 'b' to move (from original FEN);
    }
    
    // For white player, return the original FEN
    console.log('not inverted for white',fen)
    return fen;
  };