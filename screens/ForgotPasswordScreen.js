// screens/ForgotPasswordScreen.js
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

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Placeholder password reset logic
    if (email) {
      Alert.alert(
        'Reset Link Sent',
        'A password reset link has been sent to your email.'
      );
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', 'Please enter your email address.');
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
              style={tw`w-32 h-32`}
              resizeMode="contain"
            />
          </View>

          {/* Heading */}
          <Text style={tw`text-white text-3xl font-bold mb-6 text-center`}>
            Reset Password
          </Text>

          {/* Instruction Text */}
          <Text style={tw`text-gray-400 mb-6 text-center`}>
            Enter your email address and we'll send you a link to reset your password.
          </Text>

          {/* Email Input */}
          <View style={tw`flex-row items-center bg-gray-800 rounded-lg mb-6 px-4`}>
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

          {/* Reset Password Button */}
          <Button
            title="Send Reset Link"
            onPress={handleResetPassword}
            style={tw`bg-yellow-300 py-4 rounded-lg mb-6`}
            textStyle={tw`text-black font-bold text-lg`}
          />
        </View>

        {/* Back to Login Link at the Bottom */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={tw`mb-4`}>
          <Text style={tw`text-center text-white`}>
            Remembered your password?{' '}
            <Text style={tw`text-yellow-400 font-semibold`}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
