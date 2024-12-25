import { useRoute } from '@react-navigation/native'
import React, { useRef, useEffect, useState, useContext } from 'react';
import { View, Animated, StyleSheet, Easing, Button, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ant from 'react-native-vector-icons/AntDesign'
import ludoBackgroundimage from '../assets/images/tierSelectionBackground.png'
import coinIcon from '../assets/images/coinIcon.png'
import { io } from 'socket.io-client';
import { ThemeContext } from '../Themes/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { clearMatchData, setInitialFen, setMatchId, setMyTurn, setOpponentInfo, setPlayer } from '../slices/matchSlice';
import { deductMatchFees, setCoins } from '../slices/userSlice';
import LottieView from 'lottie-react-native';







const MatchMakingScreen = ({ route, navigation }) => {
  // const { socket,setSocket } = useState()
  const { game, type, amount } = route.params
  const [loading, setLoading] = useState(true); // Track loading state
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { socket, theme, toggleTheme } = useContext(ThemeContext);
  const { token, userData } = useSelector((state) => state.user);
  const { matchId, initialFen, player, isMyTurn, opponentInfo,gameEnd , won, in_checkmate, in_drawm, in_promotion, in_stalemate, in_threefold_repetition } = useSelector((state) => state.match)
  const dispatch = useDispatch()


// console.log(route.params)

  useEffect(() => {
    console.log(matchId)
    async function start() {
      
      // setSocket(newSocket);
      socket.emit("playGame", { gameInfo: route.params, userInfo: userData })
      // Listen for events from the server
      socket.on('matchMake', (data) => {
        console.log(data)
        let playerColor = null;
        if (data.playerBlack.userInfo.uniqueId === userData.uniqueId) {
          playerColor = 'black';
        } else if (data.playerWhite.userInfo.uniqueId === userData.uniqueId) {
          playerColor = 'white';
        }
        dispatch(setPlayer(playerColor))
        dispatch(setMatchId(data.matchId))
        dispatch(setCoins(-data.gameInfo.amount))
        // Determine if it's the player's turn
        const isMyTurn = data.startingPlayer == playerColor;

        if (playerColor == 'black') {
          dispatch(setOpponentInfo(data.playerWhite.userInfo))
        } else {
          dispatch(setOpponentInfo(data.playerBlack.userInfo))
        }
        let initialFen = data.startingPlayer == 'black' ? "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1" : "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        dispatch(setInitialFen(initialFen))
        console.log("i am " + playerColor + " is my turn" + isMyTurn)
        // console.log(initialFen)
        dispatch(setMyTurn(isMyTurn))
        setLoading(false)
        // console.log("opponent info ///////////",opponentInfo)
        setTimeout(() => {
          handleNavigation()
        }, 2000)

      });
    }
    !gameEnd && start()
    gameEnd && (()=>{
      console.log('end')
      won && dispatch(setCoins(route.params.amount*2))
      dispatch(clearMatchData())
  })()



    return () => {
      socket.off("matchMake")
    }
  }, [])



  // console.log(route.params)

  const handleNavigation = () => {

    if (game === 0) {
      if (type === 1) {
        navigation.navigate('ChessOffline', { amount });
      }
    }
    if (game === 1) {
      if (type === 1) {
        navigation.navigate('LudoOffline', { amount });

      }
      if (game === 2) {
        if (type === 1) {
          navigation.navigate('BackgammonOffline', { amount });
        }
      }
      if (game === 3) {
        if (type === 1) {
          navigation.navigate('DominoesOnline', { amount });
        }
      }
      // Add similar conditions for other games
    };
  }
  useEffect(() => {


    // Function to start the animation
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 200, // Adjust speed here
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    // Start the animation only if loading is true
    if (loading) {
      startAnimation();
    } else {
      // When loading stops, set card to the center
      animatedValue.stopAnimation(() => {
        Animated.timing(animatedValue, {
          toValue: 0.5, // 0.5 corresponds to the center in interpolation
          duration: 200, // Smooth transition to center
          useNativeDriver: true,
        }).start();
      });
    }

    // Stop the animation if loading becomes false
    return () => {
      animatedValue.stopAnimation(() => {
        Animated.timing(animatedValue, {
          toValue: 0.5, // 0.5 corresponds to the center in interpolation
          duration: 200, // Smooth transition to center
          useNativeDriver: true,
        }).start();
      }); // Stop the animation
    };
  }, [loading]);

  // Interpolate translateY for vertical movement
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-responsiveHeight(70), responsiveHeight(70)], // Adjust based on your container height
  });




  return (

    <ImageBackground style={styles.container} source={require('../assets/images/App-3d-Background.jpg')}>
      {/* // <ImageBackground source={ludoBackgroundimage} // Replace with your image URL */}
      {/* //   style={styles.container} */}
      {/* //   resizeMode="cover" > */}
      {
        loading && <TouchableOpacity style={{ position: 'absolute', top: responsiveHeight(3), left: responsiveWidth(7) }} onPress={() => { navigation.goBack() }}>
          <FontAwesome5 name='chevron-left' size={responsiveWidth(8)} color="white" />
        </TouchableOpacity>
      }
      {
        gameEnd && <TouchableOpacity style={{ position: 'absolute', top: responsiveHeight(3), left: responsiveWidth(7) }} onPress={() => { navigation.goBack() }}>
          <FontAwesome5 name='chevron-left' size={responsiveWidth(8)} color="white" />
        </TouchableOpacity>
      }
      <View style={{width:responsiveWidth(35),height:responsiveHeight(28),justifyContent:'center',alignItems:'center'}}>
        {gameEnd&&won&&<LottieView
          source={require('../animation/coinsAnimation.json')} // Add your Lottie stars animation here
          autoPlay
          loop
          style={styles.stars}
        />
        }{
          gameEnd&&
          <Text style={{color:'white',position: 'absolute',
          top:0,
          left: responsiveWidth(10),
          right: 0,
          bottom: -10,
          zIndex: 2}}>{won?'Winner':'Losser'}</Text>
}
        <View style={styles.card}>
          <Image style={{ borderRadius: responsiveWidth(4), height: responsiveHeight(13), width: responsiveWidth(27) }} source={userData.profileImage ? { uri: userData.profileImage } : require('../assets/images/profileEmpty.jpg')} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: responsiveHeight(1), marginHorizontal: responsiveHeight(.5) }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ant name='star' size={responsiveWidth(6)} color='orange' />
              <Text style={{ position: 'absolute', top: responsiveWidth(1.2), left: responsiveWidth(2.3), color: 'black', fontWeight: 'bold', fontSize: responsiveWidth(3) }}>3</Text>
            </View>
            <Text style={{ marginLeft: responsiveWidth(1), color: 'white', fontWeight: 'bold', fontSize: responsiveWidth(3) }}>{userData.name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.amount}>
        {/* <FontAwesome5 name='coins' size={responsiveWidth(6)} color='black' /> */}
        <Image source={coinIcon} style={{ width: responsiveWidth(10), height: responsiveWidth(10) }} />
        <Text style={{ color: 'black', fontSize: responsiveWidth(5), transform: [{ translateX: 2 }] }}>{amount} </Text>
      </View>
      {
        loading ? <Animated.View style={[styles.card, { backgroundColor: '#D3D3D3', transform: [{ translateY }] }]}>
          <View style={{ borderRadius: responsiveWidth(4), backgroundColor: 'gray', height: responsiveHeight(13), width: responsiveWidth(27) }} />
          <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: responsiveHeight(1), marginHorizontal: responsiveHeight(.5) }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ant name='star' size={responsiveWidth(8)} color='gray' />
              {/* <View style={{ backgroundColor:'gray',width: responsiveWidth(10),height:responsiveHeight(2),paddingVertical:responsiveHeight(1) }}></View> */}
            </View>
            <View style={{ backgroundColor: 'gray', width: responsiveWidth(15), height: responsiveHeight(2), marginLeft: responsiveWidth(1) }}></View>
          </View>
        </Animated.View> :
         <View style={{width:responsiveWidth(35),height:responsiveHeight(28),justifyContent:'center',alignItems:'center'}}>
         {gameEnd&&!won&&<LottieView
           source={require('../animation/coinsAnimation.json')} // Add your Lottie stars animation here
           autoPlay
           loop
           style={styles.stars}
         />
         }
          {gameEnd && <Text style={{color:'white',position: 'absolute',
           top:0,
           left: responsiveWidth(10),
           right: 0,
           bottom: -10,
           zIndex: 2}}>{!won?'Winner':'Losser'}</Text>}
          <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>
            <Image style={{ borderRadius: responsiveWidth(4), height: responsiveHeight(13), width: responsiveWidth(27) }} source={opponentInfo.profileImage ? { uri: opponentInfo.profileImage } : require('../assets/images/profileEmpty.jpg')} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: responsiveHeight(1), marginHorizontal: responsiveHeight(.5) }}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ant name='star' size={responsiveWidth(6)} color='orange' />
                <Text style={{ position: 'absolute', top: responsiveWidth(1.2), left: responsiveWidth(2.3), color: 'black', fontWeight: 'bold', fontSize: responsiveWidth(3) }}>3</Text>
              </View>
              <Text style={{ marginLeft: responsiveWidth(1), color: 'white', fontWeight: 'bold', fontSize: responsiveWidth(3) }}>{opponentInfo.name}</Text>
            </View>
          </Animated.View>
          </View>
      }


    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#050B18'
  },
  card: {
    width: responsiveWidth(28),
    height: responsiveHeight(20),
    // padding: responsiveWidth(1),
    backgroundColor: 'black',
    borderRadius: responsiveWidth(4),
    borderColor: 'black',
    borderWidth: 2
    // position: 'absolute', // Ensures the card can move freely
  },
  amount: {
    width: responsiveWidth(22),
    height: responsiveHeight(11),
    borderRadius: responsiveWidth(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2
  } ,
  stars: {
    position: 'absolute',
    top:responsiveHeight(-9),
    left: 0,
    right: 0,
    bottom: -10,
    zIndex: 2
  },
});

export default MatchMakingScreen










