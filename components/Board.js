import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import getCheckers from './getCheckers';
import Triangle from './Triangle';
import DiceArea from './DiceArea';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Board = (props) => {

    let leftDiceArea = null;
    let rightDiceArea = null;

    if (props.gameStatus > 10 && props.gameStatus <= 59) {
        leftDiceArea = props.p1IsNext
            ? <DiceArea dice={props.dice} clicked={props.rollDice} gameStatus={props.gameStatus} />
            : null;
        rightDiceArea = props.p1IsNext
            ? null
            : <DiceArea dice={props.dice} clicked={props.rollDice} gameStatus={props.gameStatus} />;

        if (props.gameStatus === 50) { // No moves available
            if (props.p1IsNext) {
                rightDiceArea = <DiceArea dice={[0]} clicked={props.rollDice} gameStatus={51} />;
            } else {
                leftDiceArea = <DiceArea dice={[0]} clicked={props.rollDice} gameStatus={51} />;
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../assets/images/wood.jpg')}
                style={styles.board}
                imageStyle={styles.backgroundImage}
            >
                {/* Left Side with background */}
                <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)',marginRight:responsiveWidth(2), width: responsiveWidth(11), height: responsiveHeight(100) ,flexDirection:'column',justifyContent:'flex-end'}}>
                    <Text style={{color:'white',fontSize:responsiveWidth(2),fontWeight:'bold'}}>backgammon</Text>
                </View>

                <View style={{ marginTop:responsiveHeight(2),alignItems: 'center' }}>
                    <View style={{ width: responsiveWidth(85), height: responsiveHeight(39),marginBottom:responsiveHeight(2) }}>
                        <ImageBackground
                            source={require('../assets/images/fabric.jpg')}
                            style={styles.side}
                            imageStyle={styles.backgroundImage}
                        >
                            {leftDiceArea}

                <View style={styles.blocksUp}>
                    {renderTriangles('top', 12, props)}
                </View>

                <View style={styles.blocksDown}>
                    {renderTriangles('bottom', 6, props)}
                </View> 
                        </ImageBackground>
                    </View>

                    {/* Right Side with background */}
                    <View style={{ width: responsiveWidth(85),  height: responsiveHeight(39) }}>
                        <ImageBackground
                            source={require('../assets/images/fabric.jpg')}
                            style={styles.side}
                            imageStyle={styles.backgroundImage}
                        >
                            {/* {rightDiceArea}

                <View style={styles.blocksUp}>
                    {renderTriangles('top', 18, props)}
                </View>

                <View style={styles.blocksDown}>
                    {renderTriangles('bottom', 0, props)}
                </View> */}
                        </ImageBackground>
                    </View>
                </View>

                {props.children}
            </ImageBackground>
        </SafeAreaView>
    );
};

const renderTriangles = (position, startIndex, props) => {
    return [...Array(6).keys()].map(index => {
        const pointIndex = startIndex + index;
        const point = props.points[pointIndex];
        return (
            <Triangle
                key={pointIndex}
                color={pointIndex % 2 === 0 ? "1" : "2"}
                position={position}
                canMove={point.canMove}
                canReceive={point.canReceive}
            >
                {getCheckers(point.player, point.checkers, "board", point.canMove)}
            </Triangle>
        );
    });
};

const styles = StyleSheet.create({
    board: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        flexDirection: 'row'
    },
    side: {
        flex: 1,
        transform: [{ rotate: '90deg' }],
        justifyContent: 'space-between',
    },
    backgroundImage: {
        resizeMode: 'cover',
    },
    blocksUp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    blocksDown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Board;
