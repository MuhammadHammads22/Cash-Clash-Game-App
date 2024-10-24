import React, { useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Line, Path } from 'react-native-svg';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

const TournamentLobbyScreen = () => {
  const scrollViewRef = useRef();

  const scrollToSecondRound = () => {
    scrollViewRef.current.scrollTo({ x: 170, animated: true });
  };
  const scrollToFinalRound = () => {
    scrollViewRef.current.scrollTo({ x: 600, animated: true });
  };

  const MatchCard = ({ player1, player2, sizeMultiplier = 1 }) => {
    return (
      <View style={[styles.matchCard, { 
        width: responsiveWidth(40) * sizeMultiplier, 
        height: responsiveHeight(15) * sizeMultiplier 
      }]}>
        <View style={styles.player}>
          <Image 
            source={{ uri: player1.image }} 
            style={[styles.playerImage, { 
              width: responsiveWidth(15) * sizeMultiplier, 
              height: responsiveWidth(15) * sizeMultiplier 
            }]} 
          />
          <Text style={[styles.playerName, { fontSize: responsiveFontSize(2) * sizeMultiplier }]}>
            {player1.name}
          </Text>
        </View>
        <View style={styles.player}>
          <Image 
            source={{ uri: player2.image }} 
            style={[styles.playerImage, { 
              width: responsiveWidth(15) * sizeMultiplier, 
              height: responsiveWidth(15) * sizeMultiplier 
            }]} 
          />
          <Text style={[styles.playerName, { fontSize: responsiveFontSize(2) * sizeMultiplier }]}>
            {player2.name}
          </Text>
        </View>
      </View>
    );
  };

  // const CurvedLine = ({ xStart, xEnd, yStart, yEnd }) => {
  //   const curve = `M ${xStart} ${yStart} Q ${(xStart + xEnd) / 2} ${(yStart + yEnd) / 2}, ${xEnd} ${yEnd}`;
  //   return (
  //     <Svg height="100%" width="100%" style={styles.curve}>
  //       <Path d={curve} fill="transparent" stroke="black" strokeWidth="2" />
  //     </Svg>
  //   );
  // };

  return (
    <View style={styles.container}>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} ref={scrollViewRef}>
        {/* First 4 matches in vertical layout */}
        <View style={styles.roundContainer}>
          <View style={styles.round}>
             <MatchCard player1={{ name: 'Player 1', image: 'https://via.placeholder.com/100' }} player2={{ name: 'Player 2', image: 'https://via.placeholder.com/100' }} />
            <MatchCard player1={{ name: 'Player 3', image: 'https://via.placeholder.com/100' }} player2={{ name: 'Player 4', image: 'https://via.placeholder.com/100' }} />
            <MatchCard player1={{ name: 'Player 5', image: 'https://via.placeholder.com/100' }} player2={{ name: 'Player 6', image: 'https://via.placeholder.com/100' }} />
            <MatchCard player1={{ name: 'Player 7', image: 'https://via.placeholder.com/100' }} player2={{ name: 'Player 8', image: 'https://via.placeholder.com/100' }} />
          </View>
        </View>



        

        {/* Second round with 2 vertically aligned matches centered */}
        <View style={[styles.roundContainer,{zIndex:1}]}>
          <View style={[styles.roundCenter,{}]}>
            <MatchCard player1={{ name: 'Winner 1', image: 'https://via.placeholder.com/100' }} player2={{ name: 'Winner 2', image: 'https://via.placeholder.com/100' }} sizeMultiplier={1.3} />
            <MatchCard player1={{ name: 'Winner 3', image: 'https://via.placeholder.com/100' }} player2={{ name: 'Winner 4', image: 'https://via.placeholder.com/100' }} sizeMultiplier={1.3}/>
          </View>
        </View>

        <View style={{position:"absolute",width:responsiveWidth(17),height:responsiveHeight(20),left:responsiveWidth(53),top:responsiveHeight(19.3),borderBottomColor:'white',borderTopColor:"white",borderRightWidth:3,borderRightColor:'#F0F0F0',borderTopRightRadius:10,borderBottomRightRadius:10,borderBottomWidth:responsiveWidth(1.5),borderTopWidth:responsiveWidth(1.5)}}></View>
        <View style={{position:"absolute",width:responsiveWidth(17),height:responsiveHeight(20),left:responsiveWidth(53),top:responsiveHeight(60.3),borderBottomColor:'white',borderTopColor:"white",borderRightWidth:3,borderRightColor:'#F0F0F0',borderTopRightRadius:10,borderBottomRightRadius:10,borderBottomWidth:responsiveWidth(1.5),borderTopWidth:responsiveWidth(1.5)}}></View>


          
          <View style={{position:"absolute",width:responsiveWidth(17),height:responsiveHeight(24),left:responsiveWidth(120),top:responsiveHeight(38),borderBottomColor:'white',borderTopColor:"white",borderRightWidth:3,borderRightColor:'#F0F0F0',borderTopRightRadius:10,borderBottomRightRadius:10,borderBottomWidth:responsiveWidth(1.5),borderTopWidth:responsiveWidth(1.5)}}></View>

       

        {/* Final match */}
        <View style={[styles.roundContainer,{zIndex:1,marginLeft:responsiveWidth(20),marginRight:responsiveWidth(20)}]}>
          <View style={styles.roundCenter}>
            <MatchCard player1={{ name: 'Winner 5', image: 'https://via.placeholder.com/100' }} player2={{ name: 'Winner 6', image: 'https://via.placeholder.com/100' }} sizeMultiplier={1.5}/>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity onPress={scrollToSecondRound} style={styles.winButton}>
        <Text>Simulate Win & Scroll</Text>
      </TouchableOpacity>
    </View>
  
 
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B18'
  },
  roundContainer: {
    flexDirection: 'column',
    marginLeft:responsiveWidth(10),
    justifyContent: 'space-evenly',
    padding: responsiveHeight(2),
    width: responsiveWidth(50),
  },
  round: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  roundCenter: {
    flexDirection: 'column',
    justifyContent: 'space-evenly', // Center the matches vertically
    alignItems: 'center',
    height: responsiveHeight(100), // Set height to center the matches
  },
  matchCard: {
    width: responsiveWidth(40),
    height: responsiveHeight(15),
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: responsiveHeight(2),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  player: {
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: responsiveWidth(2),
  },
  playerImage: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: responsiveWidth(7.5),
  },
  playerName: {
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  connector: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(100),
  },
  curve: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  winButton: {
    position: 'absolute',
    bottom: responsiveHeight(2),
    left: '50%',
    transform: [{ translateX: -50 }],
    padding: responsiveHeight(2),
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
});

export default TournamentLobbyScreen;
