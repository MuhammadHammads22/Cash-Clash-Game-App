import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const games = [
  { id: '1', name: 'Chess', image: require('../assets/images/chess.png') },
  { id: '2', name: 'Dominoes', image: require('../assets/images/dominoes.png') },
  // Add more games as needed
];

const GameSelectionScreen = ({ navigation }) => {
  const renderGame = ({ item }) => (
    <TouchableOpacity
      style={styles.gameCard}
      onPress={() => navigation.navigate('GamePlay', { game: item.name })}
    >
      <Image source={item.image} style={styles.gameImage} />
      <Text style={styles.gameName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Game</Text>
      <FlatList
        data={games}
        renderItem={renderGame}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gamesList}
      />
    </View>
  );
};

export default GameSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  gamesList: {
    justifyContent: 'space-between',
  },
  gameCard: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
  },
  gameImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  gameName: {
    fontSize: 18,
    color: '#fff',
  },
});
