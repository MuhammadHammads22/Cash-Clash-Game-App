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
import { setInitialFen, setMatchId, setMyTurn, setPlayer } from '../slices/matchSlice';







const MatchMakingScreen = ({ route, navigation }) => {
  // const { socket,setSocket } = useState()
  const { game, type, amount } = route.params
  const [loading, setLoading] = useState(true); // Track loading state
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { socket,theme, toggleTheme } = useContext(ThemeContext);
  const { token, userData } = useSelector((state) => state.user);
  const dispatch= useDispatch()


  useEffect(()=>{
    async function start(){
      // setSocket(newSocket);
      socket.emit("playGame",{gameInfo:route.params,userInfo:userData})
      // Listen for events from the server
      socket.on('matchMake', (data) => {
        // console.log(data)
        let playerColor = null;
        if (data.playerBlack.userInfo.uniqueId === userData.uniqueId) {
          playerColor = 'black';
          
        } else if (data.playerWhite.userInfo.uniqueId === userData.uniqueId) {
          playerColor = 'white';
        }
        dispatch(setPlayer(playerColor))
        dispatch(setMatchId(data.matchId))
        // Determine if it's the player's turn
        const isMyTurn = data.startingPlayer == playerColor;
        console.log("i am "+playerColor+" is my turn"+isMyTurn)
        dispatch(setInitialFen(data.startingPlayer=="white"?"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1"
))
        dispatch(setMyTurn(isMyTurn))
        setLoading(false)
        handleNavigation()
      });
    }
    start()

    return ()=>{
      socket.off("matchMake")
    }
  },[])



// console.log(route.params)
 
    const handleNavigation = () => {

    if (game === 0) {
      if (type === 1) {
        navigation.navigate('ChessOffline', { amount });
      } 
    }
    if (game === 1) {
      if (type === 1) {
        navigation.navigate('LudoOnline', { amount });
     
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


    <ImageBackground source={ludoBackgroundimage} // Replace with your image URL
      style={styles.container}
      resizeMode="cover" >
      {
        loading&&<TouchableOpacity style={{ position: 'absolute', top: responsiveHeight(3), left: responsiveWidth(7) }} onPress={() => { navigation.goBack() }}>
        <FontAwesome5 name='chevron-left' size={responsiveWidth(8)} color="black" />
      </TouchableOpacity>
      }
      <View style={styles.card}>
        <Image style={{ borderRadius: responsiveWidth(4), height: responsiveHeight(13), width: responsiveWidth(27) }} source={require('../assets/images/UserImage.png')} />
        <View style={{ flexDirection: 'row', marginVertical: responsiveHeight(1), marginHorizontal: responsiveHeight(.5) }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Ant name='star' size={responsiveWidth(8)} color='orange' />
            <Text style={{ position: 'absolute', top: responsiveWidth(2), left: responsiveWidth(3), color: 'black', fontWeight: 'bold', fontSize: responsiveWidth(3) }}>3</Text>
          </View>
          <Text style={{ marginLeft: responsiveWidth(1), color: 'white', fontWeight: 'bold', fontSize: responsiveWidth(5) }}>john</Text>
        </View>
      </View>
      <View style={styles.amount}>
        {/* <FontAwesome5 name='coins' size={responsiveWidth(6)} color='black' /> */}
        <Image source={coinIcon} style={{ width: responsiveWidth(10), height: responsiveWidth(10) }} />
        <Text style={{ color: 'black', fontSize: responsiveWidth(5), transform: [{ translateX: 2 }] }}>{amount} </Text>
      </View>
      {
        loading ? <Animated.View style={[styles.card, {backgroundColor:'#D3D3D3', transform: [{ translateY }] }]}>
          <View style={{  borderRadius: responsiveWidth(4),backgroundColor: 'gray', height: responsiveHeight(13), width: responsiveWidth(27) }} />
          <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: responsiveHeight(1), marginHorizontal: responsiveHeight(.5) }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ant name='star' size={responsiveWidth(8)} color='gray' />
              {/* <View style={{ backgroundColor:'gray',width: responsiveWidth(10),height:responsiveHeight(2),paddingVertical:responsiveHeight(1) }}></View> */}
            </View>
            <View style={{ backgroundColor: 'gray', width: responsiveWidth(15), height: responsiveHeight(2), marginLeft: responsiveWidth(1) }}></View>
          </View>
        </Animated.View> :
          <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>
            <Image style={{ borderRadius: responsiveWidth(4), height: responsiveHeight(13), width: responsiveWidth(27) }} source={require('../assets/images/UserImage.png')} />
            <View style={{ flexDirection: 'row', marginVertical: responsiveHeight(1), marginHorizontal: responsiveHeight(.5) }}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ant name='star' size={responsiveWidth(8)} color='orange' />
                <Text style={{ position: 'absolute', top: responsiveWidth(2), left: responsiveWidth(3), color: 'black', fontWeight: 'bold', fontSize: responsiveWidth(3) }}>3</Text>
              </View>
              <Text style={{ marginLeft: responsiveWidth(1), color: 'white', fontWeight: 'bold', fontSize: responsiveWidth(5) }}>john</Text>
            </View>
          </Animated.View>
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
    // width: responsiveWidth(28),
    // height: responsiveHeight(20),
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
  }
});

export default MatchMakingScreen










