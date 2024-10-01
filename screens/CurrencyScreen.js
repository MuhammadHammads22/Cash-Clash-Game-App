// screens/CurrencyScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import Button from '../components/Button';
import tw from 'twrnc';

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
    <View style={tw`flex-1 bg-gray-900 p-6`}>
      <Text style={tw`text-white text-2xl font-semibold mb-6 text-center`}>In-App Currency</Text>
      
      <View style={tw`mb-6`}>
        <Text style={tw`text-white mb-2`}>Add Funds</Text>
        <TextInput
          style={tw`bg-gray-800 text-white p-4 rounded-lg mb-2`}
          placeholder="Enter amount to add"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Button title="Add Funds" onPress={handleAddFunds} style={tw`w-full`} />
      </View>

      <View>
        <Text style={tw`text-white mb-2`}>Spend Funds</Text>
        <TextInput
          style={tw`bg-gray-800 text-white p-4 rounded-lg mb-2`}
          placeholder="Enter amount to spend"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Button title="Spend Funds" onPress={handleSpendFunds} style={tw`w-full bg-red-500`} />
      </View>
    </View>
  );
};

export default CurrencyScreen;
