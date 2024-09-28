// import React from 'react';
// import AppNavigator from './navigation/AppNavigator';
// import { NativeWindStyleSheet } from 'nativewind';

// export default function App() {
//   return <AppNavigator />;
// }

// // Enable NativeWind's StyleSheet
// NativeWindStyleSheet.setOutput({
//   default: 'native',
// });
// App.js
import React from 'react';
import { Text, View } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function App() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-900">
      <Text className="text-white text-xl">Hello, GamingZone!</Text>
    </View>
  );
}
