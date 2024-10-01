// screens/LeaderboardScreen.js
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import tw from 'twrnc';

const mockData = [
  { id: '1', username: 'PlayerOne', score: 1500 },
  { id: '2', username: 'GamerGirl', score: 1400 },
  { id: '3', username: 'ChessMaster', score: 1300 },
  // Add more mock players
];

const LeaderboardScreen = () => {
  const renderItem = ({ item, index }) => (
    <View style={tw`flex-row justify-between p-4 bg-gray-800 rounded-lg mb-2`}>
      <Text style={tw`text-white text-lg`}>{index + 1}. {item.username}</Text>
      <Text style={tw`text-white text-lg`}>{item.score} Coins</Text>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-900 p-4`}>
      <Text style={tw`text-white text-2xl font-semibold mb-4 text-center`}>Leaderboard</Text>
      <FlatList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{}}
      />
    </View>
  );
};

export default LeaderboardScreen;
