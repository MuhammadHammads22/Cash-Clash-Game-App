import { View, Text, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { OtpInput } from "react-native-otp-entry";

const OTPScreen = ({ navigation}) => {
    const [otp, setOtp] = useState()
    const handleOptSubmit =async (text) => {
        await fetch('http://10.0.2.2:3000/auth/verifyOtp', {
            method: 'POST', // Correct HTTP method, use uppercase "POST"
            headers: {
              'Content-Type': 'application/json', // Tell the server that you're sending JSON
            },
            body: JSON.stringify({
              email: "hammadjb22@gmail.com",
              otp:text
            }),
          })
            .then((res) => {
                // if(res) navigation.navigate('Register',email); // Parse the response as JSON
                return res.json()
                
            })
            .then((data) => {
              console.log(data); // Handle the data received from the server
              if(data.success) navigation.navigate('Login')
            })
            .catch((err) => {
              console.error('Error during registration:', err); // Handle errors
            });
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#050B18' }}>
            <KeyboardAvoidingView>
                {/* input field section */}
                <View style={{ margin: responsiveWidth(5), marginVertical: responsiveHeight(6), marginTop: responsiveHeight(20), alignitem: 'center' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: responsiveWidth(10), fontWeight: 'bold', color: 'white' }}>00:23</Text>
                        <Text style={{ fontSize: responsiveWidth(4), width: responsiveWidth(70), textAlign: 'center', padding: responsiveWidth(3), fontWeight: 'semibold', color: 'white' }}>Type the verification code
                            we’ve sent you</Text>
                    </View>

                    {/* otp Input */}
                    <OtpInput numberOfDigits={6} focusColor="#F4D144"
                        focusStickBlinkingDuration={500}
                        onTextChange={(text) =>{ setOtp(text)}}
                        onFilled={(text) => { handleOptSubmit(text) }}
                        textInputProps={{
                            accessibilityLabel: "One-Time Password",
                        }}
                        theme={{
                            containerStyle: { padding: responsiveWidth(6), marginTop: responsiveHeight(6) },
                            pinCodeContainerStyle: {},
                            pinCodeTextStyle: { color: 'white' },
                            focusStickStyle: styles.focusStick,
                            // focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                        }} />

                    <View style={{ alignItems: 'center', justifyContent: 'center',marginTop:responsiveHeight(30) }}>
                        <Text style={{ fontSize: responsiveWidth(5), fontWeight: 'semi-bold', color: 'white' }}>Didn’t receive the code?</Text>
                        <Text style={{ fontSize: responsiveWidth(5), width: responsiveWidth(70), textAlign: 'center', padding: responsiveWidth(3), fontWeight: 'bold', color: '#F4D144' }}>Send Again!</Text>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: responsiveWidth(6)

    },
    pinCodeContainer: {
        backgroundColor: 'gray'
    },
    user: {
        description: { fontSize: responsiveHeight(1.5), color: 'gray' }
        , heading: { fontSize: responsiveHeight(3), fontWeight: 'bold', color: 'white' }
    },

    // body: { padding: responsiveWidth(4), alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' },
    // smallBody: { padding: responsiveWidth(4), alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', borderRadius: responsiveWidth(4) },
    // largeBody: { padding: responsiveWidth(4), alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' },
    // description: { fontSize: responsiveHeight(1.5), color: 'gray' }
    // , heading: { fontSize: responsiveHeight(2), fontWeight: 'bold', color: 'white' }
}
)

export default OTPScreen