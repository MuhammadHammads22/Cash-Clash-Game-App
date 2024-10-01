// navigation/AppNavigator.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import GamePlayScreen from '../screens/GamePlayScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CurrencyScreen from '../screens/CurrencyScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

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
        initialRouteName="Welcome"
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: '#1E1E1E' },
          headerTintColor: '#fff',
          // headerTitleStyle: {
          //   fontFamily: 'Poppins-Bold',
          // },
          headerLeft: () => <CustomBackButton navigation={navigation} />,
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
          name="Home"
          component={HomeScreen}
          options={{
            title: 'GamingZone',
            headerLeft: null, // Disable back button
          }}
        />
        <Stack.Screen
          name="GamePlay"
          component={GamePlayScreen}
          options={({ route }) => ({
            title: route.params.game,
          })}
        />
        <Stack.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{ title: 'Leaderboard' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
        <Stack.Screen
          name="Currency"
          component={CurrencyScreen}
          options={{ title: 'In-App Currency' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
