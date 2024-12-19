// PlayLocal.js
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import ChessBoard, { ChessboardRef } from 'react-native-chessboard';
import Toast from 'react-native-toast-message';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

import { RootStackParamList } from '../navigation/AppNavigator';
import { ThemeContext } from '../Themes/AppContext';
import { setInitialFen, setMyTurn } from '../slices/matchSlice';
import { PieceType } from 'react-native-chessboard/lib/typescript/types';
import emptyProfile from '../assets/images/profileEmpty.jpg';
import { getCapturedPieces } from '../utils/chess'; // Ensure this function is correctly implemented

// Configure Reanimated Logger (if necessary)
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

const Width = Dimensions.get('window').width;

type LocalGameProps = NativeStackScreenProps<RootStackParamList, 'LocalGame'>;

export interface ChessBoardPiece {
  piece: string;
  pieceColor: string;
  row: number;
  column: number;
  isMoveValid?: boolean;
}

const PlayLocal = ({ navigation }: LocalGameProps) => {
  const route = useRoute().params;
  const dispatch = useDispatch();

  // Select necessary state from Redux
  const { token, userData } = useSelector((state) => state.user);
  const { 
    matchId, 
    initialFen, 
    player, 
    isMyTurn, 
    opponentInfo,
    game_over,
    in_check,
    in_checkmate,
    in_draw,
    in_promotion,
    in_stalemate,
    in_threefold_repetition,
    insufficient_material 
  } = useSelector((state) => state.match);
  
  const { socket, theme, toggleTheme } = useContext(ThemeContext);
  
  // State for captured pieces
  const [blackCaptured, setBlackCaptured] = useState<string[]>([]);
  const [whiteCaptured, setWhiteCaptured] = useState<string[]>([]);
  const [gameOverState, setGameOverState] = useState(false);
  
  // Ref for the chessboard
  const chessboardRef = useRef<ChessboardRef>(null);
  
  // State to store the starting FEN (game start position)
  const [startingFen, setStartingFen] = useState<string>('');

  // Initialize startingFen once when the component mounts
  useEffect(() => {
    if (!startingFen && initialFen) {
      setStartingFen(initialFen);
      console.log('Starting FEN set to:', initialFen);
    }
  }, [initialFen, startingFen]);

  // Function to handle move actions
  const move = useCallback(
    (state) => {
      dispatch(setInitialFen(state.fen));
      dispatch(setMyTurn(!isMyTurn));
      const captured = getCapturedPieces(startingFen, state.fen);
        console.log('Captured Pieces:', captured); // Debugging
        setWhiteCaptured(captured.whiteCaptured);
        setBlackCaptured(captured.blackCaptured);
      socket.emit('makeMove', { matchId, state, userData });
      console.log(
        `I am ${player} - My turn: ${isMyTurn} - Made a move`
      );
    },
    [dispatch, isMyTurn, matchId, player, socket, userData]
  );

  // Function to render captured pieces as images
  const renderCapturedPiecesImages = useCallback(
    (capturedPieces: string[]) => {
      if (!Array.isArray(capturedPieces)) {
        console.warn('Captured pieces data is not an array:', capturedPieces);
        return null;
      }

      const pieceImages: { [key: string]: any } = {
        bq: require('../assets/images/bq.png'),
        br: require('../assets/images/br.png'),
        bn: require('../assets/images/bn.png'),
        bb: require('../assets/images/bb.png'),
        bk: require('../assets/images/bk.png'),
        bp: require('../assets/images/bp.png'),
        wq: require('../assets/images/wq.png'),
        wr: require('../assets/images/wr.png'),
        wn: require('../assets/images/wn.png'),
        wb: require('../assets/images/wb.png'),
        wk: require('../assets/images/wk.png'),
        wp: require('../assets/images/wp.png'),
      };
      console.log('renderCapturedPiecesImages called with:', capturedPieces)
      return capturedPieces.map((piece, index) => {
        console.log("Rendering piece:", piece)
        const imageSource = pieceImages[piece];
        if (!imageSource) {
          console.warn('No image found for piece:', piece);
          return null;
        }
        return (
          <View key={index} style={styles.capturedPieceContainer}>
            <Image
              source={imageSource}
              style={styles.capturedPieceImage}
            />
          </View>
        );
      });
    },
    []
  );

  // Function to render each piece on the chessboard
  const renderPiece = useCallback(
    (piece: PieceType) => {
      const pieceImages: { [key in PieceType]: any } = {
        bq: require('../assets/images/bq.png'),
        br: require('../assets/images/br.png'),
        bn: require('../assets/images/bn.png'),
        bb: require('../assets/images/bb.png'),
        bk: require('../assets/images/bk.png'),
        bp: require('../assets/images/bp.png'),
        wq: require('../assets/images/wq.png'),
        wr: require('../assets/images/wr.png'),
        wn: require('../assets/images/wn.png'),
        wb: require('../assets/images/wb.png'),
        wk: require('../assets/images/wk.png'),
        wp: require('../assets/images/wp.png'),
      };
      const imageSource = pieceImages[piece];
      if (!imageSource) {
        console.warn('No image found for piece:', piece);
        return null;
      }
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: responsiveHeight(6.5),
            height: responsiveHeight(6),
          }}
        >
          <Image
            style={{
              width: responsiveHeight(6),
              height: responsiveHeight(6),
              transform: player === 'black' ? [{ rotateX: '180deg' }] : [],
            }}
            source={imageSource}
          />
        </View>
      );
    },
    [player]
  );

  // Display Toast notification when the game starts
  useEffect(() => {
    if (startingFen) { // Ensure startingFen is set
      const startingPlayer = player === 'white' ? 'You' : 'Opponent';
      Toast.show({
        type: 'info',
        text1: 'Game Started',
        text2: `${startingPlayer} will make the first move.`,
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  }, [player, startingFen]);

  // Listen for move updates from the socket
  useEffect(() => {
    const handleUpdateMove = async (state) => {
      console.log('updateMove');
      // console.log('myturn', isMyTurn);
      // console.log('state is updated', state.fen !== initialFen);

      if (!isMyTurn && state.fen !== initialFen) {
        console.log('Received opponent move with FEN:', state.fen);
        if (state.in_promotion) {
          await chessboardRef.current?.resetBoard(state.fen);
        }

        await chessboardRef.current?.resetBoard(state.fen);

        // Update FEN position and toggle turn
        dispatch(setInitialFen(state.fen));
        dispatch(setMyTurn(!isMyTurn));

        // Update captured pieces by comparing startingFen and current Fen (state.fen)
        const captured = getCapturedPieces(startingFen, state.fen);
        console.log('Captured Pieces:', captured); // Debugging
        setWhiteCaptured(captured.whiteCaptured);
        setBlackCaptured(captured.blackCaptured);


        // Handle game states
        if (state.game_over) {
          setGameOverState(true);
          let result = 'Game Over';
          if (state.in_checkmate) {
            result = 'Checkmate!';
          } else if (state.in_stalemate) {
            result = 'Stalemate!';
          } else if (state.in_draw) {
            result = 'Draw!';
          } else if (state.insufficient_material) {
            result = 'Insufficient Material!';
          } else if (state.in_threefold_repetition) {
            result = 'Threefold Repetition!';
          }
          Toast.show({
            type: 'success',
            text1: 'Game Over',
            text2: result,
            position: 'top',
            visibilityTime: 4000,
            autoHide: true,
          });
        } else {
          if (state.in_check) {
            Toast.show({
              type: 'info',
              text1: 'Check',
              text2: `${player === 'white' ? 'white' : 'black'} is in check.`,
              position: 'top',
              visibilityTime: 3000,
              autoHide: true,
            });
          }

          // Handle other non-game-over states
          if (state.in_promotion) {
            Toast.show({
              type: 'info',
              text1: 'Promotion',
              text2: 'A pawn has been promoted.',
              position: 'top',
              visibilityTime: 3000,
              autoHide: true,
            });
          }

          if (state.in_stalemate) {
            Toast.show({
              type: 'info',
              text1: 'Stalemate',
              text2: 'The game has ended in a stalemate.',
              position: 'top',
              visibilityTime: 3000,
              autoHide: true,
            });
          }

          if (state.in_draw) {
            Toast.show({
              type: 'info',
              text1: 'Draw',
              text2: 'The game has ended in a draw.',
              position: 'top',
              visibilityTime: 3000,
              autoHide: true,
            });
          }

          if (state.in_threefold_repetition) {
            Toast.show({
              type: 'info',
              text1: 'Threefold Repetition',
              text2: 'The game has been drawn by threefold repetition.',
              position: 'top',
              visibilityTime: 3000,
              autoHide: true,
            });
          }

          if (state.insufficient_material) {
            Toast.show({
              type: 'info',
              text1: 'Insufficient Material',
              text2: 'The game has ended due to insufficient material.',
              position: 'top',
              visibilityTime: 3000,
              autoHide: true,
            });
          }
        }
      }
    };

    socket.on('updateMove', handleUpdateMove);

    return () => {
      socket.off('updateMove', handleUpdateMove);
    };
  }, [isMyTurn, initialFen, dispatch, socket, startingFen, player]);

  // Memoize the rendered captured pieces to prevent unnecessary re-renders
  const renderedWhiteCaptured = useMemo(
    () => renderCapturedPiecesImages(whiteCaptured),
    [whiteCaptured, renderCapturedPiecesImages]
  );

  const renderedBlackCaptured = useMemo(
    () => renderCapturedPiecesImages(blackCaptured),
    [blackCaptured, renderCapturedPiecesImages]
  );

  return (
    <View style={styles.chessboardContainer}>
      {/* Opponent's Profile */}
      <View style={styles.profileContainer}>
        <Image
          source={
            opponentInfo.profileImage
              ? { uri: opponentInfo.profileImage }
              : emptyProfile
          }
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{opponentInfo.name}</Text>
          {/* Captured Pieces */}
          <View style={styles.capturedPiecesContainer}>
            {player === 'black'
              ? renderedBlackCaptured
              : renderedWhiteCaptured}
          </View>
        </View>
      </View>

      {/* Chess Board */}
      <View
        style={{
          transform:
            player === 'black' ? [{ rotateX: '180deg' }] : [],
          marginVertical: responsiveHeight(2),
        }}
      >
        <ChessBoard
          enabled={!isMyTurn}
          ref={chessboardRef}
          fen={initialFen}
          boardSize={responsiveHeight(55)}
          renderPiece={renderPiece}
          gestureEnabled={isMyTurn}
          onMove={({ state }) => {
            if (isMyTurn) {
              console.log('User move:', state);
              move(state);
            }
          }}
        />
      </View>

      {/* User's Profile */}
      <View style={styles.profileContainer}>
        <Image
          source={
            userData.profileImage
              ? { uri: userData.profileImage }
              : emptyProfile
          }
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{userData.name}</Text>
          {/* Captured Pieces */}
          <View style={styles.capturedPiecesContainer}>
            {player === 'white'
              ? renderedBlackCaptured
              : renderedWhiteCaptured}
          </View>
        </View>
      </View>
      {/* Toast Component is already included in App.js */}
    </View>
  );
};

const styles = StyleSheet.create({
  chessboardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    zIndex: 20,
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(2),
  },
  profileContainer: {
    justifyContent: 'flex-start',
    width: responsiveWidth(100),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(1),
  },
  profileImage: {
    borderRadius: responsiveWidth(10),
    borderWidth: responsiveWidth(0.5),
    borderColor: 'gray',
    resizeMode: 'contain',
    width: responsiveWidth(14),
    height: responsiveWidth(14),
    marginRight: responsiveWidth(2),
  },
  profileDetails: {
    flex: 1,
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: responsiveHeight(0.5),
  },
  capturedPiecesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  capturedPieceContainer: {
    width: 24,
    height: 24,
    marginRight: 4,
    marginTop: 2,
  },
  capturedPieceImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  flippedBoard: {
    transform: [{ rotateX: '180deg' }], // Rotate 180° for black
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
    color: '#000',
  },
  playerCardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
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
    alignSelf: 'center',
  },
});

export default PlayLocal;
