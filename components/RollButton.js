import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RollButton = (props) => {
    return (
        <TouchableOpacity style={styles.rollButton} onPress={props.clicked} disabled={!props.clicked}>
            <View style={[styles.rollButtonContent, props.clicked ? styles.clickable : null]}>
                <Text style={styles.label}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    rollButton: {
        position: 'relative',
        width: '25%',
        margin: '2% 3%',
    },
    rollButtonContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'rgb(248, 248, 248)', // Roll button color
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5, // For Android shadow
    },
    clickable: {
        cursor: 'pointer',
    },
    label: {
        marginTop: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20, // You may need to adjust font size for different screens
    },
});

export default RollButton;
