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
  useWindowDimensions,
} from 'react-native';
import Button from '../components/Button';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Import Social Login Libraries
// import * as Google from 'expo-auth-session/providers/google';
// import * as Facebook from 'expo-auth-session/providers/facebook';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Google Sign-In
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId: 'YOUR_GOOGLE_EXPO_CLIENT_ID',
  //   iosClientId: 'YOUR_GOOGLE_IOS_CLIENT_ID',
  //   androidClientId: 'YOUR_GOOGLE_ANDROID_CLIENT_ID',
  // });

  // Facebook Sign-In
  // const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
  //   clientId: 'YOUR_FACEBOOK_APP_ID',
  // });

  // Handle Social Login Responses
  // React.useEffect(() => {
  //   if (response?.type === 'success') {
  //     const { authentication } = response;
  //     // Handle successful Google authentication here
  //     // navigation.navigate('Home');
  //   }
  //   if (fbResponse?.type === 'success') {
  //     const { authentication } = fbResponse;
  //     // Handle successful Facebook authentication here
  //     // navigation.navigate('Home');
  //   }
  // }, [response, fbResponse]);

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

  // Dynamic styles based on screen dimensions
  const logoSize = width * 0.3; // 30% of screen width
  const inputHeight = height * 0.07; // 7% of screen height
  const fontSize = width * 0.045; // Adjust font size based on width
  const iconSize = width * 0.06; // 6% of screen width
  const buttonHeight = height * 0.07; // 7% of screen height
  const dividerHeight = height * 0.0015; // Thin divider

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-gray-900`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={tw`flex-1 justify-center px-6`}>
        {/* App Logo */}
        <View style={tw`items-center mb-8`}>
          <Image
            source={require('../assets/images/1xwin-1.png')}
            style={{ width: logoSize, height: logoSize }}
            resizeMode="contain"
          />
        </View>

        {/* Welcome Text */}
        <Text style={{ 
          ...tw`text-white font-bold mb-6 text-center`,
          fontSize: width * 0.07, // Responsive font size
        }}>
          Welcome Back
        </Text>

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
          ...tw`flex-row items-center bg-gray-800 rounded-lg mb-2 px-4`,
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

        {/* Forgot Password */}
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={{
            ...tw`text-right text-yellow-400 mb-6`,
            fontSize: width * 0.04, // Responsive font size
          }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <Button
          title="Login"
          onPress={handleLogin}
          style={{
            ...tw`bg-yellow-300 rounded-lg mb-6`,
            height: buttonHeight,
          }}
          textStyle={{
            ...tw`text-black font-bold text-lg`,
            fontSize: width * 0.05, // Responsive font size
          }}
        />

        {/* Or Divider */}
        <View style={tw`flex-row items-center mb-6`}>
          <View style={{
            ...tw`flex-1`,
            height: dividerHeight,
            backgroundColor: '#4B5563', // Tailwind gray-700
          }} />
          <Text style={{
            ...tw`text-gray-400 mx-4`,
            fontSize: width * 0.04, // Responsive font size
          }}>OR</Text>
          <View style={{
            ...tw`flex-1`,
            height: dividerHeight,
            backgroundColor: '#4B5563',
          }} />
        </View>

        {/* Social Login Buttons */}
        <View style={tw`mb-4`}>
          {/* Google Login */}
          <TouchableOpacity
            // onPress={() => promptAsync()}
            style={{
              ...tw`flex-row items-center justify-center bg-white rounded-lg mb-4`,
              height: buttonHeight,
            }}
          >
            <Image
              source={require('../assets/images/google.webp')}
              style={{
                width: width * 0.06,
                height: width * 0.06,
                marginRight: width * 0.02,
              }}
              resizeMode="contain"
            />
            <Text style={{
              ...tw`text-black font-semibold`,
              fontSize: width * 0.045, // Responsive font size
            }}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Facebook Login */}
          <TouchableOpacity
            // onPress={() => fbPromptAsync()}
            style={{
              ...tw`flex-row items-center justify-center bg-blue-600 rounded-lg`,
              height: buttonHeight,
            }}
          >
            <Image
              source={require('../assets/images/facebook.jpeg')}
              style={{
                width: width * 0.06,
                height: width * 0.06,
                marginRight: width * 0.02,
              }}
              resizeMode="contain"
            />
            <Text style={{
              ...tw`text-white font-semibold`,
              fontSize: width * 0.045, // Responsive font size
            }}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Register Link */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{
            ...tw`text-center text-white`,
            fontSize: width * 0.04, // Responsive font size
          }}>
            Don't have an account?{' '}
            <Text style={tw`text-yellow-400 font-semibold`}>Create one</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
