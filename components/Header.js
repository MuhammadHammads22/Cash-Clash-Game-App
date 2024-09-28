import React from 'react';
import { View, Text } from 'react-native';

const Header = ({ title }) => {
  return (
    <View className="bg-gray-800 p-4">
      <Text className="text-white text-xl font-bold text-center">{title}</Text>
    </View>
  );
};

export default Header;
