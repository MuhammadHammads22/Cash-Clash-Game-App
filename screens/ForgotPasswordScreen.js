// screens/ForgotPasswordScreen.tsx
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
  Modal,
  ActivityIndicator,
} from 'react-native';
import Button from '../components/Button';
import tw from 'twrnc';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { isValidEmail, validateField } from '../utils/validateField';
import LoginModal from '../components/Modal';
import * as Progress from 'react-native-progress';
import { url } from '../store/urls';

// Define the types for state variables and props

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const isButtonDisabled = !email.trim() || isErrorEmail;

  const [isLoading, setIsLoading] = useState(false);
  const [isErrorServer, setIsErrorServer] = useState(false);
  const [errorServer, setErrorServer] = useState("");

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}auth/forgotPassword/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      
      const data = await response.json();
      console.log(data)
      setIsLoading(false);
      if (data.success) {
        // setErrorServer(data.message);
        // setIsErrorServer(true);
        Alert.alert("",data.message+" verify Email to reset password.")
        navigation.navigate('OTP', { type: 'forgot password', email }); // Pass type and email
      } else {
        Alert.alert("Warning",data.message)
        // setErrorServer(data.message);
        // setIsErrorServer(true);
      }
    } catch (err) {
      console.error('Error during password reset:', err);
      setIsLoading(false);
    }
  };

  // Dynamic styles based on screen dimensions
  const logoSize = width * 0.2;
  const inputHeight = height * 0.07;
  const fontSize = width * 0.045;
  const iconSize = width * 0.06;
  const buttonHeight = height * 0.07;
  const borderRadius = width * 0.05;

  return (
    <KeyboardAvoidingView
      style={[tw`flex-1 bg-gray-900`, { backgroundColor: '#050B18', paddingBottom: responsiveHeight(6) }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity style={{ zIndex:10,position: 'absolute', top: responsiveHeight(3), left: responsiveWidth(7) }} onPress={() => { navigation.goBack() }}>
        <FontAwesome5 name='chevron-left' size={responsiveWidth(8)} color="white" />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={tw`flex-grow justify-between px-6`}
        keyboardShouldPersistTaps="handled"
      >
        <LoginModal 
          navigation={navigation} 
          errorServer={errorServer} 
          isErrorServer={isErrorServer} 
          setErrorServer={setErrorServer} 
          setIsErrorServer={setIsErrorServer} 
        />

        <Modal transparent={true} visible={isLoading}>
          <View backgroundColor={'rgba(50,50,50,.3)'} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Progress.Circle size={50} indeterminate={true} />
          </View>
        </Modal>

        {/* Main Content */}
        <View>
          {/* App Logo */}
          <View style={tw`items-center mb-6 mt-6`}>
            <Image
              source={require('../assets/images/finallogo.png')}
              style={{ width: logoSize, height: logoSize }}
              resizeMode="contain"
            />
          </View>

          {/* Heading */}
          <Text
            style={{
              ...tw`text-white text-3xl font-bold mb-6 text-center`,
              fontSize: width * 0.07,
            }}
          >
            Reset Password
          </Text>

          {/* Instruction Text */}
          <Text
            style={{
              ...tw`text-gray-400 mb-6 text-center`,
              fontSize: width * 0.04,
            }}
          >
            Enter your email address and we'll send you a link to reset your password.
          </Text>

          {/* Email Input */}
          <View
            style={{
              ...tw`flex-row items-center bg-gray-800 rounded-lg px-4`,
              height: inputHeight,
            }}
          >
            <Ionicons name="mail-outline" size={iconSize} color="#aaa" style={tw`mr-2`} />
            <TextInput
              onSubmitEditing={() => validateField(email, 'email', setErrorEmail, setIsErrorEmail)}
              style={{
                ...tw`flex-1 text-white`,
                fontSize: width * 0.045,
              }}
              placeholder="Email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={{ marginVertical: responsiveHeight(1), marginLeft: responsiveWidth(2), alignItems: 'flex-start' }}>
            {isErrorEmail ? <Text style={{ color: 'red' }}>*{errorEmail}</Text> : null}
          </View>

          {/* Reset Password Button */}
          <TouchableOpacity
            disabled={isButtonDisabled}
            onPress={handleResetPassword}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: responsiveWidth(4),
              backgroundColor: '#F4D144',
              padding: responsiveWidth(4),
              opacity: isButtonDisabled ? 0.5 : 1,
            }}
          >
            <Text style={{ fontSize: responsiveWidth(4), fontWeight: 'bold' }}>
              Send OTP
            </Text>
          </TouchableOpacity>
        </View>

        {/* Back to Login Link at the Bottom */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={tw`mb-4`}>
          <Text
            style={{
              ...tw`text-center text-white`,
              fontSize: width * 0.04,
            }}
          >
            Remembered your password?{' '}
            <Text style={tw`text-yellow-400 font-semibold`}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
