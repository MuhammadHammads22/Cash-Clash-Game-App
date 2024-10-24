import React from 'react';
import { View, StyleSheet } from 'react-native';

import Dice from './Dice';
import RollButton from './RollButton';

const DiceArea = (props) => {
    const dice = props.dice.map((number, index) => {
        if (number === 0) {
            return (
                <RollButton
                    label="Roll Dice"
                    key={'RollButton' + index}
                    clicked={props.clicked}
                />
            );
        } else {
            return (
                <Dice
                    diceNumber={index.toString()} // Convert to string for key purposes
                    number={number}
                    key={'dice' + index}
                />
            );
        }
    });

    let noMove = null;
    if (props.gameStatus === 50) {
        noMove = <RollButton label="No Moves available" />;
    }

    return (
        <View style={styles.diceArea}>
            {dice}
            {noMove}
        </View>
    );
};

const styles = StyleSheet.create({
    diceArea: {
        position: 'absolute',
        top: '45%', // Adjust for responsive design
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DiceArea;
