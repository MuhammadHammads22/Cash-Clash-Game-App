// navigation/AppNavigator.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import GamePlayScreen from '../screens/GamePlayScreen';
import CurrencyScreen from '../screens/CurrencyScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeGraph from '../screens/HomeGraph';
import SettingsScreen from '../screens/SettingsScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';

const Stack = createNativeStackNavigator();

// Custom Back Button Component
const CustomBackButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ marginLeft: 10 }}
    >
      <Ionicons name="arrow-back-circle" size={30} color="#fff" />
    </TouchableOpacity>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeGraph"
        screenOptions={({ navigation }) => ({
          headerShown:false
          // headerStyle: { backgroundColor: '#1E1E1E' },
          // headerTintColor: '#fff',
          // // headerTitleStyle: {
          // //   fontFamily: 'Poppins-Bold',
          // // },
          // headerLeft: () => <CustomBackButton navigation={navigation} />,
        })}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Register' }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: 'Forgot Password' }}
        />
        <Stack.Screen
          name="HomeGraph"
          component={HomeGraph}
          options={{
            headerShown: false
            // headerLeft: null, // Disable back button
          }}
        />
        <Stack.Screen
          name="GamePlay"
          component={GamePlayScreen}
          options={({ route }) => ({
            // title: route.params.game,
          })}
        />
       
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfileScreen}
          options={{ title: 'Update Profile' ,
            headerShown: true
          }}
        />
        <Stack.Screen
          name="Currency"
          component={CurrencyScreen}
          options={{ title: 'In-App Currency' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: true
            // headerLeft: null, // Disable back button
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
