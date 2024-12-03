import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import Button from '../components/Button';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import io from 'socket.io-client';
import { url } from '../store/urls';

// const socket = io('http://10.0.2.2:3000');

const slides = [
  {
    key: 'slide1',
    title: 'Welcome to GamingZone',
    text: 'Feel the beat as you are involved in the game!!!',
    image: require('../assets/images/dom.webp'),
  },
  {
    key: 'slide2',
    title: 'Connect with Players',
    text: 'Join a community of passionate gamers.',
    image: require('../assets/images/chessw.jpeg'),
  },
  {
    key: 'slide3',
    title: 'Achieve and Earn',
    text: 'Win games and earn rewards effortlessly.',
    image: require('../assets/images/ludo.webp'),
  },
];


const WelcomeScreen = () => {

  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef(null);

  // Calculate dimensions for partial visibility
  const ITEM_WIDTH = width * 0.75;
  const ITEM_SPACING = (width - ITEM_WIDTH) / 4;

  // useEffect(() => {
  //   console.log("hello")
  //   // Listen for events from the server
  //   socket.on('playerJoined', (message) => {
  //     console.log(message)
  //   })
  // }
  // )

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      const nextSlide = currentSlide + 1;
      const offset = nextSlide * (ITEM_WIDTH + ITEM_SPACING); // Calculate the offset
      flatListRef.current.scrollToOffset({ offset, animated: true });      setCurrentSlide(nextSlide);
    } else {
      // Navigate to Login or desired screen
      navigation.navigate('Login');
    }
  };

  const renderItem = ({ item, index }) => {
    // Calculate scale and left position based on current slide
    const scale = currentSlide === index ? 1 : 0.9;
    
    return (
      <View style={{ width: ITEM_WIDTH,height:responsiveHeight(80), alignItems: 'center', marginHorizontal:responsiveWidth(2)}}>
        <View
          style={{
            transform: [{ scale }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 10,
          }}
        >
          <Image
            source={item.image}
            style={{
              width: ITEM_WIDTH,
              height: height * 0.5,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: '#111827',
            }}
            resizeMode="cover"
          />
        </View>
        <Text
          style={{fontSize:responsiveWidth(6),color:'white',fontWeight:"bold",margin:responsiveWidth(2)}}
        >
          {item.text}
        </Text>
      </View>
    );
  };

  const keyExtractor = (item) => item.key;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentSlide(viewableItems[0].index);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 40 }).current;

  return (
    <View style={[tw`flex-1 `, { backgroundColor: '#050B18' }]}>
      {/* Logo */}
      <View style={{ alignItems: 'center', }}>
        <Image
          source={require('../assets/images/finallogo.png')}
          style={{ width: Math.max(width * 0.5, 100), height: Math.max(width * 0.4, 100) }}
          resizeMode="contain"
        />
      </View>

      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: responsiveWidth(10),
          marginLeft:responsiveWidth(2)
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef}
      />

      {/* Slide Indicators */}
      <View style={[tw`flex-row justify-center mt-4`, { marginBottom: height * 0.02 }]}>
        {slides.map((_, index) => {
          const isActive = index === currentSlide;
          return (
            <View
              key={index}
              style={[
                tw`h-2 rounded-full mx-1`,
                {
                  width: isActive ? 16 : 8,
                  backgroundColor: isActive ? '#FBBF24' : '#D1D5DB', // Yellow-300 or Gray-300
                },
              ]}
            />
          );
        })}
      </View>

      {/* Next Button */}
      <View style={{ paddingHorizontal: 20 }}>
        <Button
          title={currentSlide === slides.length - 1 ? 'Start Experience' : 'Next'}
          onPress={handleNext}
          style={tw`bg-yellow-300 rounded-lg`}
          textStyle={tw`text-black font-bold text-lg`}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;
