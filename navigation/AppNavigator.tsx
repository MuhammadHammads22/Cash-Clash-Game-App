// navigation/AppNavigator.js
import React, { useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CurrencyScreen from '../screens/CurrencyScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeGraph from '../screens/HomeGraph';
import SettingsScreen from '../screens/SettingsScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import OTPScreen from '../screens/OTPScreen';
import GameTierSelectionScreen from '../screens/GameTierSelectionScreen';
import TournamentLobbyScreen from '../screens/TournamentLobbyScreen';
import OnlineLudo from '../screens/OnlineLudo';
import OnlineBackgammon from '../screens/OnlineBackgammon';
import OnlineDominoes from '../screens/OnlineDominoes';
import OfflineBackgammon from '../screens/OfflineBackgammon';
import OfflineDominoes from '../screens/OfflineDominoes';
import OfflineLudo from '../screens/OfflineLudo';
import PlayLocal from '../screens/OfflineChess';
import PlayOnline from '../screens/OnlineChess';
import MatchMakingScreen from '../screens/MatchMakingScreen';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined,
  Login: undefined,
  SignUp: undefined,
  LocalGame: undefined,
  OnlineGame: { id: string },
}

const AppNavigator = () => {
  // const [isDarkTheme,setIsDarkTheme]=useState(false)
  // const appContext= useMemo(()=>{
  //   return {isDarkTheme,setIsDarkTheme}
  // },[])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <NavigationContainer>
        {/* <AppContext.Provider value={appContext}> */}
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={({ navigation }) => ({
            headerShown: false
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
            name="TournamentLobby"
            component={TournamentLobbyScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="OTP"
            component={OTPScreen}
          // options={{ title: 'Login' }}
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
            name="MatchMakingScreen"
            component={MatchMakingScreen}
          />
         
          <Stack.Screen
            name='ChessOffline'
            component={PlayLocal}
            options={{
              headerShown: false
            }}
          />


          <Stack.Screen
            name='ChessOnline'
            component={PlayOnline}
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            name="UpdateProfile"
            component={UpdateProfileScreen}
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            name="LudoOnline"
            component={OnlineLudo}
            options={{
              headerShown: false
            }}
          />


          <Stack.Screen
            name="BackgammonOnline"
            component={OnlineBackgammon}
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            name="DominoesOnline"
            component={OnlineDominoes}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="LudoOffline"
            component={OfflineLudo}
            options={{
              headerShown: false
            }}
          />


          <Stack.Screen
            name="BackgammonOffline"
            component={OfflineBackgammon}
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            name="DominoesOffline"
            component={OfflineDominoes}
            options={{
              headerShown: false
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
          <Stack.Screen
            name="GameTierSelection"
            component={GameTierSelectionScreen}
            options={{
              headerShown: false,
              // headerLeft: null, // Disable back button
            }}
          />
        </Stack.Navigator>
        {/* </AppContext.Provider> */}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;
