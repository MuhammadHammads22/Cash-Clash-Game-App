 import {Text, View } from 'react-native'
// ../utils/chess.js or ../utils/chess.ts

// ../utils/chess.js or chess.ts

/**
 * Parses a FEN string and returns the count of each piece for white and black.
 * @param {string} fen - The FEN string representing the current board state.
 * @returns {object} An object containing counts of each piece for white and black.
 */
const countPieces = (fen) => {
  const piecePlacement = fen.split(' ')[0];
  const counts = {
    white: { p: 0, r: 0, n: 0, b: 0, q: 0, k: 0 },
    black: { p: 0, r: 0, n: 0, b: 0, q: 0, k: 0 },
  };
  
  for (const char of piecePlacement) {
    if (char === '/') continue;
    if (/[1-8]/.test(char)) {
      continue; // skip empty squares
    }
    const isWhite = /[A-Z]/.test(char);
    const piece = char.toLowerCase();
    if (isWhite && counts.white[piece] !== undefined) {
      counts.white[piece]++;
    } else if (!isWhite && counts.black[piece] !== undefined) {
      counts.black[piece]++;
    }
  }
  
  return counts;
};

/**
 * Determines the captured pieces by comparing initial and current FEN strings.
 * @param {string} initialFen - The initial FEN string at the start of the game.
 * @param {string} currentFen - The current FEN string after moves.
 * @returns {object} An object containing arrays of captured pieces for white and black.
 */
export const getCapturedPieces = (initialFen, currentFen) => {
  if (!initialFen || !currentFen) {
    console.warn('Initial FEN or Current FEN is undefined');
    return { whiteCaptured: [], blackCaptured: [] };
  }

  const initialCounts = countPieces(initialFen);
  const currentCounts = countPieces(currentFen);
  
  // Calculate captured pieces for white and black
  const whiteCaptured = [];
  const blackCaptured = [];
  
  for (const piece in initialCounts.white) {
    const captured = initialCounts.white[piece] - (currentCounts.white[piece] || 0);
    for (let i = 0; i < captured; i++) {
      whiteCaptured.push(`w${piece}`);
    }
  }

  for (const piece in initialCounts.black) {
    const captured = initialCounts.black[piece] - (currentCounts.black[piece] || 0);
    for (let i = 0; i < captured; i++) {
      blackCaptured.push(`b${piece}`);
    }
  }

  console.log('Captured Pieces:', { whiteCaptured, blackCaptured });
  return { whiteCaptured, blackCaptured };
};











export function mirrorFenState(fen) {
  const [board, sideToMove, castlingRights, enPassant, halfmove, fullmove] = fen.split(' ');

  // Invert the board layout
  const invertedBoard = board.split('/')
    .reverse()  // Reverse the rows
    .map(row => {
      return row.split('').map(char => {
        if (/[a-zA-Z]/.test(char)) {
          // Toggle case for letters (pieces)
          return char === char.toUpperCase()
            ? char.toLowerCase()
            : char.toUpperCase();
        }
        return char;  // Return number as is
      }).join('');
    })
    .join('/');

  // Invert the side to move (swap 'w' and 'b')
  const invertedSideToMove = sideToMove === 'w' ? 'b' : 'w';

  // Flip castling rights (this is done by swapping uppercase and lowercase letters)
  const invertedCastlingRights = castlingRights.split('').map(char => {
    if (/[KQkq]/.test(char)) {
      return char === char.toUpperCase() 
        ? char.toLowerCase() 
        : char.toUpperCase();
    }
    return char;
  }).join('');

  // // Handle en passant (invert if needed, for example, if it's not empty)
  // const invertedEnPassant = enPassant === '-' ? '-' : 
  //   // En passant target squares are mirrored, so we would need to adjust based on your implementation
  //   enPassant[0] + (8 - parseInt(enPassant[1], 10));

  // Return the fully mirrored FEN string
  return `${invertedBoard} ${invertedSideToMove} ${invertedCastlingRights} ${enPassant} ${halfmove} ${fullmove}`;
}





export function extractMoveForBlack(prevFen, newFen) {
  const prevBoard = prevFen.split(" ")[0];  // Get the board from the previous FEN
  const newBoard = newFen.split(" ")[0];    // Get the board from the new FEN

  const prevRows = prevBoard.split("/");
  const newRows = newBoard.split("/");

  let from = '';
  let to = '';

  // Expand FEN row to turn numbers into empty squares
  function expandFENRow(row) {
    return row
      .split("")
      .map((char) => (isNaN(char) ? char : ".".repeat(parseInt(char))))  // Replace numbers with dots
      .join("");
  }

  const expandedPrevRows = prevRows.map(expandFENRow); // Expanded previous board
  const expandedNewRows = newRows.map(expandFENRow);   // Expanded new board

  // Reverse the row index to get Black's perspective (8th rank becomes 1st rank for Black)
  function reverseRowIndex(rowIndex) {
    return 7 - rowIndex;  // Black sees rank 1 as rank 8, etc.
  }

  // Find 'from' and 'to' squares
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const prevSquare = expandedPrevRows[i][j];
      const newSquare = expandedNewRows[i][j];

      // Detect 'from' position where piece was removed (from Black's perspective)
      if (prevSquare !== '.' && newSquare === '.') {
        if (!from) {
          from = `${String.fromCharCode(97 + j)}${8 - reverseRowIndex(i)}`;  // Convert to algebraic notation
        }
      }

      // Detect 'to' position where piece was added (from Black's perspective)
      if (prevSquare !== newSquare && newSquare !== '.') {
        to = `${String.fromCharCode(97 + j)}${8 - reverseRowIndex(i)}`;  // Convert to algebraic notation
      }
    }
  }

  // Validation to ensure we detected valid 'from' and 'to'
  if (!from || !to || from === to) {
    throw new Error("Invalid move detected. Ensure the input FEN states are correct.");
  }

  return { from, to };
}


// export function applyMoveToFEN(currentFen, move) {
//   // Split the FEN string into its components
//   let [board, turn, castling, enPassant, halfmoveClock, fullmoveNumber] = currentFen.split(' ');

//   // Convert the board state into a 2D array (8x8)
//   const rows = board.split('/');
//   const boardState = rows.map(row => {
//     return row.split('').map(char => {
//       if (isNaN(char)) return char; // It's a piece
//       return '.'.repeat(parseInt(char)); // It's a number, represent empty squares
//     }).join('');
//   });

//   // Parse the move in algebraic notation (e.g., "e2e4" or "Ng1f3")
//   const fromSquare = move.slice(0, 2); // e.g., "e2"
//   const toSquare = move.slice(2, 4); // e.g., "e4"
  
//   const fromRow = 8 - parseInt(fromSquare[1]); // Convert row from 1-8 to 0-7 (from White's perspective)
//   const fromCol = fromSquare.charCodeAt(0) - 97; // Convert 'a'-'h' to 0-7

//   const toRow = 8 - parseInt(toSquare[1]); // Convert row from 1-8 to 0-7
//   const toCol = toSquare.charCodeAt(0) - 97; // Convert 'a'-'h' to 0-7
  
//   const piece = boardState[fromRow][fromCol]; // Get the piece being moved
  
//   // Apply the move on the board: remove the piece from the "from" square and place it on the "to" square
//   boardState[fromRow][fromCol] = '.';
//   boardState[toRow][toCol] = piece;

//   // Update the FEN string with the new board state
//   const newBoard = boardState.map(row => {
//     let emptyCount = 0;
//     return row.map(cell => {
//       if (cell === '.') {
//         emptyCount++;
//         return '';
//       } else {
//         const result = emptyCount > 0 ? emptyCount.toString() : '';
//         emptyCount = 0;
//         return cell;
//       }
//     }).join('');
//   }).join('/');
//   console.log('invertedfen')
//   const state=`${newBoard} ${turn} ${castling} ${enPassant} ${halfmoveClock} ${parseInt(fullmoveNumber) + 1}`
//   console.log(state)
//   // Return the updated FEN with the updated board, turn, castling rights, en passant target, etc.
//   return `${newBoard} ${turn} ${castling} ${enPassant} ${halfmoveClock} ${parseInt(fullmoveNumber) + 1}`;
// }



  
/**
 * Extracts the move(s) that transition the chess board from prevFEN to updatedFEN.
 * @param {string} prevFEN - The FEN string of the previous board state.
 * @param {string} updatedFEN - The FEN string of the updated board state.
 * @returns {Object | Object[]} - The move object { from: 'e2', to: 'e4' } or an array of such objects.
 * @throws {Error} - If no valid move can transition prevFEN to updatedFEN.
 */
function extractMove(prevFEN, updatedFEN) {
  // Helper: Convert algebraic notation to board coordinates
  const algebraicToCoords = (sq) => ({
      row: 8 - parseInt(sq[1], 10),
      col: sq.charCodeAt(0) - 'a'.charCodeAt(0)
  });

  // Helper: Convert board coordinates to algebraic notation
  const coordsToAlgebraic = (row, col) => 
      String.fromCharCode('a'.charCodeAt(0) + col) + (8 - row).toString();

  // Helper: Parse FEN into board array and metadata
  const parseFEN = (fen) => {
      const [boardStr, activeColor, castling, enPassant] = fen.split(' ');
      const board = boardStr.split('/').map(rank => {
          const row = [];
          for (let char of rank) {
              if (/\d/.test(char)) {
                  row.push(...Array(parseInt(char, 10)).fill(null));
              } else {
                  row.push(char);
              }
          }
          return row;
      });
      return { board, activeColor, castling, enPassant };
  };

  // Helper: Compare two boards and identify added and removed pieces
  const compareBoards = (prevBoard, updatedBoard) => {
      const added = [];
      const removed = [];
      for (let row = 0; row < 8; row++) {
          for (let col = 0; col < 8; col++) {
              const prev = prevBoard[row][col];
              const updated = updatedBoard[row][col];
              if (prev !== updated) {
                  const square = coordsToAlgebraic(row, col);
                  if (prev && !updated) removed.push({ square, piece: prev });
                  if (!prev && updated) added.push({ square, piece: updated });
                  if (prev && updated && prev !== updated) {
                      removed.push({ square, piece: prev });
                      added.push({ square, piece: updated });
                  }
              }
          }
      }
      return { added, removed };
  };

  // Helper: Detect Castling
  const detectCastling = (prev, updated, diffs) => {
      const castlingMoves = {
          'e1g1': { from: 'e1', to: 'g1' }, // White King-side
          'e1c1': { from: 'e1', to: 'c1' }, // White Queen-side
          'e8g8': { from: 'e8', to: 'g8' }, // Black King-side
          'e8c8': { from: 'e8', to: 'c8' }  // Black Queen-side
      };
      for (let move in castlingMoves) {
          const moveObj = castlingMoves[move];
          const { from, to } = moveObj;
          const kingMoved = diffs.removed.find(p => p.square === from && /K|k/.test(p.piece));
          const kingArrived = diffs.added.find(p => p.square === to && /K|k/.test(p.piece));
          if (kingMoved && kingArrived) return moveObj;
      }
      return null;
  };

  // Helper: Detect En Passant
  const detectEnPassant = (prev, updated, diffs) => {
      if (!prev.enPassant) return null;
      const addedPawn = diffs.added.find(p => /P|p/.test(p.piece));
      const removedPawn = diffs.removed.find(p => /P|p/.test(p.piece));
      if (addedPawn && removedPawn) {
          const addedCoords = algebraicToCoords(addedPawn.square);
          const direction = prev.activeColor === 'w' ? 1 : -1;
          const capturedSquare = coordsToAlgebraic(addedCoords.row + direction, addedCoords.col);
          const isCaptured = diffs.removed.some(p => p.square === capturedSquare && /p|P/.test(p.piece));
          if (isCaptured) {
              return { from: removedPawn.square, to: addedPawn.square };
          }
      }
      return null;
  };

  // Helper: Detect Promotion
  const detectPromotion = (prev, updated, diffs) => {
      if (diffs.added.length !== 1 || diffs.removed.length !== 1) return null;
      const added = diffs.added[0];
      const removed = diffs.removed[0];
      const promotionRanks = { 'w': '8', 'b': '1' };
      if (added.square[1] !== promotionRanks[prev.activeColor]) return null;
      if (!/[QRBN]/.test(added.piece)) return null;
      return { from: removed.square, to: added.square, promotion: added.piece.toLowerCase() };
  };

  // Helper: Detect Normal Move or Capture
  const detectNormalMove = (prev, updated, diffs) => {
      const possibleMoves = [];
      diffs.added.forEach(added => {
          diffs.removed.forEach(removed => {
              // Ensure the piece colors match
              const piece = prev.board[algebraicToCoords(removed.square).row][algebraicToCoords(removed.square).col];
              if (prev.activeColor === 'w' ? /[A-Z]/.test(piece) : /[a-z]/.test(piece)) {
                  // Determine if it's a promotion
                  const promotion = /[QRBN]/.test(added.piece) && 
                      ((prev.activeColor === 'w' && added.square[1] === '8') ||
                       (prev.activeColor === 'b' && added.square[1] === '1')) 
                      ? added.piece.toLowerCase() 
                      : null;
                  const moveObj = { from: removed.square, to: added.square };
                  if (promotion) moveObj.promotion = promotion;
                  possibleMoves.push(moveObj);
              }
          });
      });
      // Remove duplicates
      const uniqueMoves = [];
      const seen = new Set();
      for (let move of possibleMoves) {
          const key = move.from + move.to + (move.promotion || '');
          if (!seen.has(key)) {
              seen.add(key);
              uniqueMoves.push(move);
          }
      }
      return uniqueMoves;
  };

  // Main Logic
  const prev = parseFEN(prevFEN);
  const updated = parseFEN(updatedFEN);
  const diffs = compareBoards(prev.board, updated.board);

  // No differences
  if (diffs.added.length === 0 && diffs.removed.length === 0) {
      throw new Error('No differences found between the FENs.');
  }

  // Detect Castling
  const castlingMove = detectCastling(prev, updated, diffs);
  if (castlingMove) return castlingMove;

  // Detect En Passant
  const enPassantMove = detectEnPassant(prev, updated, diffs);
  if (enPassantMove) return enPassantMove;

  // Detect Promotion
  const promotionMove = detectPromotion(prev, updated, diffs);
  if (promotionMove) return promotionMove;

  // Detect Normal Move or Capture
  const normalMoves = detectNormalMove(prev, updated, diffs);
  if (normalMoves.length === 1) return normalMoves[0];
  if (normalMoves.length > 1) return normalMoves;

  // If no move detected
  throw new Error('Unable to determine the move from the given FENs.');
}


export function extractMoveWithoutChessJS(prevFen, newFen) {
  const prevBoard = prevFen.split(" ")[0];
  const newBoard = newFen.split(" ")[0];
  const prevRows = prevBoard.split("/");
  const newRows = newBoard.split("/");

  let from = '';
  let to = '';
  let fromPiece = '';
  let toPiece = '';
  
  function expandFENRow(row) {
    return row
      .split("")
      .map((char) => (isNaN(char) ? char : ".".repeat(parseInt(char))))
      .join("");
  }

  const expandedPrevRows = prevRows.map(expandFENRow);
  const expandedNewRows = newRows.map(expandFENRow);

  let moveDetected = false;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const prevSquare = expandedPrevRows[i][j];
      const newSquare = expandedNewRows[i][j];
      
      // Detect the 'from' position: a piece is here in the previous state and is now missing in the new state
      if (prevSquare !== '.' && newSquare === '.') {
        if (!from) {
          from = `${String.fromCharCode(97 + j)}${8 - i}`;
          fromPiece = prevSquare;
          moveDetected = true;
        }
      }
      
      // Detect the 'to' position: a piece appears here in the new state that wasn't there in the previous state
      if (prevSquare !== newSquare && newSquare !== '.') {
        to = `${String.fromCharCode(97 + j)}${8 - i}`;
        toPiece = newSquare;
      }
    }
  }

  // Ensure that we only detected one valid move
  if (!moveDetected || !from || !to || from === to) {
    throw new Error("Invalid move detected. Ensure the input FEN states are correct.");
  }

  // Handle the case where a pawn moves two squares forward (like e7 to e5)
  if (fromPiece.toLowerCase() === 'p' && to[1] === String(parseInt(from[1]) + 2)) {
    // Check if the pawn moved 2 squares and it's on the same file
    if (from[0] === to[0] && Math.abs(parseInt(from[1]) - parseInt(to[1])) === 2) {
      // Ensure we treat it as a valid pawn double-step move
      return { from, to, fromPiece, toPiece: '.' };  // Pawn advance, no capture
    }
  }

  return { from, to, fromPiece, toPiece };
}


