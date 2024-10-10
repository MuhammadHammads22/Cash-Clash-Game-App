
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
  useWindowDimensions,
} from 'react-native';
import Button from '../components/Button';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
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

  // Dynamic styles based on screen dimensions
  const logoSize = width * 0.2; // 20% of screen width
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
            Reset Password
          </Text>

          {/* Instruction Text */}
          <Text style={{
            ...tw`text-gray-400 mb-6 text-center`,
            fontSize: width * 0.04, // Responsive font size
          }}>
            Enter your email address and we'll send you a link to reset your password.
          </Text>

          {/* Email Input */}
          <View style={{
            ...tw`flex-row items-center bg-gray-800 rounded-lg mb-6 px-4`,
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

          {/* Reset Password Button */}
          <TouchableOpacity style={{justifyContent:'center',alignItems:'center',borderRadius:responsiveWidth(4),backgroundColor:"#F4D144",padding:responsiveWidth(4)}}>
            <Text style={{fontSize:responsiveWidth(4),fontWeight:'bold'}}>
              Send Reset Link
            </Text>
          </TouchableOpacity>
        </View>

        {/* Back to Login Link at the Bottom */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={tw`mb-4`}>
          <Text style={{
            ...tw`text-center text-white`,
            fontSize: width * 0.04, // Responsive font size
          }}>
            Remembered your password?{' '}
            <Text style={tw`text-yellow-400 font-semibold`}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
