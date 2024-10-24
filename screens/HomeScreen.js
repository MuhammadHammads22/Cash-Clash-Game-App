import { View, Text, StyleSheet, Image, SafeAreaView, KeyboardAvoidingView, ScrollView, TouchableOpacity, StatusBar, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import IonIcons from 'react-native-vector-icons/Ionicons'
import ludo from '../assets/images/ludoIcon.png'
import chess from '../assets/images/chessIcon.png'
import backgammon from '../assets/images/backgammonIcon.png'
import dominoes from '../assets/images/dominoesIcon.png'
import eventChess from '../assets/images/eventChess.png'
import eventBackgammon from '../assets/images/eventBackGammon.png'
import coinIcon from '../assets/images/coinIcon.png'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import { LinearGradient } from 'expo-linear-gradient';



const HomeScreen = ({ navigation }) => {
  const [selectedGame, setSelectedGame] = useState(0)
  const gamesData = [{ name: 'Chess', logo: chess }, { name: 'Ludo', logo: ludo }, { name: 'Backgammon', logo: backgammon }, { name: 'Dominoes', logo: dominoes }]
  const gameOptions = [{ id: 1, name: "1vs1", image: require('../assets/images/logo.png') }, { id: 2, name: "tournament", image: require('../assets/images/tournament.png') }]
  const [selectedGameOption, setSelectedGameOption] = useState()
  const [showPriceModal, setShowPriceModal] = useState(false)
  const gameTiers = [100, 200, 500, 1000, 2500, 5000]
  const [gameTier, setGameTier] = useState(100)

  const handleSettingClick = () => {
    navigation.navigate('Settings')
  }
  const handleGamesClick = (name) => {
    // console.log(name)
    setSelectedGame(name)
    // navigation.navigate('GameTierSelection',{game:name})
  }
  
  const handlePlayGame = () => {
    setSelectedGameOption(null)
    setShowPriceModal(false)
    if (selectedGame === 0) {
      if (selectedGameOption === 0) {
        navigation.navigate('MatchMakingScreen', { game: gamesData[selectedGame].name, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 1) {
        navigation.navigate('TournamentLobby', { game: gamesData[selectedGame].name, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 2) {
        navigation.navigate('ChessOffline');
      }
    }
    if (selectedGame === 1) {
      if (selectedGameOption === 0) {
        navigation.navigate('MatchMakingScreen',{ game: gamesData[selectedGame].name, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 1) {
        navigation.navigate('TournamentLobby', { game: gamesData[selectedGame].name, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 2) {
        navigation.navigate('LudoOffline');
      }
    }
    if (selectedGame === 2) {
      if (selectedGameOption === 0) {
        navigation.navigate('MatchMakingScreen', { game: gamesData[selectedGame].name, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 1) {
        navigation.navigate('TournamentLobby', { game: gamesData[selectedGame].name, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 2) {
        navigation.navigate('BackgammonOffline');
      }
    }
    if (selectedGame === 3) {
      if (selectedGameOption === 0) {
        navigation.navigate('MatchMakingScreen', { game: gamesData[selectedGame].name, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 1) {
        navigation.navigate('TournamentLobby', { game: gamesData[selectedGame].name, type: selectedGameOption, amount: gameTier });
      } else if (selectedGameOption === 2) {
        navigation.navigate('DominoesOffline');
      }
    }

  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050B18' }}>
      <Modal onRequestClose={() => { setShowPriceModal(false) }} transparent={true} onDismiss={() => { setShowPriceModal(false);setSelectedGameOption(null) }} visible={showPriceModal} >
        <View backgroundColor={'rgba(50,50,50,.3)'} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ padding: responsiveWidth(4), borderRadius: responsiveWidth(6),alignItems:'center', justifyContent: 'center', backgroundColor: 'gray', width: responsiveWidth(80), height: responsiveHeight(30)}}>
           
           <View style={{ flexDirection: 'row', flexWrap: 'wrap',justifyContent:'center'}}>
            {
              gameTiers.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => { setGameTier(item) }}>
                    <View style={{ width: responsiveWidth(20), justifyContent: 'center', alignItems: "center", padding: responsiveWidth(4), borderRadius: responsiveWidth(6), borderWidth: 1, borderColor: gameTier == item ? 'orange' : 'white',margin:responsiveWidth(2) }}>
                      <Text style={{ fontSize: responsiveWidth(4), fontWeight: 'bold', color: gameTier == item ? 'orange' : 'white' }}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
            </View>
            <TouchableOpacity onPress={handlePlayGame} style={{ alignSelf:'center',marginVertical: responsiveHeight(2),width:responsiveWidth(70), backgroundColor: 'black', padding: responsiveWidth(2), borderRadius: responsiveWidth(4), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: responsiveWidth(4), fontWeight: 'bold', color: 'white' }}> Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#050B18', paddingVertical: responsiveHeight(1), paddingHorizontal: responsiveWidth(3) }}>
          {/* HEADER */}

          <View style={{ borderRadius: responsiveWidth(5), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: responsiveWidth(2), marginVertical: responsiveHeight(2) }}>

            {/* ICON VIEW */}
            <TouchableOpacity onPress={handleSettingClick}>
              <View style={{ padding: responsiveWidth(2), borderRadius: responsiveHeight(10), borderWidth: responsiveWidth(.5), borderColor: 'gray' }}>
                <IonIcons name='settings' size={responsiveHeight(2.5)} color='gray' />
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
                width: responsiveWidth(17), // Responsive width
                height: responsiveWidth(17), // Maintain aspect ratio
                marginRight: responsiveWidth(0)
              }}
            />
          </View>

          <View style={{ marginTop: responsiveHeight(2) }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {
                gameOptions.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => { setShowPriceModal(!showPriceModal); setSelectedGameOption(index) }}>
                      <LinearGradient
                        key={index} style={{ marginBottom: responsiveHeight(2), alignItems: 'center', justifyContent: 'flex-end', marginHorizontal: responsiveWidth(2), width: responsiveWidth(43), height: responsiveHeight(25), backgroundColor: 'orange', borderRadius: responsiveWidth(6) }}
                        colors={index == 1 ? ['#4caf50', '#ffeb3b', '#1e88e5'] : ['#c72c41', '#ff7f50', '#c72c41']} // Define your gradient colors
                        locations={[0, .5, 1]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }} >
                        <Image source={item.image} style={{ width: 150, height: 100 }} />
                        <Text style={{ fontSize: responsiveWidth(4), fontWeight: 'bold', marginVertical: responsiveHeight(1) }}>
                          {item.name}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            <View style={{ marginBottom: responsiveHeight(2.5), padding: responsiveWidth(2), flexDirection: 'row', borderWidth: responsiveWidth(1), borderColor: 'gray', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: responsiveWidth(6) }}>
              {
                gamesData.map((item, index) => {
                  // console.log(item)
                  return (
                    <TouchableOpacity key={index} onPress={() => { handleGamesClick(index) }}>
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
                        <Text style={{ fontSize: responsiveWidth(3), color: selectedGame == index ? 'orange' : 'white' }}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>


        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
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