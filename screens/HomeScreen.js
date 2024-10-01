// screens/HomeScreen.js
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import tw from 'twrnc';

const games = [
  { id: '1', name: 'Chess', image: require('../assets/images/chess.png') },
  { id: '2', name: 'Dominoes', image: require('../assets/images/dominoes.png') },
  // Add more games as per your Figma design
];

const HomeScreen = ({ navigation }) => {
  const renderGame = ({ item }) => (
    <TouchableOpacity
      style={tw`flex-1 bg-gray-800 rounded-lg p-4 m-2 items-center`}
      onPress={() => navigation.navigate('GamePlay', { game: item.name })}
    >
      <Image source={item.image} style={tw`w-24 h-24 mb-2`} resizeMode="contain" />
      <Text style={tw`text-white text-lg font-medium`}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-gray-900 p-4`}>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-white text-2xl font-semibold`}>GamingZone</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/images/profile.png')} // Ensure you have a profile icon
            style={tw`w-10 h-10 rounded-full`}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <Text style={tw`text-white text-xl mb-4`}>Select a Game</Text>
      <FlatList
        data={games}
        renderItem={renderGame}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{}}
      />
      <Button
        title="Leaderboard"
        onPress={() => navigation.navigate('Leaderboard')}
        style={tw`mt-4`}
      />
    </View>
  );
};

export default HomeScreen;
