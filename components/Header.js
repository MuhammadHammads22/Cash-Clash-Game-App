// components/Header.js
import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const Header = ({ title }) => {
  return (
    <View style={tw`bg-gray-800 p-4`}>
      <Text style={tw`text-white text-xl font-bold text-center`}>{title}</Text>
    </View>
  );
};

export default Header;
