import React from 'react';
import { View, Text, Image } from 'react-native';
import Button from '../components/Button';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View className="flex-1 bg-gray-900 justify-center items-center px-4">
      <Image
        source={require('../assets/images/logo.png')} // Ensure you have a logo image
        className="w-32 h-32 mb-8"
        resizeMode="contain"
      />
      <Text className="text-white text-3xl font-bold mb-12">Welcome to GamingZone</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
        style="w-full mb-4"
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
        style="w-full bg-green-500"
      />
    </View>
  );
};

export default WelcomeScreen;
