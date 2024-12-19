import React, { useEffect } from 'react';
import 'expo-dev-client';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProvider } from './Themes/AppContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function App() {
  // SplashScreen.preventAutoHideAsync();

  // useEffect( ()=>{
  //   (async()=>{
  //     const token = await AsyncStorage.getItem('userToken');
  //     console.log(token)
  //     await SplashScreen.hideAsync(); // Hide splash screen
  //   })()
    

  // },[])
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }} enable={false}>
        <AppNavigator />
        <Toast  />
      </GestureHandlerRootView>
    </ThemeProvider>
    </PersistGate>
    </Provider>
  );
}
