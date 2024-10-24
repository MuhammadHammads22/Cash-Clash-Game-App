import { View, Text, StatusBar, FlatList, Image, useWindowDimensions, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import MatchCard from '../components/MatchCard'
import { FontAwesome } from '@expo/vector-icons';
import ludoBackgroundimage from '../assets/images/background.png'
// import { io } from 'socket.io-client';


const GameTierSelectionScreen = ({navigation}) => {
  const tierList = [{ play: 'Single Match' }, { play: 'Tournament' }, { play: 'OffLine' }]
  const [currentSlide, setCurrentSlide] = useState(0);
  const game = useRoute().params.game
  const [selectedAmount,setSelectedAmount]=useState()
  const keyExtractor = (item, index) => index.toString();

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentSlide(viewableItems[0].index);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 70 }).current;

  const  returnAmountSelected=(amount)=>{
    setSelectedAmount(amount)
  }

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
    <View style={{ flex: 1, backgroundColor: '#050B18'}}>
      <ImageBackground source={ludoBackgroundimage} // Replace with your image URL
        style={{flex:1,paddingTop:responsiveHeight(12),}}
        resizeMode="cover" >
      <TouchableOpacity style={{position:'absolute',top:responsiveHeight(3),left:responsiveWidth(7)}} onPress={()=>{navigation.goBack()}}>
      <FontAwesome  name='chevron-left' size={responsiveWidth(8)} color="white"/>
      </TouchableOpacity>
      <FlatList
        data={tierList}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        renderItem={(item,index)=>{return(<MatchCard item={item} index={index} activeIndex={currentSlide} game={game} returnAmountSelected={returnAmountSelected} />)}}
        keyExtractor={keyExtractor}
        snapToInterval={responsiveWidth(80)}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: responsiveWidth(10),
          height:responsiveHeight(60),
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef}
      />

      <TouchableOpacity disabled={disabled} onPress={nowPlayGame} style={{ margin:responsiveWidth(6),justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(5), backgroundColor: disabled?"gray":"#F4D144", padding: responsiveWidth(4) }}>
        <Text style={{fontSize:responsiveWidth(6),fontWeight:'bold'}}>
          Play
        </Text>
      </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default GameTierSelectionScreen