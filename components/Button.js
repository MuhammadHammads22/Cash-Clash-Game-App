// components/Button.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';

const Button = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={tw.style(`bg-blue-500 rounded-lg p-3`, style)}
      onPress={onPress}
    >
      <Text style={tw.style(`text-white text-center`, textStyle)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
