import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import Button from '../components/Button';

const CurrencyScreen = () => {
  const [amount, setAmount] = useState('');

  const handleAddFunds = () => {
    if (amount && parseFloat(amount) > 0) {
      Alert.alert('Success', `Added ${amount} Coins to your balance.`);
      setAmount('');
    } else {
      Alert.alert('Error', 'Please enter a valid amount.');
    }
  };

  const handleSpendFunds = () => {
    if (amount && parseFloat(amount) > 0) {
      Alert.alert('Success', `Spent ${amount} Coins from your balance.`);
      setAmount('');
    } else {
      Alert.alert('Error', 'Please enter a valid amount.');
    }
  };

  return (
    <View className="flex-1 bg-gray-900 p-6">
      <Text className="text-white text-2xl font-semibold mb-6 text-center">In-App Currency</Text>
      
      <View className="mb-6">
        <Text className="text-white mb-2">Add Funds</Text>
        <TextInput
          className="bg-gray-800 text-white p-4 rounded-lg mb-2"
          placeholder="Enter amount to add"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Button title="Add Funds" onPress={handleAddFunds} style="w-full" />
      </View>

      <View>
        <Text className="text-white mb-2">Spend Funds</Text>
        <TextInput
          className="bg-gray-800 text-white p-4 rounded-lg mb-2"
          placeholder="Enter amount to spend"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Button title="Spend Funds" onPress={handleSpendFunds} style="w-full bg-red-500" />
      </View>
    </View>
  );
};

export default CurrencyScreen;
