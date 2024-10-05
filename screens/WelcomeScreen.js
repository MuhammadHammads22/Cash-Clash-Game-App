// screens/WelcomeScreen.js
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Button from '../components/Button';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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
  const ITEM_WIDTH = width * 0.8;
  const ITEM_SPACING = (width - ITEM_WIDTH) / 2;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      const nextSlide = currentSlide + 1;
      flatListRef.current.scrollToIndex({ index: nextSlide, animated: true });
      setCurrentSlide(nextSlide);
    } else {
      // Navigate to Login or desired screen
      navigation.navigate('Login');
    }
  };

  const renderItem = ({ item, index }) => {
    // Optional: Add scaling animation to the centered slide
    const scale = currentSlide === index ? 1 : 0.9;
    return (
      <View style={{ width: ITEM_WIDTH, alignItems: 'center' }}>
        <Animated.View
          style={{
            transform: [{ scale }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
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
        </Animated.View>
        <Text
          style={{
            ...tw`text-white font-bold mt-8 text-center px-4`,
            fontSize: width * 0.05, // Responsive font size
            marginTop: height * 0.02,
          }}
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

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={tw`flex-1 bg-gray-900 px-0`}>
      {/* Logo */}
      <View style={{ alignItems: 'center', marginTop: height * 0.05 }}>
        <Image
          source={require('../assets/images/1xwin-1.png')}
          style={{ width: Math.max(width * 0.2, 100), height: Math.max(width * 0.4, 100) }}
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
        snapToInterval={ITEM_WIDTH+100}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: ITEM_SPACING,
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
      <View style={{ paddingHorizontal: 20, marginBottom: height * 0.03 }}>
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
