import React from 'react';
import 'expo-dev-client';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProvider } from './Themes/AppContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
