import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import GamePlayScreen from '../screens/GamePlayScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CurrencyScreen from '../screens/CurrencyScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitle: 'Login',
            headerStyle: { backgroundColor: '#1E1E1E' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerTitle: 'Register',
            headerStyle: { backgroundColor: '#1E1E1E' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: 'GamingZone',
            headerStyle: { backgroundColor: '#1E1E1E' },
            headerTintColor: '#fff',
            headerLeft: null, // Disable back button
          }}
        />
        <Stack.Screen
          name="GamePlay"
          component={GamePlayScreen}
          options={({ route }) => ({
            headerTitle: route.params.game,
            headerStyle: { backgroundColor: '#1E1E1E' },
            headerTintColor: '#fff',
          })}
        />
        <Stack.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            headerTitle: 'Leaderboard',
            headerStyle: { backgroundColor: '#1E1E1E' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitle: 'Profile',
            headerStyle: { backgroundColor: '#1E1E1E' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Currency"
          component={CurrencyScreen}
          options={{
            headerTitle: 'In-App Currency',
            headerStyle: { backgroundColor: '#1E1E1E' },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
