// screens/LoginScreen.js
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

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Placeholder login logic
    if (email === 'user@example.com' && password === 'password') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
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
              style={tw`w-32 h-32`}
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <Text style={tw`text-white text-3xl font-bold mb-2 text-center`}>
            Login Now
          </Text>

          {/* Note or Instruction Text */}
          <Text style={tw`text-gray-400 text-base mb-6 text-center`}>
            Enter your email and password to log in to your account and enjoy the new features only on 1xWin.
          </Text>

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
          <View style={tw`flex-row items-center bg-gray-800 rounded-lg mb-2 px-4`}>
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

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={tw`text-right text-yellow-400 mb-6`}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button
            title="Login"
            onPress={handleLogin}
            style={tw`bg-yellow-300 py-4 rounded-lg mb-6`}
            textStyle={tw`text-black font-bold text-lg`}
          />

          {/* Or Divider */}
          <View style={tw`flex-row items-center mb-6`}>
            <View style={tw`flex-1 h-px bg-gray-700`} />
            <Text style={tw`text-gray-400 mx-4`}>OR</Text>
            <View style={tw`flex-1 h-px bg-gray-700`} />
          </View>

          {/* Social Login Buttons */}
          <View style={tw`mb-4`}>
            {/* Google Login */}
            <TouchableOpacity
              style={tw`flex-row items-center justify-center bg-white py-3 rounded-lg mb-4`}
            >
              <Image
                source={require('../assets/images/google.webp')}
                style={tw`w-6 h-6 mr-2`}
                resizeMode="contain"
              />
              <Text style={tw`text-black font-semibold`}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Facebook Login */}
            <TouchableOpacity
              style={tw`flex-row items-center justify-center bg-blue-600 py-3 rounded-lg`}
            >
              <Image
                source={require('../assets/images/facebook.jpeg')}
                style={tw`w-6 h-6 mr-2`}
                resizeMode="contain"
              />
              <Text style={tw`text-white font-semibold`}>Continue with Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Register Link at the Bottom */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={tw`mb-4`}>
          <Text style={tw`text-center text-white`}>
            Don't have an account?{' '}
            <Text style={tw`text-yellow-400 font-semibold`}>Create one</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
