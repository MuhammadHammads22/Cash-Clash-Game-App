// components/Header.js
import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import tw from 'twrnc';

const Header = ({ title }) => {
  const { width, height } = useWindowDimensions();

  // Dynamic styles based on screen dimensions
  const paddingVertical = height * 0.02; // 2% of screen height
  const fontSize = width * 0.05; // Adjust font size based on width

  return (
    <View style={{
      ...tw`bg-gray-800 p-4`,
      paddingVertical: paddingVertical,
    }}>
      <Text style={{
        ...tw`text-white font-bold text-center`,
        fontSize: fontSize,
      }}>
        {title}
      </Text>
    </View>
  );
};

export default Header;
