import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Button from '../components/Button';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Placeholder login logic
    if (email === 'user@example.com' && password === 'password') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  };

  return (
    <View className="flex-1 bg-gray-900 p-6 justify-center">
      <Text className="text-white text-2xl font-semibold mb-6 text-center">Login</Text>
      <TextInput
        className="bg-gray-800 text-white p-4 rounded-lg mb-4"
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="bg-gray-800 text-white p-4 rounded-lg mb-6"
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} style="mb-4" />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text className="text-center text-blue-400">Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
