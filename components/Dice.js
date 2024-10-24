import React from 'react';
import { View, StyleSheet } from 'react-native';

const Dice = (props) => {
    const dots = Array(9).fill(null);
    
    // Determine which dots to show based on the dice number
    switch (props.number) {
        case 1:
            dots[4] = true;
            break;
        case 2:
            dots[0] = true;
            dots[8] = true;
            break;
        case 3:
            dots[0] = true;
            dots[4] = true;
            dots[8] = true;
            break;
        case 4:
            dots[0] = true;
            dots[2] = true;
            dots[6] = true;
            dots[8] = true;
            break;
        case 5:
            dots[0] = true;
            dots[2] = true;
            dots[4] = true;
            dots[6] = true;
            dots[8] = true;
            break;
        case 6:
            dots[0] = true;
            dots[2] = true;
            dots[3] = true;
            dots[5] = true;
            dots[6] = true;
            dots[8] = true;
            break;
        default:
            break;
    }

    // Create the dice layout
    const die = [...Array(3)].map((_, indexRow) => {
        return (
            <View style={styles.diceRow} key={'dr' + indexRow}>
                {[...Array(3)].map((_, indexCol) => {
                    return (
                        <View style={styles.diceColumn} key={'dc' + (indexRow * 3) + indexCol}>
                            {dots[(indexRow * 3) + indexCol] && <View style={styles.diceFilled} />}
                        </View>
                    );
                })}
            </View>
        );
    });

    return (
        <View style={styles.dice}>
            <View style={styles.diceContent}>
                {die}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dice: {
        position: 'relative',
        width: '10%',
        margin: '2% 3%',
    },
    diceContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: 15,
        padding: '10%',
        backgroundColor: 'rgb(248, 248, 248)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5, // Android shadow
    },
    diceRow: {
        height: '33.3%',
        flexDirection: 'row',
    },
    diceColumn: {
        width: '33.3%',
        height: '100%',
        padding: '5%',
    },
    diceFilled: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(53, 53, 53)',
        borderRadius: 50,
    },
});

export default Dice;
