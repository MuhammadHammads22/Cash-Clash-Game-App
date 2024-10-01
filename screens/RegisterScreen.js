// screens/RegisterScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Button from '../components/Button';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Placeholder registration logic
    if (fullName && email && password) {
      Alert.alert('Registration Successful', 'Your account has been created.');
      navigation.navigate('Login');
    } else {
      Alert.alert('Registration Failed', 'Please fill in all fields.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-gray-900`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={tw`flex-grow justify-between px-6`}
        keyboardShouldPersistTaps="handled"
      >
        {/* Main Content */}
        <View>
          {/* App Logo */}
          <View style={tw`items-center mb-6 mt-6`}>
            <Image
              source={require('../assets/images/1xwin-1.png')}
              style={tw`w-28 h-28`}
              resizeMode="contain"
            />
          </View>

          {/* Heading */}
          <Text style={tw`text-white text-3xl font-bold mb-6 text-center`}>
            Create Account
          </Text>
          <Text style={tw`text-gray-400 text-base mb-6 text-center`}>
           Create an account to enjoy the games and new features only on 1xWin.
          </Text>

          {/* Full Name Input */}
          <View style={tw`flex-row items-center bg-gray-800 rounded-lg mb-4 px-4`}>
            <Ionicons name="person-outline" size={24} color="#aaa" style={tw`mr-2`} />
            <TextInput
              style={tw`flex-1 text-white py-3`}
              placeholder="Full Name"
              placeholderTextColor="#aaa"
              autoCapitalize="words"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Email Input */}
          <View style={tw`flex-row items-center bg-gray-800 rounded-lg mb-4 px-4`}>
            <Ionicons name="mail-outline" size={24} color="#aaa" style={tw`mr-2`} />
            <TextInput
              style={tw`flex-1 text-white py-3`}
              placeholder="Email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View style={tw`flex-row items-center bg-gray-800 rounded-lg mb-6 px-4`}>
            <Ionicons name="lock-closed-outline" size={24} color="#aaa" style={tw`mr-2`} />
            <TextInput
              style={tw`flex-1 text-white py-3`}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Register Button */}
          <Button
            title="Register"
            onPress={handleRegister}
            style={tw`bg-yellow-300 py-4 rounded-lg mb-6`}
            textStyle={tw`text-black font-bold text-lg`}
          />
        </View>

        {/* Login Link at the Bottom */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={tw`mb-4`}>
          <Text style={tw`text-center text-white`}>
            Already have an account?{' '}
            <Text style={tw`text-yellow-400  font-semibold`}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
