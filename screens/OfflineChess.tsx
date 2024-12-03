import {  SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'


import { RootStackParamList } from '../navigation/AppNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Dimensions } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useRoute } from '@react-navigation/native'
import { ThemeContext } from '../Themes/AppContext'
import ChessBoard, { ChessboardRef } from 'react-native-chessboard';
import { style } from 'twrnc'

function extractMoveWithoutChessJS(prevFen, newFen) {
  // Extract board positions from the FEN
  const prevBoard = prevFen.split(" ")[0];
  const newBoard = newFen.split(" ")[0];

  // Split rows into arrays
  const prevRows = prevBoard.split("/");
  const newRows = newBoard.split("/");

  let from = null;
  let to = null;

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
  return from && to ? { from, to } : null;
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




const Width = Dimensions.get('window').width

type LocalGameProps = NativeStackScreenProps<RootStackParamList, 'LocalGame'>

export interface ChessBoardPiece {
  piece: string, pieceColor: string, row: number, column: number, isMoveValid?: boolean
}

const flipBoardForBlack = (fen, color) => {
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

const PlayLocal = ({ navigation }: LocalGameProps) => {
  const route = useRoute().params

  const { socket, theme, toggleTheme } = useContext(ThemeContext);
  const [gameOver, setGameOver] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(''); // Keep track of whose turn it is
  const [playerColor, setPlayerColor] = useState(''); // Set 'white' or 'black' for the user
  const [fenState, setFenState] = useState(playerColor=='black'?"RNBKQBNR/PPPPPPPP/8/8/8/8/pppppppp/rnbkqbnr b KQkq e3 0 1":'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq e3 0 1'); // Initial FEN for the board
  const chessboardRef = useRef<ChessboardRef>(null);

  useEffect(() => {
    (async () => {
      await chessboardRef.current?.move({ from: 'e2', to: 'e4' });
      // await chessboardRef.current?.move({ from: 'e7', to: 'e5' });
      // await chessboardRef.current?.move({ from: 'd1', to: 'f3' });
      // await chessboardRef.current?.move({ from: 'a7', to: 'a6' });
      // await chessboardRef.current?.move({ from: 'f1', to: 'c4' });
      // await chessboardRef.current?.move({ from: 'a6', to: 'a5' });
      // await chessboardRef.current?.move({ from: 'f3', to: 'f7' });
    })();
  }, []);

  const move = (state) => {
    if (playerColor !== currentTurn) {
      alert("Not your turn!");
      return;
    }
    
    // Send move to server via socket
    socket.emit('updateChessState', {state});
  
    // Update turn
    setCurrentTurn(currentTurn === 'white' ? 'black' : 'white');
  };

  useEffect(()=>{
    socket.on('assignColorAndLead',({color,lead})=>{
      setPlayerColor(color)
      setCurrentTurn(lead)
      setFenState(flipBoardForBlack(fenState,color))
      socket.off('assignColorAndLead');
    })
    
  },[])


  useEffect(() => {
    // setFenState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1')
    if (socket) {
      // Listen for chess state updates
      socket.on('gameStart', (gameInfo) => {
        // console.log("gameStart     ",gameInfo)
      })
     
      socket.on('chessStateUpdate', async (state) => {
        console.log('opponent moved')
        await chessboardRef.current?.move({ from: state.from, to: state.to });
        setFenState(state.fen); // Update FEN position
      });

      return () => {
        socket.off('chessStateUpdate');
        socket.off('gameStart')
      };
    }
  }, [socket]);

  return (
    <View style= {[styles.chessboardContainer,
      playerColor === 'black' && styles.flippedBoard,{flex: 1, alignItems: 'center', justifyContent: 'center',backgrounColor:'red',zIndex:20}] }>
      <ChessBoard 
          ref={chessboardRef}
          fen={fenState}
          onMove = {({state}) => {
            // setFen(state.fen); // Update local state with new FEN
            // socket.emit('updateChessState', state); // Emit the move to the opponent
            // move(state)
            // extractMoveWithoutChessJS(fenState,state.fen)
          }}
        />
  </View>

)
}


const styles = StyleSheet.create({
  chessboardContainer: {
    transform: [{ rotate: '0deg' }], // Default for white
  },
  flippedBoard: {
    transform: [{ rotate: '180deg' }], // Rotate 180° for black
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    width: responsiveWidth(84),
    marginVertical: 10,
    borderWidth: 8,
    height: responsiveHeight(48),
    borderRadius: 8,
    borderColor: '#bdbdbd61',
    alignSelf: 'center',
    // marginHorizontal:5
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  promotionPieceContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  promotionContainer: {
    width: 300,
    height: 200,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#bcbdbfdf',
    borderRadius: 20,
  },
  modalHeadingText: {
    padding: 12,
    marginTop: 20,
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  playerCardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    // backgroundColor:'red'
  },
  playerTurnText: {
    color: '#fff',
    fontSize: 16,
    padding: 8,
    fontWeight: 'semibold',
    backgroundColor: '#bdbdbd61',
    elevation: 1,
    borderRadius: 15,
    flexWrap: 'wrap',
    maxWidth: 210,
  },
  lostPieceContainer: {
    width: 345,
    height: 50,
    flexDirection: 'row',
    columnGap: 15,
    rowGap: 2,
    marginBottom: 2,
    paddingHorizontal: 8,
    flexWrap: 'wrap',
    alignSelf: 'center'
  }
})

export default PlayLocal