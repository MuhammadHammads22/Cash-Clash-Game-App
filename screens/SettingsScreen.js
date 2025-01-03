import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Material from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ToggleSwitch from 'toggle-switch-react-native'
import Feather from 'react-native-vector-icons/Feather'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../slices/userSlice'
import Constants from 'expo-constants';
import { url } from '../store/urls'


const SettingsScreen = () => {
  const navigation = useNavigation();
  const [toggleState,setToggleState]=useState(false)
  const {email}= useSelector(state=>state.user.userData)
 const handleUpdateProfileNavigation=()=>{
  navigation.navigate('UpdateProfile')
 }
 console.log(email)

 const dispatch= useDispatch()
 const handleLogOut =async () => {
  await fetch(`${url}auth/logout`, {
    method: 'POST', // Correct HTTP method, use uppercase "POST"
    headers: {
      'Content-Type': 'application/json', // Tell the server that you're sending JSON
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then((res) => res.json()) // Parse the response as JSON
  .then((data) => {
    console.log(data)
    if(data.success){
      dispatch(clearUser())
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    }
  })
  
};
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Settings', // Centered title
      backgroundColor: '',
      headerStyle: {
        height: 80, // Set the header height
        backgroundColor: '#050B18', // Optional: Set background color
      },
      headerTitleStyle: {
        fontSize: Math.round(responsiveWidth(6)), // Set title font size

        color: 'white' // Optional: Set font weight
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: Math.round(responsiveWidth(3)) }}>
          <Icon name="chevron-back" size={Math.round(responsiveWidth(7))} color="white" />
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center', // Center the title
    });
  }, [navigation]);
  return (
    <View style={styles.settingsScreen}>
      <Text style={{ color: 'gray', fontSize: responsiveWidth(5), fontWeight: '600', margin: responsiveWidth(6),marginBottom:responsiveWidth(-2) }}>General</Text>
      {/* SettingsList */}
      <View style={{ marginVertical: responsiveHeight(4) }}>
        {/* Darkmode Setting */}
        <TouchableOpacity onPress={()=>{setToggleState(!toggleState)}}>
        <View style={{ padding: responsiveWidth(6), alignItems: 'center', justifyContent: 'space-between',flexDirection:'row',borderBottomColor:"gray",borderBottomWidth:.5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Material name='dark-mode' style={{ marginRight: responsiveWidth(5) }} size={responsiveWidth(7)} color="white" />
            <Text style={{ color: 'white', fontSize: responsiveWidth(4), fontWeight: 'bold', color: 'white' }}>Dark Mode</Text>
          </View>
          <ToggleSwitch
            isOn={toggleState}
            onColor="#F4D144"
            offColor="gray"
            // label="Example label"
            // labelStyle={{ color: "black", fontWeight: "900" }}
            size="medium"
            onToggle={isOn =>{setToggleState(isOn)}}
          />

        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={{ padding: responsiveWidth(6), alignItems: 'center', justifyContent: 'space-between',flexDirection:'row',borderBottomColor:"gray",borderBottomWidth:.5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Material name='security' style={{ marginRight: responsiveWidth(5) }} size={responsiveWidth(7)} color="white" />
            <Text style={{ color: 'white', fontSize: responsiveWidth(4), fontWeight: 'bold', color: 'white' }}>Privacy Settings</Text>
          </View>
          <Entypo name='chevron-small-right' size={responsiveWidth(7)} color='white'/>
        </View>
        </TouchableOpacity>
        
        <TouchableOpacity>
        <View style={{ padding: responsiveWidth(6), alignItems: 'center', justifyContent: 'space-between',flexDirection:'row',borderBottomColor:"gray",borderBottomWidth:.5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Entypo name='sound-mix' style={{ marginRight: responsiveWidth(5) }} size={responsiveWidth(7)} color="white" />
            <Text style={{ color: 'white', fontSize: responsiveWidth(4), fontWeight: 'bold', color: 'white' }}>Game Settings</Text>
          </View>
          <Entypo name='chevron-small-right' size={responsiveWidth(7)} color='white'/>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleUpdateProfileNavigation} >
        <View style={{ padding: responsiveWidth(6), alignItems: 'center', justifyContent: 'space-between',flexDirection:'row',borderBottomColor:"gray",borderBottomWidth:.5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Feather name='user' style={{ marginRight: responsiveWidth(5) }} size={responsiveWidth(7)} color="white" />
            <Text style={{ color: 'white', fontSize: responsiveWidth(4), fontWeight: 'bold', color: 'white' }}>Update Profile</Text>
          </View>
          <Entypo name='chevron-small-right' size={responsiveWidth(7)} color='white'/>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogOut}>
        <View  style={{ padding: responsiveWidth(6), alignItems: 'center', justifyContent: 'space-between',flexDirection:'row',borderBottomColor:"gray",borderBottomWidth:.5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Material name='logout' style={{ marginRight: responsiveWidth(5) }} size={responsiveWidth(7)} color="white" />
            <Text style={{ color: 'white', fontSize: responsiveWidth(4), fontWeight: 'bold', color: 'white' }}>Logout</Text>
          </View>
        </View>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  settingsScreen: {
    backgroundColor: '#050B18',
    flex: 1
  }
})

export default SettingsScreen