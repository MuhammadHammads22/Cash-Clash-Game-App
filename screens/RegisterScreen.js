
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
  useWindowDimensions,
} from 'react-native';
import Button from '../components/Button';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Placeholder registration logic
    // if (fullName && email && password) {
    //   Alert.alert('Registration Successful', 'Your account has been created.');
      navigation.navigate('OTP');
    // } else {
    //   Alert.alert('Registration Failed', 'Please fill in all fields.');
    // }
  };

  // Dynamic styles based on screen dimensions
  const logoSize = width * 0.15; // 15% of screen width
  const inputHeight = height * 0.07; // 7% of screen height
  const fontSize = width * 0.045; // Adjust font size based on width
  const iconSize = width * 0.06; // 6% of screen width
  const buttonHeight = height * 0.07; // 7% of screen height
  const borderRadius = width * 0.05; // 5% of screen width

  return (
    <KeyboardAvoidingView
      style={[tw`flex-1 bg-gray-900`,{backgroundColor:'#050B18'}]}
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
              style={{ width: logoSize, height: logoSize }}
              resizeMode="contain"
            />
          </View>

          {/* Heading */}
          <Text style={{
            ...tw`text-white text-3xl font-bold mb-6 text-center`,
            fontSize: width * 0.07, // Responsive font size
          }}>
            Create Account
          </Text>
          <Text style={{
            ...tw`text-gray-400 text-base mb-6 text-center`,
            fontSize: width * 0.04, // Responsive font size
          }}>
            Create an account to enjoy the games and new features only on 1xWin.
          </Text>

          {/* Full Name Input */}
          <View style={{
            ...tw`flex-row items-center bg-gray-800 rounded-lg mb-4 px-4`,
            height: inputHeight,
          }}>
            <Ionicons name="person-outline" size={iconSize} color="#aaa" style={tw`mr-2`} />
            <TextInput
              style={{
                ...tw`flex-1 text-white`,
                fontSize: width * 0.045, // Responsive font size
              }}
              placeholder="Full Name"
              placeholderTextColor="#aaa"
              autoCapitalize="words"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Email Input */}
          <View style={{
            ...tw`flex-row items-center bg-gray-800 rounded-lg mb-4 px-4`,
            height: inputHeight,
          }}>
            <Ionicons name="mail-outline" size={iconSize} color="#aaa" style={tw`mr-2`} />
            <TextInput
              style={{
                ...tw`flex-1 text-white`,
                fontSize: width * 0.045, // Responsive font size
              }}
              placeholder="Email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View style={{
            ...tw`flex-row items-center bg-gray-800 rounded-lg mb-6 px-4`,
            height: inputHeight,
          }}>
            <Ionicons name="lock-closed-outline" size={iconSize} color="#aaa" style={tw`mr-2`} />
            <TextInput
              style={{
                ...tw`flex-1 text-white`,
                fontSize: width * 0.045, // Responsive font size
              }}
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
            style={{
              ...tw`bg-yellow-300 items-center rounded-lg mb-6`,
              height: buttonHeight,
              borderRadius: borderRadius,
            }}
            textStyle={{
              ...tw`text-black font-bold text-lg`,
              fontSize: width * 0.05, // Responsive font size
            }}
          />
        </View>

        {/* Login Link at the Bottom */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={tw`mb-4`}>
          <Text style={{
            ...tw`text-center text-white`,
            fontSize: width * 0.04, // Responsive font size
          }}>
            Already have an account?{' '}
            <Text style={tw`text-yellow-400 font-semibold`}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
