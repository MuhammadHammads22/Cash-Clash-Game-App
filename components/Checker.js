import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the Checker component
const Checker = (props) => {
    // Determine the styles based on the player
    let checkerStyle = styles.checker;
    if (props.player === 1) {
        checkerStyle = [styles.checker, styles.checkerP1];
    } else {
        checkerStyle = [styles.checker, styles.checkerP2];
    }

    // Add canMove style if applicable
    if (props.canMove) {
        checkerStyle.push(styles.canMove);
    }

    return (
        <View style={checkerStyle}>
            {props.count > 1 && <Text style={props.player === 1 ? styles.labelP1 : styles.labelP2}>{props.count}</Text>}
        </View>
    );
};

// Define the styles
const styles = StyleSheet.create({
    checker: {
        position: 'relative',
        width: '65%',
        margin: 0,
        overflow: 'hidden',
        borderRadius: 50,
        alignSelf: 'center',
        // Optionally add more styles like shadow or elevation here
    },
    checkerP1: {
        backgroundColor: 'rgba(211, 211, 211, 1)', // Fallback color
        // Gradient can be done with a library or custom component if needed
        // Add any additional styling for player 1 here
    },
    checkerP2: {
        backgroundColor: 'rgba(53, 53, 53, 1)', // Fallback color
        // Add any additional styling for player 2 here
    },
    labelP1: {
        color: 'rgb(59, 59, 59)', // Adjust according to your design
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20, // Adjust as needed
    },
    labelP2: {
        color: 'rgb(204, 204, 204)', // Adjust according to your design
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20, // Adjust as needed
    },
    canMove: {
        // For canMove effect, you might need to implement an animation
        // Alternatively, use react-native-reanimated or similar for shadow effects
    }
});

export default Checker;
