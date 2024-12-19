
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
  Modal,
  ActivityIndicator,
} from 'react-native';
import Button from '../components/Button';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { isValidEmail, validateField } from '../utils/validateField';
import LoginModal from '../components/Modal';
import { url } from '../store/urls';

const EmailVerificationScreen = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [errorEmail,setErrorEmail]=useState('')
  const [isErrorEmail,setIsErrorEmail]=useState(false)
  const isButtonDisabled= !email.trim()||isErrorEmail

  const [isLoading, setIsLoading] = useState(false);

  const [isErrorServer, setIsErrorServer] = useState(false)
  const [errorServer, setErrorServer] = useState("")


  const handleResetPassword = () => {
    // Placeholder password reset logic
    // setIsLoading(true)
    fetch(`${url}auth/send-email-verification-otp/`, {
      method: 'POST', // Correct HTTP method, use uppercase "POST"
      headers: {
        'Content-Type': 'application/json', // Tell the server that you're sending JSON
      },
      body: JSON.stringify({
        email: email
      })
    })
      .then((res) => 
        res.json())
      .then((data) => {
        console.log(data)
        setIsLoading(false)
        
        if(data.success){
          Alert.alert('Success',data.message)
         navigation.navigate('OTP',{type:'email verification',email:email})
        }
        else{
          setErrorServer(data.message)
          setIsErrorServer(true)
        }
        
        
      })
      .catch((err) => {
        console.log(err)
        console.error('Error during registration:', err); // Handle errors
      });
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
        <LoginModal navigation={navigation} errorServer={errorServer} isErrorServer={isErrorServer} setErrorServer={setErrorServer} setIsErrorServer={setIsErrorServer} />

        <Modal transparent={true}
          visible={isLoading}
        >
      <View backgroundColor={'rgba(50,50,50,.3)'} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator  size={'medium'} color={'black'} animating={true} />
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
          <Text style={{
            ...tw`text-white text-3xl font-bold mb-6 text-center`,
            fontSize: width * 0.07, // Responsive font size
          }}>
            Verify Email
          </Text>

          {/* Instruction Text */}
          <Text style={{
            ...tw`text-gray-400 mb-6 text-center`,
            fontSize: width * 0.04, // Responsive font size
          }}>
            Enter your email address and we'll send you a OTP to verify your Email.
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

          {/* Reset Password Button */}
          <TouchableOpacity disabled={isButtonDisabled} onPress={handleResetPassword} style={{justifyContent:'center',alignItems:'center',borderRadius:responsiveWidth(4),backgroundColor:"#F4D144",padding:responsiveWidth(4),opacity:isButtonDisabled?.5:1}}>
            <Text style={{fontSize:responsiveWidth(4),fontWeight:'bold'}}>
              Send OTP
            </Text>
          </TouchableOpacity>
        </View>
            
        {/* Back to Login Link at the Bottom */}
        {/* <TouchableOpacity  onPress={() => navigation.navigate('OTP')} style={tw`mb-4`}>
          <Text style={{
            ...tw`text-center text-white`,
            fontSize: width * 0.04, // Responsive font size
          }}>
            Remembered your password?{' '}
            <Text style={tw`text-yellow-400 font-semibold`}>Login</Text>
          </Text>
        </TouchableOpacity> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EmailVerificationScreen;
