// screens/HomeScreen.js
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import LeaderboardScreen from './LeaderboardScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import GamesScreen from './GamesScreen';
import SearchScreen from './SearchScreen';
// import { createDrawerNavigator } from "@react-navigation/drawer";

const Tab = createBottomTabNavigator();

// const Drawer = createDrawerNavigator();


const HomeGraph = ({ navigation }) => {

  return (

    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop:responsiveHeight(1),
          backgroundColor: '#050B18',
          height: Platform.OS === 'ios' ? responsiveHeight(13) : responsiveHeight(10),
          elevation: 4,
          bottom: Platform.OS === 'ios' ? responsiveHeight(-2) : 0,
        },
        headerShown:false,
        // tabBarActiveTintColor: 'white', // Active icon color
        // tabBarInactiveTintColor: 'gray', // Inactive icon color
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name={focused ? 'home-variant' : 'home-variant-outline'} color={focused ? 'white' : 'gray'} size={responsiveWidth(8)} />
          ),
          tabBarLabel: ''
        }}
      />
      <Tab.Screen
        name="Games"
        component={GamesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IonIcons name={focused ? 'game-controller' : 'game-controller-outline'} color={focused ? 'white' : 'gray'} size={responsiveWidth(8)} />
          ),
          tabBarLabel: ''
        }}
      />
      <Tab.Screen
        name="LeaderBoard"
        component={LeaderboardScreen}
        options={{
          // gestureEnabled:true,
          // animationTypeForReplace:'pop',
          // headerTitle: 'Settings',
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({ focused }) => 
            {
              return(
            focused?
            <MaterialIcons name='leaderboard' color={focused ? 'white' : 'gray'} size={responsiveWidth(8)} />
            :
            <Image
            source={require('../assets/images/LeaderBoardOutline.png')} // Adjust the path as necessary
            style={{
              width: responsiveWidth(9), // Responsive width
              height: responsiveWidth(9), // Maintain aspect ratio
            }}
          />
              )
            }
          ,
          tabBarLabel: ''
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          // gestureEnabled:true,
          // animationTypeForReplace:'pop',
          // headerTitle: 'Settings',
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({ focused }) => (
            <IonIcons name={focused ? 'search' : 'search-outline'} color={focused ? 'white' : 'gray'} size={responsiveWidth(7)} />
          ),
          tabBarLabel: ''
        }}
      />
      
    </Tab.Navigator>

  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

export default HomeGraph;
