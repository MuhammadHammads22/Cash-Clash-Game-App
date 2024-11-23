import { View, Text, StyleSheet, Image, SafeAreaView, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, FlatList, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import IonIcons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ludo from '../assets/images/VideoCard.png'
import chess from '../assets/images/eventChess.png'
import dominoes from '../assets/images/dominoesIcon.png'
import backgammon from '../assets/images/backgammon.png'
import { Keyboard } from 'react-native';

const gameData = [
  { id: 1, name: 'Chess', imageUrl: chess, version: '1.0', rating: 4.5 },
  { id: 1, name: 'Ludo', imageUrl: ludo, version: '1.0', rating: 4.5 },
  { id: 2, name: 'Dominoes', imageUrl: dominoes, version: '1.2', rating: 4.2 },
  { id: 3, name: 'Backgammon', imageUrl: backgammon, version: '2.0', rating: 4.0 }
];

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
const inputRef=useRef()
  const debouncedSearchTerm = useDebounce(searchText, 300);
  useEffect(() => {
      inputRef.current.focus()
    if (debouncedSearchTerm) {
      setIsLoading(true)
      setTimeout(() => {
        const filtered = gameData.filter((game) =>
          game.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
        setFilteredGames(filtered);
        setIsLoading(false); // Set loading to false after filtering is complete
      }, 500);
    } else {
      setFilteredGames([]); // Show no games initially or if search is cleared
      setIsLoading(false); // Make sure to set loading to false if searchText is empty
    }
  }, [debouncedSearchTerm]);


  const RenderGameCard = ({ item }) => (
    <View style={{ flexDirection: 'row', marginVertical: responsiveHeight(3), paddingHorizontal: responsiveWidth(4), alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <Text style={{ color: 'white', fontSize: responsiveWidth(5), marginRight: responsiveWidth(4) }}>{item.id}</Text>
        <Image
          source={item.imageUrl} // Adjust the path as necessary
          style={{
            borderRadius: responsiveWidth(4),
            resizeMode: 'cover',
            width: responsiveWidth(20), // Responsive width
            height: responsiveWidth(20), // Maintain aspect ratio
            // borderColor: '#4A4B28',
            // borderWidth: responsiveWidth(1)
          }}
        />
        <View style={{ marginLeft: responsiveWidth(4) }}>
          <Text style={{ color: 'white', fontSize: responsiveWidth(5), fontWeight: 'bold' }}>{item.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name='star' size={responsiveWidth(3.5)} color='#F4D144' />
            <Text style={{ marginLeft: responsiveWidth(2), color: '#F4D144', fontSize: responsiveWidth(3.5), marginRight: responsiveWidth(4) }}>{item.rating}</Text>
          </View>
          <Text style={{ color: 'gray', fontSize: responsiveWidth(3) }}>version.{item.version} </Text>
        </View>
      </View>
      <AntDesign name='playcircleo' size={responsiveWidth(8)} color='white' />
    </View>
  );
  return (
    <SafeAreaView style={{flex:1}}>
    <ImageBackground  style={{ flex: 1 }} source={require('../assets/images/App-3d-Background.jpg')}>
    <View style={{ flex: 1 }}>
      <View style={[styles.headerContainer,{}]}>
        {/* Search Bar on the left */}
        <View style={styles.searchBar}>
          <IonIcons name="search" size={responsiveWidth(5)} color='white' />
          <TextInput
          ref={inputRef}
            style={{ flex: 1, marginLeft: responsiveWidth(1), color: 'white', fontSize: responsiveWidth(5) }}
            placeholder="Search..."
            placeholderTextColor="white"
            value={searchText}
            onChangeText={(text) => { setSearchText(text) }}
          />
        </View>
        {/* Text on the right */}
        <Text onPress={() => { setSearchText('');Keyboard.dismiss() }} style={styles.headerText}>cancel</Text>
      </View>
      <View style={{ flex: 1 }}>
        {
          searchText && isLoading ?
            (<View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={{ color: 'white', marginTop: 10 }}>Searching...</Text>
            </View>
            ) : (
              // console.log(filteredGames)
              filteredGames.length > 0 ? (
                filteredGames.map((item, index) => {
                  return (
                    <RenderGameCard key={index} item={item} />
                  )
                })
              ) : (searchText&&!isLoading&&(
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: responsiveWidth(6) }}>
                  <Text style={{ color: 'white', fontSize: responsiveWidth(5), textAlign: 'center' }}>Sorry we couldn’t find any matches for "{searchText}"</Text>
                </View>
                )
              ))
        }
      </View>
    </View>
    </ImageBackground>
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // This will push the items to the ends
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: responsiveHeight(3)

  },
  searchBar: {
    flexDirection: 'row',
    flex: 1,
    height: responsiveHeight(6),
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(4),
    backgroundColor: 'gray', // White background for the search input
    color: '#000',
  },
  headerText: {
    marginLeft: 15, // Adds some space between the search bar and the text
    color: '#fff',  // White text color
    fontSize: 18,   // Customize the font size
    fontWeight: 'bold',
  },
});
export default SearchScreen