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
import { registerForPushNotificationsAsync } from './utils/notification';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export default function App() {
  // SplashScreen.preventAutoHideAsync();

  // useEffect( ()=>{
  //   (async()=>{
  //     const token = await AsyncStorage.getItem('userToken');
  //     console.log(token)
  //     await SplashScreen.hideAsync(); // Hide splash screen
  //   })()
    

  // },[])
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        // TODO: Save the token to your backend or Firebase Firestore
        // Example: saveTokenToDatabase(userId, token);
      }
    });

    // Listener for incoming notifications when the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification Received:', notification);
    });

    // Listener for user interactions with notifications (e.g., tapping on them)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification Clicked:', response);
      // TODO: Navigate to specific screen based on notification data
    });

    return () => {
      // Clean up listeners on unmount
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }} enable={false}>
        <AppNavigator />
      </GestureHandlerRootView>
    </ThemeProvider>
    </PersistGate>
    </Provider>
  );
}
