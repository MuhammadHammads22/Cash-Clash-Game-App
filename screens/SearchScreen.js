import { View, Text, StyleSheet, Image, SafeAreaView, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import IonIcons from 'react-native-vector-icons/Ionicons'
// import ludo from '../assets/images/ludoIcon.png'
// import chess from '../assets/images/chessIcon.png'
// import backgammon from '../assets/images/backgammonIcon.png'
// import dominoes from '../assets/images/dominoesIcon.png'
// import eventChess from '../assets/images/eventChess.png'
// import eventBackgammon from '../assets/images/eventBackGammon.png'

const SearchScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, backgroundColor: '#050B18'}}>
      <Text style={styles.user.heading}>search screen</Text>
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
export default SearchScreen