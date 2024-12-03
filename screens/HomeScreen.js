import { View, Text, StyleSheet, Image, SafeAreaView, KeyboardAvoidingView, ScrollView, TouchableOpacity, StatusBar, Modal, FlatList, Animated, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ludo from '../assets/images/ludoIcon.png'
import chess from '../assets/images/chessIcon.png'
import backgammon from '../assets/images/backgammonIcon.png'
import dominoes from '../assets/images/dominoesIcon.png'
import eventChess from '../assets/images/eventChess.png'
import eventBackgammon from '../assets/images/eventBackGammon.png'
import coinIcon from '../assets/images/coinIcon.png'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { ThemeContext } from '../Themes/AppContext';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken=async()=>{
 const token = await AsyncStorage.getItem("userToken")
 return token
}
const HomeScreen = ({ navigation }) => {
  const { token, userData } = useSelector((state) => state.user);
  console.log(userData.name)
  // console.log(getToken())
  const { theme, toggleTheme } = useContext(ThemeContext);
  const gamesData = [{ name: 'Chess', logo: chess }, { name: 'Ludo', logo: ludo }, { name: 'Backgammon', logo: backgammon }, { name: 'Dominoes', logo: dominoes }]
  const gameOptions = [{ game: 'Chess', logo: chess, options: [{ id: 1, name: "2 Players", image: require('../assets/images/logo.png') }, { id: 2, name: "tournament", image: require('../assets/images/tournament.png') }, { id: 3, name: "Private Room", image: require('../assets/images/Chess-Private-Card.png') }] }, { game: 'Ludo', logo: ludo, options: [{ id: 1, name: "2 Players", image: require('../assets/images/Ludo-TwoPlayer-Card.png') }, { id: 2, name: "tournament", image: require('../assets/images/Ludo-Tournament-Card.png') }, { id: 3, name: "Private Room", image: require('../assets/images/Ludo-PrivateRoom-Card.png') }, { id: 4, name: "4 Players", image: require('../assets/images/Ludo-FourPlayer-Card.png') }] }, { game: 'Dominoes', logo: dominoes, options: [{ id: 1, name: "2 Players", image: require('../assets/images/Dominoes-TwoPlayer-Card.png') }, { id: 2, name: "tournament", image: require('../assets/images/Dominoes-Tournament-Card.png') }, { id: 3, name: "Private Room", image: require('../assets/images/Dominoes-PrivateRoom-Card.png') }, { id: 4, name: "4 Players", image: require('../assets/images/Dominoes-FourPlayer-Card.png') }] }, { game: 'Backgammon', logo: backgammon, options: [{ id: 1, name: "2 Players", image: require('../assets/images/Backgammon-TwoPlayer-Card.png') }, { id: 2, name: "tournament", image: require('../assets/images/Backgammon-Private-Card.png') }, { id: 3, name: "Private Room", image: require('../assets/images/Backgammon-Tournament-Card.png') }] }]
  const [selectedGame, setSelectedGame] = useState(0);
  const [selectedGameOption, setSelectedGameOption] = useState(0);
  const [showPriceModal, setShowPriceModal] = useState(false)
  const gameTiers = [100, 200, 500, 1000, 2500, 5000]
  const [gameTier, setGameTier] = useState(100)
  const eventData = [
    { id: '1', title: 'Event 1', description: "50% off", image: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Event 2', description: "legends League", image: 'https://via.placeholder.com/150' },
    { id: '3', title: 'Event 3', description: 'Amazing offer on Event 3', image: 'https://via.placeholder.com/150' },
    { id: '4', title: 'Event 4', description: 'Buy 1 get 1 offer', image: 'https://via.placeholder.com/150' },
    { id: '5', title: 'Event 5', description: 'Exclusive Deal', image: 'https://via.placeholder.com/150' },
  ];



  // animation on flatlist

  const scrollX = useRef(new Animated.Value(0)).current;
  const previousScrollValue = useRef(0).current;
  const scrollViewRef = useRef(null);



  const handleScroll = (event) => {
    // Calculate the horizontal scroll position
    const scroll = event.nativeEvent.contentOffset.x;

    // Update animated value
    scrollX.setValue(scroll);
  };

  const handleSettingClick = () => {
    navigation.navigate('Settings')
  }

  const handleGamesClick = (index) => {
    setSelectedGame(index)
    scrollViewRef.current.scrollToIndex({ index, animated: true })
    // navigation.navigate('GameTierSelection',{game:name})
  }

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setSelectedGame(viewableItems[0].index);
    }
  }).current;

  const nowPlayGame = () => {
    console.log(gameTier + ",  " + selectedGame + ", " + selectedGameOption)
    if (selectedGame === 0) {
      if (selectedGameOption === 1) {
        setShowPriceModal(false)
        navigation.navigate('MatchMakingScreen', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 2) {
        setShowPriceModal(false)
        navigation.navigate('TournamentLobby', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 3) {
        setShowPriceModal(false)
        navigation.navigate('PrivateRoom', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      }
      else if (selectedGameOption === 4) {
        setShowPriceModal(false)
        navigation.navigate('LudoOffline', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      }
    }
    if (selectedGame === 1) {
      if (selectedGameOption === 1) {
        setShowPriceModal(false)
        navigation.navigate('MatchMakingScreen', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 2) {
        setShowPriceModal(false)
        navigation.navigate('TournamentLobby', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 3) {
        setShowPriceModal(false)
        navigation.navigate('PrivateRoom', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      }
      else if (selectedGameOption === 4) {
        setShowPriceModal(false)
        navigation.navigate('FourPlayerMatchMaking', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      }
    }
    if (selectedGame === 2) {
      if (selectedGameOption === 1) {
        setShowPriceModal(false)
        navigation.navigate('MatchMakingScreen', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 2) {
        setShowPriceModal(false)
        navigation.navigate('TournamentLobby', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 3) {
        setShowPriceModal(false)
        navigation.navigate('BackgammonOffline', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      }
      else if (selectedGameOption === 4) {
        setShowPriceModal(false)
        navigation.navigate('FourPlayerMatchMaking', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      }
    }
    if (selectedGame === 3) {
      if (selectedGameOption === 1) {
        setShowPriceModal(false)
        navigation.navigate('MatchMakingScreen', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 2) {
        setShowPriceModal(false)
        navigation.navigate('TournamentLobby', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 3) {
        setShowPriceModal(false)
        navigation.navigate('DominoesOffline', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      }
      else if (selectedGameOption === 4) {
        setShowPriceModal(false)
        navigation.navigate('FourPlayerMatchMaking', { game: selectedGame, type: selectedGameOption, amount: gameTier });
      }
    }
  }

  const optionsCard = (game) => {
    const isActive = game.index == selectedGame
    const rotateY = scrollX.interpolate({
      inputRange: [
        (selectedGame - 1) * responsiveWidth(100),
        selectedGame * responsiveWidth(100),
        (selectedGame + 1) * responsiveWidth(100),
      ],
      outputRange: [
        isActive ? "45deg" : "0deg", // Rotate left slide when scrolling right
        isActive ? "0deg" : (game.index < selectedGame ? "-45deg" : "45deg"), // Current slide rotation
        isActive ? "-45deg" : "0deg",  // Rotate right slide when scrolling left
      ],
      extrapolate: 'clamp',
    });
    const scale = scrollX.interpolate({
      inputRange: [
        (selectedGame - 1) * responsiveWidth(100),
        selectedGame * responsiveWidth(100),
        (selectedGame + 1) * responsiveWidth(100),
      ],
      outputRange: [0.8, 1, 0.8], // Scale down when moving out and scale up when coming in
      extrapolate: 'clamp',
    });


    return (
      <Animated.View style={{ transform: [{ scale }, { rotateY: rotateY }] }}>
        <Text style={{ flex: 1, textAlign: 'center', fontSize: responsiveWidth(6), fontWeight: 'bold', marginBottom: responsiveHeight(2), color: 'white' }}>{game.item.game}</Text>
        <View style={{ width: responsiveWidth(94), alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', height: responsiveHeight(46) }}>

          {
            game.item.options.map((item, index) => {

              return (
                <TouchableOpacity key={index} onPress={() => {
                  setShowPriceModal(true)
                  setSelectedGameOption(item.id)
                }}>
                  <View style={{ alignItems:"center", borderRadius: responsiveWidth(6),justifyContent:'flex-start', marginBottom: responsiveHeight(2),marginHorizontal: responsiveWidth(2), width: responsiveWidth(42), height: responsiveHeight(21), backgroundColor: item.id==1?'#333333':item.id==2?"#B9B64D":item.id==3?"#ed6047":item.id&&('#006bb3')}}>
                    <LinearGradient
                    key={index} style={{  alignItems: 'center', justifyContent: 'flex-end', width: responsiveWidth(42), height: responsiveHeight(20), borderRadius: responsiveWidth(6) }}
                    colors={index == 0 ?['#e0e0e0', '#9e9e9e', '#424242'] :index==1? ['#A3D05C', '#ffeb3b', '#A3D05C']:index==2? ['#c72c41', '#ff7f50', '#ff7f50']:['#00c6ff', '#0072ff','#00c6ff']} // Define your gradient colors
                      locations={[0, .5, 1]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }} >
                      {/* Starry background animation */}
                      <LottieView
                        source={require('../animation/starsAnimation.json')} // Add your Lottie stars animation here
                        autoPlay
                        loop
                        style={styles.stars}
                      />
                      <Image source={item.image} style={{ transform: [{ translateY: selectedGame == 1 && (item.id == 2 || item.id == 3) ? responsiveHeight(2) : 0 }], resizeMode: 'contain', width: responsiveWidth(36), height: selectedGame == 1 && (item.id == 2 || item.id == 3) ? responsiveHeight(17) : responsiveHeight(12) }} />
                      <Text style={{ fontSize: responsiveWidth(4), fontWeight: 'bold', marginVertical: responsiveHeight(1) }}>
                        {item.name}
                      </Text>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </Animated.View>
    )
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => alert(`Card clicked: ${item.title}`)}>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );




  return (
    <ImageBackground style={{ flex: 1 }} source={require('../assets/images/App-3d-Background.jpg')}>

      <Modal onRequestClose={() => { setShowPriceModal(false) }} transparent={true} onDismiss={() => { setShowPriceModal(false); setSelectedGameOption(null) }} visible={showPriceModal} >
        <View backgroundColor={'rgba(50,50,50,.3)'} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ padding: responsiveWidth(4), borderRadius: responsiveWidth(6), alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray', width: responsiveWidth(80), height: responsiveHeight(45) }}>
            <TouchableOpacity onPress={() => { setShowPriceModal(false) }} style={{ position: 'absolute', top: responsiveWidth(4), right: responsiveWidth(4) }}>
              <FontAwesome name='close' size={responsiveWidth(8)} color='black' />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              {
                gameTiers.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => { setGameTier(item) }}>
                      <View style={{ width: responsiveWidth(20), justifyContent: 'center', alignItems: "center", padding: responsiveWidth(4), borderRadius: responsiveWidth(6), borderWidth: 1, borderColor: gameTier == item ? 'orange' : 'white', margin: responsiveWidth(2) }}>
                        <Text style={{ fontSize: responsiveWidth(4), fontWeight: 'bold', color: gameTier == item ? 'orange' : 'white' }}>{item}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            <TouchableOpacity disabled={!gameTier} onPress={nowPlayGame} style={{ alignSelf: 'center', marginVertical: responsiveHeight(2), width: responsiveWidth(70), backgroundColor: 'black', padding: responsiveWidth(2), borderRadius: responsiveWidth(4), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: responsiveWidth(4), fontWeight: 'bold', color: 'white' }}> Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{ flex: 1, paddingHorizontal: responsiveWidth(3) }}>
        {/* HEADER */}

        <View style={{ borderRadius: responsiveWidth(5), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: responsiveWidth(2), marginVertical: responsiveHeight(1) }}>

          {/* ICON VIEW */}
          <TouchableOpacity onPress={handleSettingClick}>
            <View style={{ padding: responsiveWidth(2), borderRadius: responsiveHeight(10), borderWidth: responsiveWidth(.5), borderColor: 'gray' }}>
              <Ionicons name='settings' size={responsiveHeight(2.5)} color='gray' />
            </View>
          </TouchableOpacity>

          {/* shop icon somponent*/}
          <View style={{ paddingHorizontal: responsiveWidth(2), flexDirection: 'row', alignItems: 'center', borderRadius: responsiveWidth(4), borderWidth: responsiveWidth(.5), borderColor: 'gray' }}>
            <SimpleIcon name='basket' color='white' size={responsiveWidth(4)} />
            <Text style={{ color: 'white', fontSize: responsiveWidth(3), padding: responsiveWidth(1) }}>Shop</Text>
          </View>



          {/* coins component */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', borderWidth: responsiveWidth(.5), alignItems: 'center', borderColor: 'gray', borderWidth: responsiveWidth(.5), paddingRight: responsiveWidth(2), borderBottomLeftRadius: responsiveWidth(4), borderTopLeftRadius: responsiveWidth(4), }}>
              <Text style={{ padding: 1, marginHorizontal: responsiveWidth(4), color: 'white' }}>1000</Text>
            </View>
            <Image source={coinIcon} style={{ width: responsiveWidth(8), height: responsiveWidth(8), transform: [{ translateX: responsiveWidth(-2) }] }} />
          </View>
          <Image
            source={require('../assets/images/UserImage.png')} // Adjust the path as necessary
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
        </View>

        {/* <ScrollView style={{backgroundColor:"white",height:responsiveHeight(7),width:responsiveWidth(100)}}>

          </ScrollView> */}
        <View style={{ height: responsiveHeight(10), width: responsiveWidth(100) }}>
          <FlatList
            data={eventData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false} // Hide horizontal scroll bar
            contentContainerStyle={styles.listContentContainer}
          />
        </View>


        <View style={{ justifyContent: 'flex-end', alignItems: 'center', paddingVertical: responsiveHeight(2) }}>


          <FlatList
            horizontal={true}
            onScroll={handleScroll}
            ref={scrollViewRef}
            scrollEventThrottle={16}
            decelerationRate="fast"
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            data={gameOptions}
            style={{}}
            renderItem={(item, index) => {
              return (
                optionsCard(item)
              )
            }}
            onViewableItemsChanged={onViewableItemsChanged}
          />



          <View style={{ padding: responsiveWidth(2), flexDirection: 'row', borderWidth: responsiveWidth(1), borderColor: 'gray', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: responsiveWidth(6) }}>
            {
              gameOptions.map((item, index) => {
                // console.log(item)
                return (
                  <TouchableOpacity key={index} onPress={() => {
                    console.log(index)
                     handleGamesClick(index) }}>
                    <View key={index} style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: responsiveWidth(2) }}>
                      <View style={{ justifyContent: 'center', alignItems: 'center', padding: responsiveWidth(2), borderRadius: responsiveHeight(10) }}>
                        <Image
                          source={item.logo} // Adjust the path as necessary
                          style={{
                            resizeMode: 'contain',
                            width: responsiveWidth(8), // Responsive width
                            height: responsiveWidth(8), // Maintain aspect ratio
                          }}
                        />
                      </View>
                      <Text style={{ fontSize: responsiveWidth(3), color: selectedGame == index ? 'orange' : 'white' }}>{item.game}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>


      </View>

    </ImageBackground>



  )
}

const styles = StyleSheet.create({
  listContentContainer: {
    paddingHorizontal: 10,
  },
  cardImage: {
    width: '100%',
    height: '60%', // Image takes up 60% of the card height
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardText: {
    padding: responsiveWidth(2),
    justifyContent: 'flex-start',
    backgroundColor: 'gray',
    borderRadius: responsiveWidth(2),
    borderWidth: 1,
    borderColor: 'yellow',
    alignItems: 'flex-start',
    marginRight: responsiveWidth(1)
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  stars: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2
  },
  cardDescription: {
    fontSize: 12,
    color: 'white',
    marginTop: 5,
  },
  gameScreen: {
    backgroundColor: 'black',
    flex: 1
  },
  user: {
    description: { fontSize: responsiveHeight(1.2), color: 'gray' }
    , heading: { fontSize: responsiveHeight(2.2), fontWeight: 'bold', color: 'white' }
  },

  body: { padding: responsiveWidth(4), alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' },
  smallBody: { padding: responsiveWidth(4), alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', borderRadius: responsiveWidth(4) },
  largeBody: { padding: responsiveWidth(4), alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' },
  description: { fontSize: responsiveHeight(1.5), color: 'gray' }
  , heading: { fontSize: responsiveHeight(2), fontWeight: 'bold', color: 'white' }
}
)

export default HomeScreen