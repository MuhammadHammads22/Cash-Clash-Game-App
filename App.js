// App.js
import React from 'react';
import 'expo-dev-client';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProvider } from './Themes/AppContext';

export default function App() {
  return(
  <ThemeProvider>
    <AppNavigator />
  </ThemeProvider> 
  )
}
