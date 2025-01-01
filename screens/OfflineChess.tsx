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
  Animated,
  Modal,
  Alert,
  BackHandler,
  ImageBackground,
} from 'react-native';
import { CommonActions, useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import ChessBoard, { ChessboardRef } from 'react-native-chessboard';
import Toast from 'react-native-toast-message';

import { RootStackParamList } from '../navigation/AppNavigator';
import { ThemeContext } from '../Themes/AppContext';
import { clearMatchData, setGameEnd, setGameOver, setInCheckmate, setInitialFen, setMyTurn, setWon } from '../slices/matchSlice';
import { PieceType } from 'react-native-chessboard/lib/typescript/types';
import emptyProfile from '../assets/images/profileEmpty.jpg';
import { getCapturedPieces } from '../utils/chess'; // Ensure this function is correctly implemented
import { setCoins } from '../slices/userSlice';
import LottieView from 'lottie-react-native';
import { style } from 'twrnc';
import FullScreenModal from '../components/FullScreenModal'
import { url } from '../store/urls';


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
    tier,
    opponentInfo,
    won,
    game_over,
    in_check,
    in_checkmate,
    in_draw,
    in_promotion,
    in_stalemate,
    in_threefold_repetition,
    insufficient_material ,
    gameEnd
  } = useSelector((state) => state.match);
  
  const { socket, theme, toggleTheme } = useContext(ThemeContext);
  
  // State for captured pieces
  const [blackCaptured, setBlackCaptured] = useState<string[]>([]);
  const [whiteCaptured, setWhiteCaptured] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const isOpponentLeftRef = useRef(false); // Ref to track if opponent has left

  const animationValue = useRef(new Animated.Value(0)).current;
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
    async(state) => {
      dispatch(setInitialFen(state.fen));
      
      const captured = getCapturedPieces(startingFen, state.fen);
        console.log('Captured Pieces:', captured); // Debugging
        setWhiteCaptured(captured.whiteCaptured);
        setBlackCaptured(captured.blackCaptured);
      socket.emit('makeMove', { matchId, state, userData });
      console.log(
        `I am ${player} - My turn: ${isMyTurn} - Made a move`
      );
        if (state.in_checkmate) {
          dispatch(setWon(true))
          dispatch(setGameEnd(true))
          isOpponentLeftRef.current=true
          console.log('user won')
          setMessage('You Won!')
          dispatch(setCoins(tier*2))
          await fetch(`${url}game/addCoins`, {
            method: 'POST', // Correct HTTP method, use uppercase "POST"
            headers: {
              'Content-Type': 'application/json', // Tell the server that you're sending JSON
            },
            body: JSON.stringify({
              userId: userData._id,
              amount: tier*2
            }),
          })
            .then((res) => res.json()) // Parse the response as JSON
            .then((data) => {
              if(data.success){
                // Alert.alert('',data.message)
                console.log(data)
              }
              else{
                console.log(data)
              }
              ; // Handle the data received from the server
            })
            .catch((err) => {
              console.error('Error during registration:', err); // Handle errors
            });
          setTimeout(()=>{
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'HomeGraph' }],
              })
            )
            dispatch(clearMatchData())
          },4000)
          
          // Alert.alert('',"you won")
          return
        } else if (state.in_stalemate) {
          dispatch(setGameOver(true))
          dispatch(setGameEnd(true))
          // Alert.alert('',"Game Draw")
          return
        } else if (state.in_draw) {
          dispatch(setGameOver(true))
          dispatch(setGameEnd(true))
          // Alert.alert('',"Game Draw")
          return
        } else if (state.insufficient_material) {
          Alert.alert('',"Insufficient Material!")
        } else if (state.in_threefold_repetition) {
          Alert.alert('',"Threefold Repetition!")
        }
        // showAnimatedModal(result);
     
      dispatch(setMyTurn(!isMyTurn));
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

useEffect(()=>{
  const backHandler = BackHandler.addEventListener('hardwareBackPress',
    ()=>{
      Alert.alert("Hold on!", "Do you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null, // Stay on the current screen
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'HomeGraph' }],
            })
          ), // Navigate back or exit app
        },
      ]);
      return true
      
    }
  )
  socket.once('opponentQuit',async (player)=>{
  console.log(player+'quit')
  isOpponentLeftRef.current = true;
  dispatch(setWon(true))
  dispatch(setGameEnd(true))
  console.log('user won')
  setMessage('Opponent Quit You Won!')
  dispatch(setCoins(tier*2))
  await fetch(`${url}game/addCoins`, {
        method: 'POST', // Correct HTTP method, use uppercase "POST"
        headers: {
          'Content-Type': 'application/json', // Tell the server that you're sending JSON
        },
        body: JSON.stringify({
          userId: userData._id,
          amount: tier*2
        }),
      })
        .then((res) => res.json()) // Parse the response as JSON
        .then((data) => {
          if(data.success){
            // Alert.alert('',data.message)
            console.log(data)
          }
          else{
            console.log(data)
          }
          ; // Handle the data received from the server
        })
        .catch((err) => {
          console.error('Error during registration:', err); // Handle errors
        });
  setTimeout(()=>{
     navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'HomeGraph' }],
            })
          );
    dispatch(clearMatchData())
    setMessage('')
  },4000)
  })
  return () => {
    backHandler.remove();
    socket.off('opponentQuit')
    if (!isOpponentLeftRef.current) {
      console.log('playerQuit')
      socket.emit('playerQuit',player)  
    }
  };
},[])

  // Listen for move updates from the socket
  useEffect(() => {
    const handleUpdateMove = async (state) => {
      console.log('updateMove');
      // console.log('myturn', isMyTurn);
      // console.log('state is updated', state.fen !== initialFen);

      if (!isMyTurn && state.fen !== initialFen) {
        console.log('Received opponent move with FEN:', state.fen);

        await chessboardRef.current?.resetBoard(state.fen);

        // Update FEN position and toggle turn
        dispatch(setInitialFen(state.fen));
        

        // Update captured pieces by comparing startingFen and current Fen (state.fen)
        const captured = getCapturedPieces(startingFen, state.fen);
        console.log('Captured Pieces:', captured); // Debugging
        setWhiteCaptured(captured.whiteCaptured);
        setBlackCaptured(captured.blackCaptured);


          if (state.in_checkmate) {
            dispatch(setInCheckmate(true))
            dispatch(setGameEnd(true))
            isOpponentLeftRef.current=true
          setMessage('You Lost!')
            setTimeout(()=>{
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'HomeGraph' }],
                })
              )
              dispatch(clearMatchData())
            },4000)
            // Alert.alert('',"you lose") 
            return
          } else if (state.in_stalemate) {
          dispatch(setGameOver(true))
          dispatch(setGameEnd(true))
            // Alert.alert('',"Game Draw")
            return
          } else if (state.in_draw) {
          dispatch(setGameOver(true))
          dispatch(setGameEnd(true))
          // Alert.alert('',"Game Draw")
            return
          } else if (state.insufficient_material) {
            Alert.alert('',"Insufficient Maerial!")
          } else if (state.in_threefold_repetition) {
            Alert.alert('',"Threefold Repetition!")
          }

        dispatch(setMyTurn(!isMyTurn)); 
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
        <ImageBackground style={styles.container} source={require('../assets/images/App-3d-Background.jpg')}>
    <FullScreenModal gameEnd={gameEnd} won={won} message={message}/>
        <View style={styles.chessboardContainer}>
  


      {/* Opponent's Profile */}
      <View style={[styles.profileContainer,{borderColor:!isMyTurn?'orange':'gray'}]}>
        <Image
          source={
            opponentInfo.profileImage
              ? { uri: opponentInfo.profileImage }
              : emptyProfile
          }
          style={{
            borderRadius: responsiveWidth(10),
            borderWidth: responsiveWidth(0.5),
            resizeMode: 'contain',
            width: responsiveWidth(14),
            height: responsiveWidth(14),
            marginRight: responsiveWidth(2),
          borderColor:isMyTurn?'gray':'orange'}}
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
          boardSize={responsiveHeight(57)}
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
      <View style={[styles.profileContainer,{borderColor:isMyTurn?'orange':'gray'}]}>
        <Image
          source={
            userData.profileImage
              ? { uri: userData.profileImage }
              : emptyProfile
          }
          style={{
            borderRadius: responsiveWidth(10),
            borderWidth: responsiveWidth(0.5),
            resizeMode: 'contain',
            width: responsiveWidth(14),
            height: responsiveWidth(14),
            marginRight: responsiveWidth(2),
          borderColor:isMyTurn?'orange':'gray'}}
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
        </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#050B18'
  },
  chessboardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
    // zIndex: 20,
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(2),
  },
  profileContainer: {
    justifyContent: 'flex-start',
    width: responsiveWidth(90),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth:2,
    borderRadius:responsiveWidth(6),
    paddingHorizontal: responsiveWidth(5),
    paddingVertical:responsiveWidth(3),
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
    color:'white',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  animatedModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
  },
  stars: {
    position: 'absolute',
    width:responsiveWidth(100),
    height:responsiveHeight(100),
    top:0,
    left: 0,
    right: 0,
    bottom: -10,
    zIndex: 2
  },
});

export default PlayLocal;
