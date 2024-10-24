import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const Triangle = (props) => {
    let orientationStyle = props.position === "top" ? styles.triangleUp : styles.triangleDown;
    let colorStyle = props.color === "1" ? styles.color1 : styles.color2;
    let receivableStyle = props.canReceive ? styles.receivable : '';
    let action = props.canReceive || props.canMove;

    return (
        <View style={styles.triangleContainer}>
            <View style={[styles.trianglePart, orientationStyle, colorStyle, receivableStyle]} />
            <TouchableOpacity style={styles.pointContainer} onPress={action}>
                {props.children}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    triangleContainer: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    trianglePart: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '50%',
    },
    triangleUp: {
        transform: [{ rotate: '180deg' }], // Rotate to point upwards
    },
    triangleDown: {
        // No rotation needed for down
    },
    color1: {
        backgroundColor: 'rgba(221, 201, 181, 0.79)', // --color1
    },
    color2: {
        backgroundColor: 'rgba(153, 34, 34, 0.72)', // --color2
    },
    receivable: {
        backgroundColor: 'rgba(44, 129, 27, 0.758)', // --receiveColor
    },
    pointContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer', // Not needed in React Native, but can remain for reference
    },
});

export default Triangle;
