import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import CheckerFlat from './CheckerFlat';


const OutSideBar = (props) => {
    const getFlatCheckers = (player, numberOfCheckers) => {
        const checkers = [];
        for (let i = 0; i < numberOfCheckers; i++) {
            checkers.push(<CheckerFlat player={player} key={'OSBP' + player + 'C' + i} />);
        }
        return checkers;
    }
    const { outSideBar } = props;
    let classReceivableP1 = outSideBar.p1CanReceive ? styles.receivable : {};
    let classReceivableP2 = outSideBar.p2CanReceive ? styles.receivable : {};

    const checkersP1 = getFlatCheckers("1", outSideBar.checkersP1);
    const checkersP2 = getFlatCheckers("2", outSideBar.checkersP2);

    let undoButtonClass = props.currentPosition ? styles.undoButtonEnabled : styles.undoButtonDisabled;
    let undoButtonFunction = props.currentPosition ? props.undoHandler : null;

    return (
        <ImageBackground source={require('../assets/images/fabric.jpg')} style={styles.outSide}>
            <View style={styles.undoButton}>
                <TouchableOpacity
                    style={[styles.undoButtonInner, undoButtonClass]}
                    onPress={undoButtonFunction}
                    disabled={!props.currentPosition}
                >
                    <Text style={styles.undoButtonText}>Undo</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.blocksUp}>
                <View style={styles.shadowBox}></View>
                <TouchableOpacity
                    style={[styles.pointContainer, classReceivableP1]}
                    onPress={outSideBar.p1CanReceive}
                >
                    {checkersP1}
                </TouchableOpacity>
            </View>

            <View style={styles.blocksDown}>
                <View style={styles.shadowBox}></View>
                <TouchableOpacity
                    style={[styles.pointContainer, styles.pointContainerDown, classReceivableP2]}
                    onPress={outSideBar.p2CanReceive}
                >
                    {checkersP2}
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    outSide: {
        position: 'absolute',
        top: '2%',
        left: '92%',
        bottom: '2%',
        width: '4.5%',
    },
    receivable: {
        backgroundColor: 'rgba(57, 163, 36, 0.508)',
        cursor: 'pointer',  // No direct 'cursor' in RN, might be useful when switching to web
    },
    undoButton: {
        position: 'absolute',
        top: '45%',
        height: '10%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    undoButtonInner: {
        width: '100%',
        height: '100%',
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    undoButtonText: {
        fontSize: 14, // Adjust based on requirement
        fontWeight: 'bold',
    },
    undoButtonEnabled: {
        backgroundColor: 'yellow',
    },
    undoButtonDisabled: {
        backgroundColor: 'gray',
        opacity: 0.6,
    },
    blocksUp: {
        flex: 1,
    },
    blocksDown: {
        flex: 1,
    },
    shadowBox: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    pointContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pointContainerDown: {
        flexDirection: 'row-reverse',
    }
});

export default OutSideBar;
