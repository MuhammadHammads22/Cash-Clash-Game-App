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
  Modal,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Button from '../components/Button';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { validateField } from '../utils/validateField';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LoginModal from '../components/Modal';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import { url } from '../store/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Social Login Libraries
// import * as Google from 'expo-auth-session/providers/google';
// import * as Facebook from 'expo-auth-session/providers/facebook';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [errorEmail,setErrorEmail]=useState('')
  const [isErrorEmail,setIsErrorEmail]=useState(false)
  const [password, setPassword] = useState('');
  const [errorPassword,setErrorPassword]=useState('')
  const [isErrorPassword,setIsErrorPassword]=useState(false)
  const isButtonDisabled = !email.trim()||isErrorEmail||isErrorPassword || !password.trim()
 
 
  const [isLoading, setIsLoading] = useState(false);

  const [isErrorServer, setIsErrorServer] = useState(false)
  const [errorServer, setErrorServer] = useState("")
 
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


  const handleLogin =async () => {
    // Placeholder registration logic
    // console.log(email,password)
    setIsLoading(true)
    await fetch(`${url}auth/login`, {
      method: 'POST', // Correct HTTP method, use uppercase "POST"
      headers: {
        'Content-Type': 'application/json', // Tell the server that you're sending JSON
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
    setIsLoading(false)
    console.log(data)
    if(data.success){
      dispatch(setUser({token: data.token,userData: data.user }));
      AsyncStorage.setItem("userToken",data.token)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'HomeGraph' }],
        })
      );
      
    }else{
      Alert.alert('Login Failed',data.message)
    } 
        })
      .catch((err) => {
        console.error('Error during registration:', err); // Handle errors
      });
    // if (fullName && email && password) {
    //   Alert.alert('Registration Successful', 'Your account has been created.');
      // navigation.navigate('OTP');
    // } else {
    //   Alert.alert('Registration Failed', 'Please fill in all fields.');
    // }
  };

 
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  // Dynamic styles based on screen dimensions
  const logoSize = width * 0.4; // 30% of screen width
  const inputHeight = height * 0.07; // 7% of screen height
  const fontSize = width * 0.045; // Adjust font size based on width
  const iconSize = width * 0.06; // 6% of screen width
  const buttonHeight = height * 0.07; // 7% of screen height
  const dividerHeight = height * 0.0015; // Thin divider

  return (
    <ScrollView>
    <KeyboardAvoidingView
      style={[tw`flex-1 bg-gray-900`,{backgroundColor:'#050B18'}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={tw`flex-1 justify-center px-6`}>
      <LoginModal navigation={navigation} errorServer={errorServer} isErrorServer={isErrorServer} setErrorServer={setErrorServer} setIsErrorServer={setIsErrorServer} />

<Modal transparent={true}
  visible={isLoading}
>
<View backgroundColor={'rgba(50,50,50,.3)'} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator style={{}} size={'medium'} color={'black'} animating={true} />
  </View>
</Modal>
        {/* App Logo */}
        <View style={tw`items-center mb-8`}>
          <Image
            source={require('../assets/images/finallogo.png')}
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
            ...tw`flex-row items-center bg-gray-800 rounded-lg px-4`,
            height: inputHeight,
          }}>
            <Ionicons name="mail-outline" size={iconSize} color="#aaa" style={tw`mr-2`} />
            <TextInput
            onSubmitEditing={()=>{validateField(email,'email',setErrorEmail,setIsErrorEmail)}}
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
          <View style={{ marginVertical: responsiveHeight(1),marginLeft:responsiveWidth(2), alignItems: 'flex-start' }}>
                {isErrorEmail ? (<Text style={{ color: 'red' }}>*{errorEmail}</Text>) : (<Text></Text>)}
          </View>
         {/* Password Input */}
         <View style={{
            ...tw`flex-row items-center bg-gray-800 rounded-lg px-4`,
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
              onChangeText={(item)=>{setPassword(item)}}
            />
          </View>
          <View style={{ marginVertical: responsiveHeight(1),marginLeft:responsiveWidth(2), alignItems: 'flex-start' }}>
                {isErrorPassword ? (<Text style={{ color: 'red' }}>*{errorPassword}</Text>) : (<Text></Text>)}
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
          disable={isButtonDisabled}
          style={{
            ...tw`bg-yellow-300 items-center py-4 rounded-lg mb-6`,
          opacity:isButtonDisabled?.5:1
          }}
          textStyle={{
            ...tw`text-black font-bold text-lg leading-relaxed`,
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
    </ScrollView>
  );
};

export default LoginScreen;