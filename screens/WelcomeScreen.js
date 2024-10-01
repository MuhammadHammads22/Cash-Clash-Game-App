// screens/WelcomeScreen.js
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, Animated, Dimensions } from 'react-native';
import Button from '../components/Button';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

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
    image: require('../assets/images/chess.jpeg'),
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
  const [currentSlide, setCurrentSlide] = useState(0);

  // Animation references
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const imageScaleYAnim = useRef(new Animated.Value(1)).current;

  // Animation references for slide indicators
  const indicatorsAnim = useRef(
    slides.map((_, index) => new Animated.Value(index === 0 ? 1 : 0))
  ).current;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      // Animate indicator out
      Animated.timing(indicatorsAnim[currentSlide], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();

      // Animate fade out, slide left, scale down, rotate, and increase image height
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(imageScaleYAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Update slide index and reset animations
        const nextSlide = currentSlide + 1;
        setCurrentSlide(nextSlide);

        // Animate next indicator in
        Animated.timing(indicatorsAnim[nextSlide], {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();

        fadeAnim.setValue(0);
        slideAnim.setValue(width);
        scaleAnim.setValue(0.8);
        rotateAnim.setValue(-1);
        imageScaleYAnim.setValue(0.9);

        // Animate fade in, slide to center, scale up, rotate back, and normalize image height
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(imageScaleYAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      // Navigate to Home or desired screen
      navigation.navigate('Login');
    }
  };

  // Rotate the slide between -15 to 15 degrees for a 3D effect
  const rotate = rotateAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  return (
    <View style={tw`flex-1 bg-gray-900 px-4`}>
      <View style={tw`items-center mt-10`}>
        <Image
          source={require('../assets/images/1xwin-1.png')}
          style={tw`w-24 h-24`}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={{
            transform: [
              { translateX: slideAnim },
              { scale: scaleAnim },
              { rotateY: rotate },
              { scaleY: imageScaleYAnim },
            ],
            opacity: fadeAnim,
          }}
        >
          <Image
            source={slides[currentSlide].image}
            style={[
              {
                width: width * 0.9,
                height: height * 0.60,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: '#111827',
              },
            ]}
            resizeMode="cover"
          />
        </Animated.View>
        <Text style={tw`text-white text-2xl font-bold mt-8 text-center px-4`}>
          {slides[currentSlide].text}
        </Text>
      </View>

      {/* Slide Indicators */}
      <View style={tw`flex-row justify-center mb-3`}>
        {slides.map((_, index) => {
          const widthAnim = indicatorsAnim[index].interpolate({
            inputRange: [0, 1],
            outputRange: [8, 16], // Width from 8 to 16
          });
          const opacityAnim = indicatorsAnim[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          });

          return (
            <Animated.View
              key={index}
              style={[
                tw`h-2 rounded-full mx-1 bg-yellow-300`,
                {
                  width: widthAnim,
                  opacity: opacityAnim,
                },
              ]}
            />
          );
        })}
      </View>

      <Button
        title={currentSlide === slides.length - 1 ? 'Start Experience' : 'Next'}
        onPress={handleNext}
        style={tw`w-full bg-yellow-300 mb-6`}
        textStyle={tw`text-black font-bold`}
      />
    </View>
  );
};

export default WelcomeScreen;
