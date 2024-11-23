// screens/LeaderboardScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, SafeAreaView, Platform, ImageBackground } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import firstPosition from '../assets/images/firstPosition.png'
import secondPosition from '../assets/images/secondPosition.png'
import thirdPosition from '../assets/images/thirdPosition.png'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import tw from 'twrnc';
import LeaderBoardListItem from '../components/LeaderBoardListItem';

const leaderBoardData = [
  // { id: 24, position: 1, name: "allan", score: 55 }, 
  // { id: 63, position: 2, name: "john", score: 52 },
  //  { id: 7, position: 3, name: "kareem", score: 51 },
  { id: 91, position: 4, name: "haris", score: 45, isCurrentPlayer: true },  // Current player
  { id: 24, position: 5, name: "allan", score: 42, isCurrentPlayer: false },
  { id: 24, position: 6, name: "allan", score: 40, isCurrentPlayer: false },
  { id: 24, position: 7, name: "allan", score: 39, isCurrentPlayer: false },
  { id: 24, position: 8, name: "allan", score: 34, isCurrentPlayer: false },
  { id: 24, position: 9, name: "allan", score: 34, isCurrentPlayer: false },
  { id: 24, position: 10, name: "allan", score: 32, isCurrentPlayer: false },
  { id: 24, position: 11, name: "allan", score: 30, isCurrentPlayer: false },
  { id: 24, position: 12, name: "allan", score: 20, isCurrentPlayer: false },
  { id: 24, position: 13, name: "allan", score: 19, isCurrentPlayer: false }]

const LeaderboardScreen = () => {
  return (
    // screen view
    <SafeAreaView style={[styles.leaderboardScreen,{paddingTop:Platform.OS=='android'?responsiveHeight(4):0}]}> 
<ImageBackground  style={{ flex: 1 }} source={require('../assets/images/App-3d-Background.jpg')}>
      {/* heading */}
      <Text style={{ color: 'white', padding: responsiveWidth(2), alignSelf: 'center', fontSize: responsiveWidth(6), fontWeight: 'bold', marginBottom: responsiveHeight(2) }}>LeaderBoard</Text>


      {/* Top 3 View */}
      <View style={{ height:responsiveHeight(27.5),justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', paddingHorizontal: responsiveWidth(4), marginVertical: responsiveHeight(2),marginBottom:responsiveHeight(4) }}>

        {/* 2nd */}
        <View style={{ justifyContent: 'center', alignItems: 'center', transform: [{ translateY: responsiveHeight(4) }] }}>
          <View style={{ marginBottom: responsiveWidth(7) }}>
            <Image
              source={secondPosition} // Adjust the path as necessary
              style={{
                borderRadius: responsiveWidth(14),
                resizeMode: 'cover',
                width: responsiveWidth(25), // Responsive width
                height: responsiveWidth(25), // Maintain aspect ratio
                borderColor: '#4A4B28',
                borderWidth: responsiveWidth(1)
              }}
            />
            <View style={{ height: responsiveWidth(9), width: responsiveWidth(9), alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 1, bottom: responsiveWidth(-6), left: responsiveWidth(8.5), borderRadius: responsiveWidth(10), backgroundColor: '#4A4B28', padding: responsiveWidth(1) }}>
              <Text style={{ fontSize: responsiveWidth(5), fontWeight: '900', color: 'white' }}>2</Text>
            </View>
          </View>
          <Text style={{ fontSize: responsiveWidth(4), color: 'white', fontWeight: 'bold' }}>john</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: responsiveWidth(1) }}>
            <MaterialCommunityIcons name='bitcoin' size={responsiveWidth(4)} color='#F4D144' />
            <Text style={{ marginLeft: responsiveWidth(.5), fontSize: responsiveWidth(3.5), fontWeight: '300', color: 'white' }}>52 pts</Text>
          </View>
        </View>



        {/* 1st */}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

          <FontAwesome6 name="crown" color="#F4D144" style={{
            zIndex: 1,
            position: 'absolute',
            top: responsiveWidth(-6), left: responsiveWidth(10)
          }} size={responsiveWidth(8)} />
          <View style={{ marginBottom: responsiveWidth(7) }}>
            <Image
              source={firstPosition} // Adjust the path as necessary
              style={{
                borderRadius: responsiveWidth(14),
                resizeMode: 'cover',
                width: responsiveWidth(28), // Responsive width
                height: responsiveWidth(28), // Maintain aspect ratio
                borderColor: '#4A4B28',
                borderWidth: responsiveWidth(1)
              }}
            />
            <View style={{ height: responsiveWidth(9), width: responsiveWidth(9), alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 1, bottom: responsiveWidth(-6), left: responsiveWidth(9.5), borderRadius: responsiveWidth(10), backgroundColor: '#4A4B28', padding: responsiveWidth(1) }}>
              <Text style={{ fontSize: responsiveWidth(5), fontWeight: '900', color: 'white' }}>1</Text>
            </View>
          </View>
          <Text style={{ fontSize: responsiveWidth(4), color: 'white', fontWeight: 'bold' }}>allan</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: responsiveWidth(1) }}>
            <MaterialCommunityIcons name='bitcoin' size={responsiveWidth(4)} color='#F4D144' />
            <Text style={{ marginLeft: responsiveWidth(.5), fontSize: responsiveWidth(3.5), fontWeight: '300', color: 'white' }}>55 pts</Text>
          </View>
        </View>



        {/* 3rd */}
        <View style={{ justifyContent: 'center', alignItems: 'center', transform: [{ translateY: responsiveHeight(4) }] }}>
        <View style={{ marginBottom: responsiveWidth(7) }}>
            <Image
              source={thirdPosition} // Adjust the path as necessary
              style={{
                borderRadius: responsiveWidth(14),
                resizeMode: 'cover',
                width: responsiveWidth(25), // Responsive width
                height: responsiveWidth(25), // Maintain aspect ratio
                borderColor: '#4A4B28',
                borderWidth: responsiveWidth(1)
              }}
            />
            <View style={{ height: responsiveWidth(9), width: responsiveWidth(9), alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 1, bottom: responsiveWidth(-6), left: responsiveWidth(8.5), borderRadius: responsiveWidth(10), backgroundColor: '#4A4B28', padding: responsiveWidth(1) }}>
              <Text style={{ fontSize: responsiveWidth(5), fontWeight: '900', color: 'white' }}>3</Text>
            </View>
          </View>
          <Text style={{ fontSize: responsiveWidth(4), color: 'white', fontWeight: 'bold' }}>kareem</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: responsiveWidth(1) }}>
            <MaterialCommunityIcons name='bitcoin' size={responsiveWidth(4)} color='#F4D144' />
            <Text style={{ marginLeft: responsiveWidth(.5), fontSize: responsiveWidth(3.5), fontWeight: '300', color: 'white' }}>51 pts</Text>
          </View>
        </View>


      </View>


      {/* remaining list */}
      <View style={{flex:1,borderColor:'white',borderWidth:1,paddingVertical:responsiveWidth(1),paddingHorizontal:responsiveWidth(4),borderTopLeftRadius:responsiveWidth(8),borderTopRightRadius:responsiveWidth(8)}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{borderTopLeftRadius:responsiveWidth(8),borderTopRightRadius:responsiveWidth(8)}} >
      <View style={{height:responsiveHeight(2)}}></View>
      {
        leaderBoardData.map((item,index)=>{return(
            <LeaderBoardListItem key={index} data={item} />
        )
          })
      }


      </ScrollView>
      </View>

      </ImageBackground>
    </SafeAreaView>


  );
};


const styles = StyleSheet.create({
  leaderboardScreen: {
    flex: 1,
    backgroundColor: '#050B18',
  }
})

export default LeaderboardScreen;

