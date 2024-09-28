import React from 'react';
import { View, Text } from 'react-native';

const GamePlayScreen = ({ route }) => {
  const { game } = route.params;

  return (
    <View className="flex-1 bg-gray-900 justify-center items-center px-4">
      <Text className="text-white text-3xl font-bold mb-4">{game} Game</Text>
      <Text className="text-gray-400">Game functionality coming soon!</Text>
    </View>
  );
};

export default GamePlayScreen;
