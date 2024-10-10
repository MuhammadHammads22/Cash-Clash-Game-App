import { View, Text, StyleSheet, Image, SafeAreaView, KeyboardAvoidingView, ScrollView, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import IonIcons from 'react-native-vector-icons/Ionicons'
import ludo from '../assets/images/ludoIcon.png'
import chess from '../assets/images/chessIcon.png'
import backgammon from '../assets/images/backgammonIcon.png'
import dominoes from '../assets/images/dominoesIcon.png'
import eventChess from '../assets/images/eventChess.png'
import eventBackgammon from '../assets/images/eventBackGammon.png'




const HomeScreen = ({ navigation }) => {
  const eventsData = [{ event: 'Chess', Image: eventChess }, { event: 'BackGammon', Image: eventBackgammon }]
  const playerCategory = [{ index: 1, category: 'All' }, { index: 2, category: 'Double Player' }, { index: 3, category: 'Multi Player' }]
  const [selectedplayerCategory, setSelectedplayerCategory] = useState(1)
  // const doublePlayerGames=[{ name: 'Chess', Image: chess }, { name: 'BackGammon', Image: backgammon }]
  // const multiPlayerGames=[{ name: 'Ludo', Image: ludo }, { name: 'Dominoes', Image: dominoes }]
  const gamesData = selectedplayerCategory == 1 ? [{ name: 'Chess', logo: chess }, { name: 'Ludo', logo: ludo }, { name: 'Backgammon', logo: backgammon }, { name: 'Dominoes', logo: dominoes }] : selectedplayerCategory == 2 ? [{ name: 'Chess', logo: chess }, { name: 'BackGammon', logo: backgammon }] : [{ name: 'Ludo', logo: ludo }, { name: 'Dominoes', logo: dominoes }]


  const handleSettingClick = () => {
    navigation.navigate('Settings')
  }
  const handleGamesClick = () => {
    navigation.navigate('BottomSheet')
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050B18' }}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#050B18', paddingVertical: responsiveHeight(1), paddingHorizontal: responsiveWidth(3) }}>
          {/* HEADER */}

          <View style={{ borderRadius: responsiveWidth(5), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: responsiveWidth(2), marginVertical: responsiveHeight(2) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/images/UserImage.png')} // Adjust the path as necessary
                style={{
                  borderRadius: responsiveWidth(10),
                  resizeMode: 'contain',
                  width: responsiveWidth(17), // Responsive width
                  height: responsiveWidth(17), // Maintain aspect ratio
                  marginRight: responsiveWidth(7)
                }}
              />
              {/* USERNAME VIEW */}
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.user.description}>Morning</Text>
                <Text style={styles.user.heading}>User1</Text>
              </View>
            </View>
            {/* ICON VIEW */}
            <TouchableOpacity onPress={handleSettingClick}>
              <View style={{ padding: responsiveWidth(2), backgroundColor: '#1F2430', borderRadius: responsiveHeight(10) }}>
                <IonIcons name='settings' size={responsiveHeight(2.5)} color='gray' />
              </View>
            </TouchableOpacity>
          </View>
          {/* player Stats */}
          <View style={{ height: responsiveHeight(21), flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <View style={{ height: responsiveHeight(20), width: responsiveWidth(23), borderColor: 'gray', borderWidth: 1, paddingVertical: responsiveHeight(2), padding: responsiveWidth(2), alignItems: 'center', justifyContent: 'center', borderRadius: responsiveWidth(4) }}>
              {/* first view */}
              <View style={{ paddingVertical: responsiveWidth(2), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.description}>Played</Text>
                <Text style={styles.heading}>2.7k</Text>
              </View>
              {/* line */}
              <View style={{ backgroundColor: 'gray', width: responsiveWidth(14), height: 1, marginVertical: responsiveHeight(1) }}></View>
              {/* seconf View */}
              <View style={{ paddingVertical: responsiveWidth(2), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.description}>Popularity</Text>
                <Text style={styles.heading}>5.7k</Text>
              </View>
            </View>
            <View style={{ overflow: 'hidden', marginLeft: responsiveWidth(3), height: responsiveHeight(20), width: responsiveWidth(60), borderRadius: responsiveWidth(4) }}>
              <Image
                source={require('../assets/images/VideoCard.png')} // Adjust the path as necessary
                style={{
                  width: responsiveWidth(60),
                  height: responsiveHeight(20),
                  resizeMode: "cover"
                }}
              />
            </View>
          </View>



          <View style={{ marginTop: responsiveHeight(2) }}>
            {/* first row */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginHorizontal: responsiveWidth(1.5), padding: responsiveWidth(2) }}>
              <Text style={{ color: 'white', fontSize: responsiveWidth(5), fontWeight: 'bold' }}>Games</Text>
              {/* <Text style={{ color: 'white', fontSize: responsiveWidth(3), color: 'gray' }}>Show all</Text> */}
            </View>


            {/* Filterout singleplayer and multipleplayer games section */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', margin: responsiveWidth(2) }}>

              {
                playerCategory.map((item, index) => {
                  return (
                    <TouchableOpacity onPress={() => { setSelectedplayerCategory(item.index) }} style={{ backgroundColor: selectedplayerCategory == item.index ? 'orange' : 'gray', alignItems: 'center', justifyContent: 'center', marginRight: responsiveWidth(2), borderRadius: responsiveWidth(3), width: responsiveWidth(25), padding: responsiveWidth(2) }}>
                      <Text style={{ color: selectedplayerCategory == item.index ? 'black' : 'white' }}>{item.category} </Text>
                    </TouchableOpacity>
                  )
                })
              }

              {/* <TouchableOpacity style={{ backgroundColor: 'orange', alignItems: 'center', justifyContent: 'center', width: responsiveWidth(25), borderRadius: responsiveWidth(3), padding: responsiveWidth(2) }}>
                <Text>MultiPlayer</Text>
              </TouchableOpacity> */}
            </View>


            {/* horizontal scroll */}
            <View style={{ height: responsiveHeight(18), marginHorizontal: responsiveWidth(-3) }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1, marginBottom: responsiveHeight(2.5), padding: responsiveWidth(1), flexDirection: 'row' }}>
                {/* <View style={{flexDirection:'row',alignItems:'center',marginVertical:responsiveHeight(3),padding:responsiveWidth(2)}}> */}
                {

                  gamesData.map((item, index) => {
                    // console.log(item)
                    return (
                      <TouchableOpacity onPress={()=>{handleGamesClick()}}>
                        <View key={index} style={{ height: responsiveHeight(15), alignItems: 'center', justifyContent: 'center' }}>
                          <View style={{ marginHorizontal: responsiveWidth(3), justifyContent: 'center', alignItems: 'center', width: responsiveWidth(20), height: responsiveWidth(20), padding: responsiveWidth(3), backgroundColor: '#1F2430', borderRadius: responsiveHeight(10) }}>
                            <Image
                              source={item.logo} // Adjust the path as necessary
                              style={{
                                borderRadius: responsiveWidth(10),
                                resizeMode: 'contain',
                                width: responsiveWidth(12), // Responsive width
                                height: responsiveWidth(12), // Maintain aspect ratio
                              }}
                            />
                          </View>
                          <Text style={{ marginTop: responsiveHeight(1), color: 'white' }}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })

                }
                {/* </View> */}
              </ScrollView>
            </View>
          </View>


          {/* popular event */}
          <View style={{ marginTop: responsiveHeight(2) }}>
            {/* first row */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginHorizontal: responsiveWidth(1.5), padding: responsiveWidth(2) }}>
              <Text style={{ color: 'white', fontSize: responsiveWidth(5), fontWeight: 'bold' }}>Popular Event</Text>
              {/* <Text style={{ color: 'white', fontSize: responsiveWidth(3), color: 'gray' }}>Show all</Text> */}
            </View>
            {/* horizontal scroll */}
            <View style={{ height: responsiveHeight(25), marginHorizontal: responsiveWidth(-3) }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1, padding: responsiveWidth(2), marginLeft: responsiveWidth(2) }}>
                {
                  eventsData.map((item, index) => {
                    return (
                      <View key={index} style={{ width: responsiveWidth(54), height: responsiveHeight(22), marginRight: responsiveWidth(5), padding: responsiveWidth(2), borderRadius: responsiveWidth(5), backgroundColor: '#1F2430' }}>
                        <Image
                          source={item.Image} // Adjust the path as necessary
                          style={{
                            alignSelf: 'center',
                            borderRadius: responsiveWidth(4),
                            resizeMode: 'contain',
                            width: responsiveWidth(50), // Responsive width
                            // height: responsiveWidth(18), // Maintain aspect ratio
                            // marginRight: responsiveWidth(5)
                          }}
                        />
                        <View style={{ padding: responsiveWidth(2) }}>
                          <Text style={{ color: 'white', fontWeight: 'semibold' }}>{item.event}</Text>
                          <Text style={{ color: 'white', fontWeight: 'semibold' }}>Tournament</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </View>
          </View>


          <View style={{ marginHorizontal: responsiveWidth(1.5), marginTop: responsiveHeight(1), padding: responsiveWidth(2) }}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveWidth(5) }}>Offline Games</Text></View>
          <View style={{ height: responsiveHeight(18), marginHorizontal: responsiveWidth(-3) }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1, marginBottom: responsiveHeight(2.5), padding: responsiveWidth(1), flexDirection: 'row' }}>
              {/* <View style={{flexDirection:'row',alignItems:'center',marginVertical:responsiveHeight(3),padding:responsiveWidth(2)}}> */}
              {
                gamesData.map((item, index) => {
                  // console.log(item)
                  return (
                    <View key={index} style={{ height: responsiveHeight(15), alignItems: 'center', justifyContent: 'center' }}>
                      <View style={{ marginHorizontal: responsiveWidth(3), justifyContent: 'center', alignItems: 'center', width: responsiveWidth(20), height: responsiveWidth(20), padding: responsiveWidth(3), backgroundColor: '#1F2430', borderRadius: responsiveHeight(10) }}>
                        <Image
                          source={item.logo} // Adjust the path as necessary
                          style={{
                            borderRadius: responsiveWidth(10),
                            resizeMode: 'contain',
                            width: responsiveWidth(12), // Responsive width
                            height: responsiveWidth(12), // Maintain aspect ratio
                          }}
                        />
                      </View>
                      <Text style={{ marginTop: responsiveHeight(1), color: 'white' }}>{item.name}</Text>
                    </View>
                  )
                })

              }
              {/* </View> */}
            </ScrollView>
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