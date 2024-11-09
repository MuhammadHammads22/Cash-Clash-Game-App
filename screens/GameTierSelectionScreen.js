import { View, Text, StatusBar, FlatList, Image, useWindowDimensions, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import MatchCard from '../components/MatchCard'
import { FontAwesome } from '@expo/vector-icons';
import ludoBackgroundimage from '../assets/images/background.png'
import { LinearGradient } from 'expo-linear-gradient'
// import { io } from 'socket.io-client';


const GameTierSelectionScreen = ({navigation}) => {
  const game = useRoute().params.game
  const [selectedAmount,setSelectedAmount]=useState()
  const bettingAmountList = [0,100, 200, 400, 1000, 2500, 10000]
  
  const disabled=selectedAmount==0 && currentSlide!==2

  const nowPlayGame=()=>{

        if (game === 'Chess') {
          if (currentSlide === 0) {
            navigation.navigate('MatchMakingScreen', {game:game,type:currentSlide,amount:selectedAmount});
          } else if (currentSlide === 1) {
            navigation.navigate('TournamentLobby', {game:game,type:currentSlide,amount:selectedAmount});
          } else if (currentSlide === 2) {
            navigation.navigate('ChessOffline');
          }
        }
        if (game === 'Ludo') {
          if (currentSlide === 0) {
            navigation.navigate('MatchMakingScreen', {game:game,type:currentSlide,amount:selectedAmount});
          } else if (currentSlide === 1) {
            navigation.navigate('TournamentLobby', {game:game,type:currentSlide,amount:selectedAmount});
          } else if (currentSlide === 2) {
            navigation.navigate('LudoOffline');
          }
        }
        if (game === 'Backgammon') {
          if (currentSlide === 0) {
            navigation.navigate('MatchMakingScreen', {game:game,type:currentSlide,amount:selectedAmount});
          } else if (currentSlide === 1) {
            navigation.navigate('TournamentLobby', {game:game,type:currentSlide,amount:selectedAmount});
          } else if (currentSlide === 2) {
            navigation.navigate('BackgammonOffline');
          }
        }
        if (game === 'Dominoes') {
          if (currentSlide === 0) {
            navigation.navigate('MatchMakingScreen', {game:game,type:currentSlide,amount:selectedAmount});
          } else if (currentSlide === 1) {
            navigation.navigate('TournamentLobby', {game:game,type:currentSlide,amount:selectedAmount});
          } else if (currentSlide === 2) {
            navigation.navigate('DominoesOffline');
          }
        }
      
      }

  return (
    <LinearGradient
     style={{ flex:1, alignItems: 'center', justifyContent: 'flex-start' }}
    colors={ ['#35234b',
        '#2975bf',
        '#3d54b1']} // Define your gradient colors
    locations={[0, .5, 1]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }} >
          
      <View style={{width:responsiveWidth(100),padding:responsiveWidth(4)}}> 
      <TouchableOpacity onPress={()=>{navigation.goBack()}}>
      <FontAwesome  name='chevron-left' size={responsiveWidth(8)} color="white"/>
      </TouchableOpacity>   
      </View>
      {/* <View style={{}}>
        <Text></Text>
        <View>
          <TouchableOpacity>

          </TouchableOpacity>
          <View>

            <Text></Text>
          </View>
          <TouchableOpacity>

          </TouchableOpacity>
        </View>
      </View> */}
    
      <TouchableOpacity disabled={disabled} onPress={nowPlayGame} style={{ margin:responsiveWidth(6),justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(5), backgroundColor: disabled?"gray":"#F4D144", padding: responsiveWidth(4) }}>
        <Text style={{fontSize:responsiveWidth(6),fontWeight:'bold'}}>
          Play
        </Text>
      </TouchableOpacity>
  </LinearGradient>
  )
}

export default GameTierSelectionScreen