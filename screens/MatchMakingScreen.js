import { useRoute } from '@react-navigation/native'
import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Easing, Button, Text, Image } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ant from 'react-native-vector-icons/AntDesign'





const MatchMakingScreen = ({ route, navigation }) => {

  const [loading, setLoading] = useState(true); // Track loading state
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
    // Function to start the animation
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 150, // Adjust speed here
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
          duration: 300, // Smooth transition to center
          useNativeDriver: true,
        }).start();
      });
    }

    // Stop the animation if loading becomes false
    return () => {
      animatedValue.stopAnimation(() => {
        Animated.timing(animatedValue, {
          toValue: 0.5, // 0.5 corresponds to the center in interpolation
          duration: 300, // Smooth transition to center
          useNativeDriver: true,
        }).start();
      }); // Stop the animation
    };
  }, [loading]);

  // Interpolate translateY for vertical movement
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-responsiveHeight(60), responsiveHeight(60)], // Adjust based on your container height
  });


  const { game, type, amount } = route.params
  const handleNavigation = () => {
    if (game === 'Chess') {
      if (type === 1) {
        navigation.navigate('ChessSingle', { amount });
      } else if (type === 2) {
        navigation.navigate('ChessTournament', { amount });
      }
    }
    if (game === 'Ludo') {
      if (type === 1) {
        navigation.navigate('LudoSingle', { amount });
      } else if (type === 2) {
        navigation.navigate('LudoTournament', { amount });
      }
    }
    if (game === 'Backgammon') {
      if (type === 1) {
        navigation.navigate('BackgammonSingle', { amount });
      } else if (type === 2) {
        navigation.navigate('BackgammonTournament', { amount });
      }
    }
    if (game === 'Dominoes') {
      if (type === 1) {
        navigation.navigate('DominoesSingle', { amount });
      } else if (type === 2) {
        navigation.navigate('DominoesTournament', { amount });
      }
    }
    // Add similar conditions for other games
  };
  return (


    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={{ borderTopLeftRadius: responsiveWidth(6), borderTopRightRadius: responsiveWidth(6), height: responsiveHeight(13), width: responsiveWidth(24) }} source={require('../assets/images/UserImage.png')} />
        <View style={{ flexDirection: 'row', marginVertical: responsiveHeight(1), marginHorizontal: responsiveHeight(.5) }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Ant name='star' size={responsiveWidth(8)} color='#F4D144' />
            <Text style={{ position: 'absolute', top: responsiveWidth(2), left: responsiveWidth(3), color: 'black', fontWeight: 'bold', fontSize: responsiveWidth(3) }}>3</Text>
          </View>
          <Text style={{ marginLeft: responsiveWidth(1), color: 'white', fontWeight: 'bold', fontSize: responsiveWidth(5) }}>john</Text>
        </View>
      </View>
      <View style={styles.amount}>
        <FontAwesome5 name='coins' size={responsiveWidth(6)} color='#F4D144' />
        <Text style={{ color: '#F4D144', fontSize: responsiveWidth(5), transform: [{ translateX: 2 }] }}>{amount} </Text>
      </View>
      {
        loading ? <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>
          <View style={{ borderTopLeftRadius: responsiveWidth(6), borderTopRightRadius: responsiveWidth(6),backgroundColor:'gray', height: responsiveHeight(13), width: responsiveWidth(24) }}  />
            <View style={{alignItems:'center',justifyContent:'center', flexDirection: 'row', marginVertical: responsiveHeight(1), marginHorizontal: responsiveHeight(.5) }}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ant name='star' size={responsiveWidth(8)} color='gray' />
                {/* <View style={{ backgroundColor:'gray',width: responsiveWidth(10),height:responsiveHeight(2),paddingVertical:responsiveHeight(1) }}></View> */}
              </View>
              <View style={{backgroundColor:'gray',width: responsiveWidth(10),height:responsiveHeight(2) ,marginLeft: responsiveWidth(1) }}></View>
            </View>
        </Animated.View> :
          <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>
            <Image style={{ borderTopLeftRadius: responsiveWidth(6), borderTopRightRadius: responsiveWidth(6), height: responsiveHeight(13), width: responsiveWidth(24) }} source={require('../assets/images/UserImage.png')} />
            <View style={{ flexDirection: 'row', marginVertical: responsiveHeight(1), marginHorizontal: responsiveHeight(.5) }}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ant name='star' size={responsiveWidth(8)} color='#F4D144' />
                <Text style={{ position: 'absolute', top: responsiveWidth(2), left: responsiveWidth(3), color: 'black', fontWeight: 'bold', fontSize: responsiveWidth(3) }}>3</Text>
              </View>
              <Text style={{ marginLeft: responsiveWidth(1), color: 'white', fontWeight: 'bold', fontSize: responsiveWidth(5) }}>john</Text>
            </View>
          </Animated.View>
      }



    </View>
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
    padding: responsiveWidth(1),
    // backgroundColor: 'lightblue',
    borderRadius: responsiveWidth(6),
    borderColor: 'gray',
    borderWidth: 2
    // position: 'absolute', // Ensures the card can move freely
  },
  amount: {
    width: responsiveWidth(22),
    height: responsiveHeight(11),
    borderRadius: responsiveWidth(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 2
  }
});

export default MatchMakingScreen











