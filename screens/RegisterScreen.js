
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
  Modal,
  ActivityIndicator,
} from 'react-native';
import Button from '../components/Button';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { isValidEmail, validateField } from '../utils/validateField';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import GenderSelection from '../components/GenderSelectionComponent';
import LoginModal from '../components/Modal';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [name, setName] = useState('');
  const [errorName,setErrorName]=useState('')
  const [isErrorName,setIsErrorName]=useState(false)

  const [email, setEmail] = useState('');
  const [errorEmail,setErrorEmail]=useState('')
  const [isErrorEmail,setIsErrorEmail]=useState(false)

  // const [gender, setGender] = useState('');
  const [errorGender,setErrorGender]=useState('')
  const [isErrorGender,setIsErrorGender]=useState(false)
  const [selectedGender, setSelectedGender] = useState('');

  const [country, setCountry] = useState(null);
  const [isErrorCountry,setIsErrorCountry]=useState(false)
  const [errorCountry, setErrorCountry] = useState('');


  const [password, setPassword] = useState('');
  const [errorPassword,setErrorPassword]=useState('')
  const [isErrorPassword,setIsErrorPassword]=useState(false)

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorConfirmPassword,setErrorConfirmPassword]=useState('')
  const [isErrorConfirmPassword,setIsErrorConfirmPassword]=useState(false)

  const [isLoading, setIsLoading] = useState(false);

  const [isErrorServer, setIsErrorServer] = useState(false)
  const [errorServer, setErrorServer] = useState("")

  const isButtonDisabled = !name.trim() ||isErrorName|| !email.trim()||isErrorEmail || !selectedGender.trim()||isErrorGender || !password.trim()||isErrorPassword || !confirmPassword.trim()||isErrorConfirmPassword;


  // Country Picker Callback
  const onSelectCountry = (country) => {
    setCountry(country);
    console.log(country);
  };



  const handleRegister =async () => {
    // Placeholder registration logic
    setIsLoading(true)
    await fetch('http://10.0.2.2:3000/auth/register', {
      method: 'POST', // Correct HTTP method, use uppercase "POST"
      headers: {
        'Content-Type': 'application/json', // Tell the server that you're sending JSON
      },
      body: JSON.stringify({
        name: name,
        email: email,
        gender: selectedGender.toLowerCase(),
        password: password,
        confirmPassword: confirmPassword
      }),
    })
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        setIsLoading(false)
        if(data.success){
          navigation.navigate('OTP')
          console.log(data)
        }
        else{
          Alert.alert('Registration Failed', 'Please fill in all fields.')
          console.log(data)
        }
        ; // Handle the data received from the server
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


  // Dynamic styles based on screen dimensions
  const logoSize = width * 0.4; // 15% of screen width
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
    <ActivityIndicator style={{}} size={'medium'} color={'black'} animating={true} />
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
            ...tw`flex-row items-center bg-gray-800 rounded-lg px-4`,
            height: inputHeight,
          }}>
            <Ionicons name="person-outline" size={iconSize} color="#aaa" style={tw`mr-2`} />
            <TextInput
              style={{
                ...tw`flex-1 text-white`,
                fontSize: width * 0.045, // Responsive font size
              }}
              placeholder="Name"
              placeholderTextColor="#aaa"
              autoCapitalize="words"
              value={name}
              onBlur={()=>{validateField(name,'name',setErrorName,setIsErrorName)}}
              onChangeText={setName}
            />
          </View>
          <View style={{ marginVertical: responsiveHeight(1),marginLeft:responsiveWidth(2), alignItems: 'flex-start' }}>
                {isErrorName ? (<Text style={{ color: 'red' }}>*{errorName}</Text>) : (<Text></Text>)}
          </View>

               {/* gender */}
          {/* <View style={{
            ...tw`flex-row items-center bg-gray-800 rounded-lg px-4`,
            height: inputHeight,
          }}>
            <Ionicons name="mail-outline" size={iconSize} color="#aaa" style={tw`mr-2`} />
            <TextInput
              style={{
                ...tw`flex-1 text-white`,
                fontSize: width * 0.045, // Responsive font size
              }}
              placeholder="Gender"
              placeholderTextColor="#aaa"
              keyboardType="Gender"
              autoCapitalize="none"
              value={gender}
              onChangeText={setGender}
            />
          </View> */}
          <GenderSelection selectedGender={selectedGender} setSelectedGender={setSelectedGender}/>
          <View style={{ marginVertical: responsiveHeight(1),marginLeft:responsiveWidth(2), alignItems: 'flex-start' }}>
                {isErrorGender ? (<Text style={{ color: 'red' }}>*{errorGender}</Text>) : (<Text></Text>)}
          </View>

           {/* Country Picker */}
        <View style={tw`mb-4`}>
          <Text style={{ color: 'white', fontSize: width * 0.04, marginBottom: 8 }}>Select Country</Text>
          <CountryPicker
            withFilter
            withFlag
            withCountryNameButton
            withAlphaFilter
            withEmoji
            onSelect={onSelectCountry}
            countryCode={selectedCountry?.cca2 || 'US'} // Default to US
            theme={{ backgroundColor: '#050B18', itemBackgroundColor: '#1a1a1a', fontColor: 'white' }}
          />
        </View>

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
              onChangeText={(item)=>{
                setPassword(item)
                validateField(item,'password',setErrorPassword,setIsErrorPassword)
                validateField(confirmPassword,'confirm password',setErrorConfirmPassword,setIsErrorConfirmPassword,password)
                }
              }
            />
          </View>
          <View style={{ marginVertical: responsiveHeight(1),marginLeft:responsiveWidth(2), alignItems: 'flex-start' }}>
                {isErrorPassword ? (<Text style={{ color: 'red' }}>*{errorPassword}</Text>) : (<Text></Text>)}
          </View>

            {/* Confirm Password Input */}
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
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={(item)=>{
                setConfirmPassword(item)
                validateField(item,'confirm password',setErrorConfirmPassword,setIsErrorConfirmPassword,password)
                }}
            />
          </View>
          <View style={{ marginVertical: responsiveHeight(1),marginLeft:responsiveWidth(2), alignItems: 'flex-start' }}>
                {isErrorConfirmPassword ? (<Text style={{ color: 'red' }}>*{errorConfirmPassword}</Text>) : (<Text></Text>)}
          </View>


          {/* Register Button */}
          <Button
            title="Register"
            onPress={handleRegister}
            disable={isButtonDisabled}
            style={{
              ...tw`bg-yellow-300 items-center rounded-lg mb-6`,
              height: buttonHeight,
              opacity:isButtonDisabled?.5:1,
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
