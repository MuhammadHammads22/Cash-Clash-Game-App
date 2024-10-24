import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Required for gradients

const CheckerFlat = (props) => {
    const isPlayer1 = props.player === "1";

    return (
        <View style={[styles.checkerFlat, isPlayer1 ? styles.checkerFlatP1 : styles.checkerFlatP2]}>
            {/* Use LinearGradient if needed for better background effects */}
            <LinearGradient
                colors={isPlayer1 
                    ? ['#d3d3d3', '#d3d3d3', '#585858', '#d3d3d3'] 
                    : ['#353535', '#353535', '#a1a1a1', '#353535']}
                style={styles.gradientStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    checkerFlat: {
        position: 'relative',
        width: '100%',
        aspectRatio: 1, // Maintain square aspect ratio
        borderRadius: 20, // Adjust to get rounded corners
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5, // For Android shadow support
    },
    checkerFlatP1: {
        backgroundColor: '#d3d3d3', // light gray for player 1
    },
    checkerFlatP2: {
        backgroundColor: '#353535', // dark gray for player 2
    },
    gradientStyle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
});

export default CheckerFlat;
