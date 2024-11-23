import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import tw from 'twrnc';
// RadioButton Component
const RadioButton = ({ title, selectedGender, onSelect }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 20,
                padding: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: selectedGender === title ? '#d6e7ff' : '#1F2937',
            }}
            onPress={() => onSelect(title)}
        >
            <Text style={{ fontSize: 16, marginLeft: 10, color: selectedGender === title ? 'black' : 'white' }}>{title}</Text>
        </TouchableOpacity>
    );
};

// GenderSelection Component
const GenderSelection = ({selectedGender, setSelectedGender}) => {

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    return (
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',backgroundColor:'#1F2937',padding:10,borderRadius:10 }}>
                <View style={{flexDirection:'row'}}>
                <MaterialCommunityIcons name='gender-male-female' color="#aaa" style={tw`mr-2`} size={responsiveWidth(6)} />
                <Text style={{color:'#aaa',fontWeight:'bold',fontSize:responsiveWidth(4),marginRight:responsiveWidth(4)}}>Gender</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:responsiveHeight(1)}}>
                <RadioButton
                    title="Male"
                    selectedGender={selectedGender}
                    onSelect={handleGenderSelect}
                />
                <RadioButton
                    title="Female"
                    selectedGender={selectedGender}
                    onSelect={handleGenderSelect}
                />
                </View>
              
            </View>


    );
};

export default GenderSelection;
