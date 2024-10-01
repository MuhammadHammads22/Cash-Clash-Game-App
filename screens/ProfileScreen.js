// screens/ProfileScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Button from '../components/Button';
import tw from 'twrnc';

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Placeholder logout logic
    Alert.alert('Logout', 'You have been logged out.');
    navigation.navigate('Welcome');
  };

  return (
    <View style={tw`flex-1 bg-gray-900 p-6 items-center`}>
      <Image
        source={require('../assets/images/profile.png')} // Ensure you have a profile image
        style={tw`w-24 h-24 rounded-full mb-4`}
        resizeMode="cover"
      />
      <Text style={tw`text-white text-2xl font-semibold mb-2`}>Username</Text>
      <Text style={tw`text-gray-400 text-lg mb-6`}>user@example.com</Text>
      <Button
        title="Edit Profile"
        onPress={() => Alert.alert('Edit Profile', 'Feature coming soon!')}
        style={tw`w-full mb-4`}
      />
      <Button
        title="Logout"
        onPress={handleLogout}
        style={tw`w-full bg-red-500`}
      />
    </View>
  );
};

export default ProfileScreen;
