import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Image, StyleSheet, TextInput, Button } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
const UpdateProfileScreen = ({ navigation }) => {
const handleUpdate=()=>{
  console.log("useInfo updated")
}
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Update Profile', // Centered title
      backgroundColor: '',
      headerStyle: {
        height: 80, // Set the header height
        backgroundColor: '#050B18', // Optional: Set background color
      },
      headerTitleStyle: {
        fontSize: responsiveWidth(6), // Set title font size

        color: 'white' // Optional: Set font weight
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: responsiveWidth(3) }}>
          <Icon name="chevron-back" size={responsiveWidth(7)} color="white" />
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center', // Center the title
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050B18' }}>
      <KeyboardAvoidingView>
        {/* top user title section */}
        <View style={{ borderRadius: responsiveWidth(5), flexDirection: 'row', alignItems: 'center', padding: responsiveWidth(3), margin: responsiveHeight(2) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../assets/images/UserImage.png')} // Adjust the path as necessary
              style={{
                borderRadius: responsiveWidth(10),
                resizeMode: 'contain',
                width: responsiveWidth(19), // Responsive width
                height: responsiveWidth(19), // Maintain aspect ratio
                marginRight: responsiveWidth(7)
              }}
            />
            {/* USERNAME VIEW */}
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.user.heading}>User1</Text>
              <Text style={[styles.user.description,{color:'white',paddingBottom:1}]}>user1@gmail.com</Text>
              <Text style={styles.user.description}>id:45353</Text>
            </View>
          </View>
        </View>
        {/* input field section */}
        <View style={{margin:responsiveWidth(5),alignitem:'center'}}>
        <View style={{
            height: responsiveHeight(8),flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'#1F2430',borderRadius:responsiveWidth(5),marginBottom:responsiveHeight(4),paddingHorizontal:responsiveWidth(3)
          }}>
            <Ionicons name="person-outline" size={responsiveWidth(7)} color="#aaa" style={{marginRight:responsiveWidth(2)}} />
            <TextInput
              style={{
                fontSize:responsiveWidth(4) ,flex:1,color:'white' // Responsive font size
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
            height: responsiveHeight(8),alignItems:'center',flexDirection:'row',justifyContent:'center',backgroundColor:'#1F2430',borderRadius:responsiveWidth(5),marginBottom:responsiveHeight(4),paddingHorizontal:responsiveWidth(3)
          }}>
            <Ionicons name="mail-outline" size={responsiveWidth(7)} color="#aaa" style={{marginRight:responsiveWidth(2)}} />
            <TextInput
             style={{
              fontSize:responsiveWidth(4) ,flex:1,color:'white' // Responsive font size
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
            height: responsiveHeight(8),flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'#1F2430',borderRadius:responsiveWidth(5),marginBottom:responsiveHeight(4),paddingHorizontal:responsiveWidth(3)
          }}>
            <Ionicons name="lock-closed-outline" size={responsiveWidth(7)} color="#aaa" style={{marginRight:responsiveWidth(2)}} />
            <TextInput
              style={{
                fontSize:responsiveWidth(4) ,flex:1,color:'white' // Responsive font size
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
          <TouchableOpacity onPress={handleUpdate} style={{justifyContent:'center',alignItems:'center',borderRadius:responsiveWidth(5),backgroundColor:"#F4D144",padding:responsiveWidth(4)}}>
            <Text>
              Update
            </Text>
          </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // gameScreen: {
  //   backgroundColor: 'black',
  //   flex: 1
  // },
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

export default UpdateProfileScreen