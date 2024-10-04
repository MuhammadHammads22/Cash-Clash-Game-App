import { View, Text, StyleSheet, Image, SafeAreaView, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import IonIcons from 'react-native-vector-icons/Ionicons'
import ludo from '../assets/images/ludoIcon.png'
import chess from '../assets/images/chessIcon.png'
import backgammon from '../assets/images/backgammonIcon.png'
import dominoes from '../assets/images/dominoesIcon.png'
import eventChess from '../assets/images/eventChess.png'
import eventBackgammon from '../assets/images/eventBackGammon.png'




const HomeScreen = ({navigation}) => {
  const gamesData = [{ name: 'Chess', logo: chess }, { name: 'Ludo', logo: ludo }, { name: 'Backgammon', logo: backgammon }, { name: 'Dominoes', logo: dominoes }]
  const eventsData = [{ event: 'Chess', Image: eventChess }, { event: 'BackGammon', Image: eventBackgammon }]
const handleSettingClick=()=>{
  navigation.navigate('Settings')
}
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#050B18', paddingVertical: responsiveHeight(3), paddingHorizontal: responsiveWidth(3) }}>
        {/* HEADER */}

        <View style={{ borderRadius: responsiveWidth(5), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: responsiveWidth(3), marginVertical: responsiveHeight(3) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../assets/images/UserImage.png')} // Adjust the path as necessary
              style={{
                borderRadius: responsiveWidth(10),
                resizeMode: 'contain',
                width: responsiveWidth(18), // Responsive width
                height: responsiveWidth(18), // Maintain aspect ratio
                marginRight: responsiveWidth(5)
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
          <View style={{ padding: responsiveWidth(3), backgroundColor: '#1F2430', borderRadius: responsiveHeight(10) }}>
            <IonIcons name='settings' size={responsiveHeight(3)} color='gray' />
          </View>
          </TouchableOpacity>
        </View>
        {/* player Stats */}
        <View style={{ height: responsiveHeight(21), flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <View style={{ height: responsiveHeight(20), width: responsiveWidth(23), borderColor: 'gray', borderWidth: 1, paddingVertical: responsiveHeight(2), padding: responsiveWidth(2), alignItems: 'center', justifyContent: 'center', borderRadius: responsiveWidth(4) }}>
            {/* first view */}
            <View style={{ padding: responsiveWidth(2), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.description}>Played</Text>
              <Text style={styles.heading}>2.7k</Text>
            </View>
            {/* line */}
            <View style={{ backgroundColor: 'gray', width: responsiveWidth(14), height: 1, marginVertical: responsiveHeight(1) }}></View>
            {/* seconf View */}
            <View style={{ padding: responsiveWidth(2), alignItems: 'center', justifyContent: 'center' }}>
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
        <View style={{ marginHorizontal: responsiveWidth(1.5), marginTop: responsiveHeight(1), padding: responsiveWidth(2) }}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveWidth(5) }}>Games</Text></View>
        <View style={{ height: responsiveHeight(15), marginHorizontal: responsiveWidth(-3) }}>
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

        {/* popular event */}
        <View>
          {/* first row */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginHorizontal: responsiveWidth(1.5), padding: responsiveWidth(2) }}>
            <Text style={{ color: 'white', fontSize: responsiveWidth(5), fontWeight: 'bold' }}>Popular Event</Text>
            <Text style={{ color: 'white', fontSize: responsiveWidth(3), color: 'gray' }}>Show all</Text>
          </View>
          {/* horizontal scroll */}
          <View style={{ height: responsiveHeight(25), marginHorizontal: responsiveWidth(-3) }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1, padding: responsiveWidth(2), marginLeft: responsiveWidth(2) }}>
              {
                eventsData.map((item, index) => {
                  return (
                    <View key={index} style={{ width: responsiveWidth(54), height: responsiveHeight(22), marginRight: responsiveWidth(3), padding: responsiveWidth(1.5), borderRadius: responsiveWidth(5), backgroundColor: '#1F2430' }}>
                      <Image
                        source={item.Image} // Adjust the path as necessary
                        style={{
                          alignSelf: 'center',
                          borderRadius: responsiveWidth(6),
                          resizeMode: 'contain',
                          width: responsiveWidth(56), // Responsive width
                          // height: responsiveWidth(18), // Maintain aspect ratio
                          // marginRight: responsiveWidth(5)
                        }}
                      />
                      <View style={{padding:responsiveWidth(2)}}>
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

      </View>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  gameScreen: {
    backgroundColor: 'black',
    flex: 1
  },
  user: {
    description: { fontSize: responsiveHeight(2), color: 'gray' }
    , heading: { fontSize: responsiveHeight(3), fontWeight: 'bold', color: 'white' }
  },

  body: { padding: responsiveWidth(4), alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' },
  smallBody: { padding: responsiveWidth(4), alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', borderRadius: responsiveWidth(4) },
  largeBody: { padding: responsiveWidth(4), alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' },
  description: { fontSize: responsiveHeight(1.5), color: 'gray' }
  , heading: { fontSize: responsiveHeight(2), fontWeight: 'bold', color: 'white' }
}
)

export default HomeScreen