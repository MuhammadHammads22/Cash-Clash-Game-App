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
import { extractMoveWithoutChessJS } from '../utils/chess'

const Width = Dimensions.get('window').width

type LocalGameProps = NativeStackScreenProps<RootStackParamList, 'LocalGame'>

export interface ChessBoardPiece {
  piece: string, pieceColor: string, row: number, column: number, isMoveValid?: boolean
}

const PlayLocal = ({ navigation }: LocalGameProps) => {
  const route = useRoute().params
  const dispatch = useDispatch()
  const { matchId ,initialFen,player, isMyTurn } = useSelector((state) => state.match)
  
  const { socket, theme, toggleTheme } = useContext(ThemeContext)
  const [from,setFrom]=useState('')
  const [to,setTo]=useState('')


  const [gameOver, setGameOver] = useState(false)
  const chessboardRef = useRef<ChessboardRef>(null)


  const move = (state) => {

    dispatch(setInitialFen(state.fen))
    // Send move to server via socket
    // socket.emit('hello','hello')
    
    socket.emit("makeMove",{matchId,state})
    console.log(isMyTurn, player)
    dispatch(setMyTurn(!isMyTurn))
  }
  useEffect(()=>{
    if (from || from.trim() !== '') {
      console.log('String is empty, null, or undefined');
    (async()=>{
      await chessboardRef.current?.move({ from: from , to: to })
    })()
  }
   

  },[from,to])

  useEffect(() => {
    // socket.on('bye',(param)=>{
    //   console.log(param)
    //       })
        socket.on('updateMove',async (state) => {
         const {from,to} = extractMoveWithoutChessJS(initialFen,state.fen)
         console.log('opponent moved from ',from+"to "+to)
         setFrom(from)
         setTo(to)
          dispatch(setInitialFen(state.fen)) // Update FEN position
          dispatch(setMyTurn(!isMyTurn))
        })

      return () => {
        // socket.off('chessStateUpdate')
      }
    
  })

  // Custom render piece function to rotate pieces based on player color
  // const renderPiece = (piece: PieceType) => {
  //   const rotation =  player=='black'? '180deg'  : '0deg';
    
  //   return (
  //     <View style={{ transform: [{ rotate: rotation }] }}>
  //       {piece}
  //     </View>
  //   )
  // }

  return (
    <View style={[styles.chessboardContainer, player === 'black' && styles.flippedBoard]}>
    <FullScreenModal isVisible={!isMyTurn}/>
    <ChessBoard
        ref={chessboardRef}
        fen={initialFen}
        // renderPiece={(piece:PieceType)=>{
        //   console.log(piece)
        //   renderPiece(piece)}}
        onMove={({ state }) => {
          console.log(state)
          move(state) // Emit the move to the opponent
          // move(state)
        }}
      />
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
