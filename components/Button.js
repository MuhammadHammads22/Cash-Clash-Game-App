// components/Button.js
import React from 'react';
import { TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import tw from 'twrnc';

const Button = ({ title, onPress, style, textStyle }) => {
  const { width, height } = useWindowDimensions();

  // Dynamic styles based on screen dimensions
  const paddingVertical = height * 0.02; // 2% of screen height
  const borderRadius = width * 0.05; // 5% of screen width
  const fontSize = width * 0.045; // Adjust font size based on width

  return (
    <TouchableOpacity
      style={[
        {
          paddingVertical: paddingVertical,
          borderRadius: borderRadius,
        },
        tw.style(`bg-blue-500 rounded-lg`, style),
      ]}
      onPress={onPress}
    >
      <Text style={[
        {
          fontSize: fontSize,
        },
        tw.style(`text-white text-center`, textStyle)
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
