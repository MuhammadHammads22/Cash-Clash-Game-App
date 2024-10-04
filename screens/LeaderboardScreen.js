// screens/LeaderboardScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import tw from 'twrnc';



const LeaderboardScreen = () => {
  return (
      <View style={styles.leaderboardScreen}>
        <Text>LeaderBoard screen</Text>
      </View>

  
  );
};


const styles=StyleSheet.create({
  leaderboardScreen:{
    backgroundColor:'black',
    flex:1
}
})

export default LeaderboardScreen;

