// screens/GamePlayScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const GamePlayScreen = ({ route }) => {
  const { game } = route.params;

  return (
    <View style={tw`flex-1 bg-gray-900 justify-center items-center px-4`}>
      <Text style={tw`text-white text-3xl font-bold mb-4`}>{game} Game</Text>
      <Text style={tw`text-gray-400`}>Game functionality coming soon!</Text>
    </View>
  );
};

export default GamePlayScreen;
