import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Button from '../components/Button';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Placeholder registration logic
    if (username && email && password) {
      Alert.alert('Registration Successful', 'You can now log in.');
      navigation.navigate('Login');
    } else {
      Alert.alert('Registration Failed', 'Please fill all fields.');
    }
  };

  return (
    <View className="flex-1 bg-gray-900 p-6 justify-center">
      <Text className="text-white text-2xl font-semibold mb-6 text-center">Register</Text>
      <TextInput
        className="bg-gray-800 text-white p-4 rounded-lg mb-4"
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
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
      <Button title="Register" onPress={handleRegister} style="mb-4" />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text className="text-center text-blue-400">Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
