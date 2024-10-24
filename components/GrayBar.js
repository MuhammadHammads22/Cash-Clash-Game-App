import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import getCheckers from './getCheckers';

// Get screen width for responsive layout
const screenWidth = Dimensions.get('window').width;

class GrayBar extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        let propsChanged = false;
        if (nextProps.checkers.checkersP1 !== this.props.checkers.checkersP1
            || nextProps.checkers.checkersP2 !== this.props.checkers.checkersP2) {
            propsChanged = true;
        }
        return propsChanged;
    }

    render() {
        const { checkers } = this.props;

        // Add a fallback if checkers is undefined
        if (!checkers) {
            return <View style={styles.grayBar}><View style={styles.blocksUp} /><View style={styles.blocksDown} /></View>;
        }

        const checkersP1 = getCheckers(1, checkers.checkersP1, "Graybar", false);
        const checkersP2 = getCheckers(2, checkers.checkersP2, "Graybar", false);

        return (
            <View style={styles.grayBar}>
                <View style={styles.blocksUp}>
                    <View style={styles.pointContainer}>
                        {checkersP1}
                    </View>
                </View>
                <View style={styles.blocksDown}>
                    <View style={styles.pointContainer}>
                        {checkersP2}
                    </View>
                </View>
            </View>
        );
    }
}

// Add default props in case checkers is not provided
GrayBar.defaultProps = {
    checkers: {
        checkersP1: [],
        checkersP2: []
    }
};

const styles = StyleSheet.create({
    grayBar: {
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        width: screenWidth * 0.1, // Adjust the width as per your layout
        backgroundColor: 'gray',
    },
    blocksUp: {
        flex: 1,
        justifyContent: 'center',
    },
    blocksDown: {
        flex: 1,
        justifyContent: 'center',
    },
    pointContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default GrayBar;
