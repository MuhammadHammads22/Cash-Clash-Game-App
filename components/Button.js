import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity
      className={`bg-blue-500 rounded-lg p-3 ${style}`}
      onPress={onPress}
    >
      <Text className={`text-white text-center ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
