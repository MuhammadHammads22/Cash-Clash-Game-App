import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { RootStackParamList } from '../navigation/AppNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Dimensions } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useRoute } from '@react-navigation/native'
import { ThemeContext } from '../Themes/AppContext'
import ChessBoard, { ChessboardRef } from 'react-native-chessboard';
import { style } from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { setInitialFen, setMyTurn } from '../slices/matchSlice'
import { PieceType } from 'react-native-chessboard/lib/typescript/types'
import FullScreenModal from '../components/FullScreenModal'
import { applyMoveToFEN, convertMoveToOpposite, extractAndConvertMove, extractMove, extractMoveForBlack, extractMoveForInvertedPerspective, extractMoveWithoutChessJS, mirrorFenState } from '../utils/chess'
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import emptyProfile from'../assets/images/profileEmpty.jpg'
import { Image } from 'react-native'

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});
const Width = Dimensions.get('window').width

type LocalGameProps = NativeStackScreenProps<RootStackParamList, 'LocalGame'>

export interface ChessBoardPiece {
  piece: string, pieceColor: string, row: number, column: number, isMoveValid?: boolean
}



const PlayLocal = ({ navigation }: LocalGameProps) => {
  const route = useRoute().params
  const dispatch = useDispatch()
  const { token, userData } = useSelector((state) => state.user);
  const { matchId ,initialFen,player, isMyTurn, opponentInfo } = useSelector((state) => state.match)
  const { socket, theme, toggleTheme } = useContext(ThemeContext)

  const [gameOver, setGameOver] = useState(false)
  const chessboardRef = React.useRef<ChessboardRef>(null)
 











  const move = (state) => {
    // const {from,to} =  extractMove(initialFen,state.fen)

    // console.log(from,to)
    dispatch(setInitialFen(state.fen))
    dispatch(setMyTurn(!isMyTurn))   
    socket.emit("makeMove",{matchId,state,userData})
    console.log("i am "+player+"  my turn "+isMyTurn+" maked a move")  
  }
 

  // const opponentMove=async(from,to,chessRef)=>{
  //   await chessRef.current?.move({ from: from , to: to })
  // }

  useEffect(() => {
        socket.on('updateMove',async (state) => {
          console.log("updateMove")
          
          // console.log(state.fen!==initialFen+'updatemove////////// '+state.fen)
          if(!isMyTurn&&state.fen!==initialFen){
console.log("hello")
            if(state.in_promotion){
              await chessboardRef.current.resetBoard(state.fen)
            }
      //  const s1=mirrorFenState(initialFen)
      //  const s2=mirrorFenState(state.fen)
      //  console.log('not reverted',state.fen)

      //  console.log('reverted',s2)
          const {from,to}=(extractMoveWithoutChessJS(initialFen,state.fen))
            console.log(from,to)
      // await chessboardRef.current.resetBoard(state.fen)

        //  const updateFen= applyMoveToFEN(initialFen,from+to)
        //  console.log(updateFen)
        //  console.log('opponent moved from ',from+"to "+to)
        //  opponentMove(from,to,chessboardRef)
          await chessboardRef.current?.move({ from: from , to: to })
          // await chessboardRef.current.resetBoard(s2)
          //   // console.log('state : ',state.fen)
          dispatch(setInitialFen(state.fen)) // Update FEN position
          dispatch(setMyTurn(!isMyTurn))

          }
        })
      return () => {
        socket.off('chessStateUpdate')
      }
  },[])

  // Custom render piece function to rotate pieces based on player color
  // const renderPiece = (piece: PieceType) => {
  //   const rotation =  player=='black'? '180deg'  : '0deg';
    
  //   return (
  //     <View style={{ transform: [{ rotate: rotation }] }}>
  //       {piece}
  //     </View>
  //   )
  // }
  // <FullScreenModal isVisible={!isMyTurn}/>

  return (
    <View style={[styles.chessboardContainer,{transform: player=='black'?[{ rotateX:'0deg'}]:[]}]}>
    <View style={{justifyContent:'flex-start',width:responsiveWidth(100),height:responsiveHeight(10),flexDirection:'row',alignItems:'center'}}>
    <Image
    source={opponentInfo.profileImage?{uri:opponentInfo.profileImage} : emptyProfile} 
    style={{
      borderRadius: responsiveWidth(10),
      borderWidth: responsiveWidth(.5),
      borderColor: 'gray',
      resizeMode: 'contain',
      width: responsiveWidth(14), // Responsive width
      height: responsiveWidth(14), // Maintain aspect ratio
      marginRight: responsiveWidth(0)
    }}
  />
    <Text>{opponentInfo.name }</Text>
    </View>
    <View     style={{transform: player=='black'?[{ rotateX:'180deg'}]:[]}}>
    <ChessBoard
        enabled={!isMyTurn}
        ref={chessboardRef}
        fen={initialFen}
        boardSize={responsiveHeight(55)}
        renderPiece={(piece)=>{
          const pieceImages: { [key in PieceType]: string } = {
            bq:  require('../assets/images/bq.png'),
            br:  require('../assets/images/br.png'),
            bn:  require('../assets/images/bn.png'),
            bb:  require('../assets/images/bb.png'),
            bk: require('../assets/images/bk.png'),
            bp:  require('../assets/images/bp.png'),
            wq:  require('../assets/images/wq.png'),
            wr:  require('../assets/images/wr.png'),
            wn:  require('../assets/images/wn.png'),
            wb:  require('../assets/images/wb.png'),
            wk:  require('../assets/images/wk.png'),
            wp:  require('../assets/images/wp.png'),
          };
          const imageSource = pieceImages[piece];
          if (!imageSource) {
            return null;
          }
         return(
          <View style={{flex:1,alignItems:'center',justifyContent:'center',width:responsiveHeight(6.5),height:responsiveHeight(6)}}>
          <Image style={{width:responsiveHeight(6),height:responsiveHeight(6),transform: player=='black'?[{ rotateX:'-180deg'}]:[] }} source={imageSource}/>
        </View> 
        )
        }}
        gestureEnabled={true}
        onMove={({ state }) => {
          // console.log(state)  // Join the rows back together with "/"
          if(isMyTurn){
          console.log(state)
          move(state) // Emit the move to the opponent
          }
        }}
      />
      </View>
      <View style={{width:responsiveWidth(100),height:responsiveHeight(10),flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
      <Image
      source={userData.profileImage?{uri:userData.profileImage} : emptyProfile } 
      style={{
        borderRadius: responsiveWidth(10),
        borderWidth: responsiveWidth(.5),
        borderColor: 'gray',
        resizeMode: 'contain',
        width: responsiveWidth(14), // Responsive width
        height: responsiveWidth(14), // Maintain aspect ratio
        marginRight: responsiveWidth(0)
      }}
    />
    <Text>{ userData.name}</Text>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chessboardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    zIndex: 20
  },
  flippedBoard: {
    transform: [{ rotateX:'180deg'}] // Rotate 180° for black
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
    color: '#000'
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
    alignSelf: 'center'
  }
})

export default PlayLocal
