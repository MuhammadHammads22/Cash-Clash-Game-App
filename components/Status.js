import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Checker from './Checker';

const Status = (props) => {
const {gameStatus,players}=props
    // Calculate score
    const calculateScore = () => {
        let scoreP1 = 0;
        let scoreP2 = 0;
        
        gameStatus.points.forEach((point, index) => {
            if (point.player) {
                if (point.player === 1) {
                    scoreP1 += (24 - index) * point.checkers;
                } else {
                    scoreP2 += (index + 1) * point.checkers;
                }
            }
        });

        // Score from grayBar
        if (gameStatus.grayBar.checkersP1) {
            scoreP1 += 25 * gameStatus.grayBar.checkersP1;
        }
        if (gameStatus.grayBar.checkersP2) {
            scoreP2 += 25 * gameStatus.grayBar.checkersP2;
        }

        return { 'P1': scoreP1, 'P2': scoreP2 };
    }

    const score = calculateScore();

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.title}>Backgammon</Text>
            </View>
            <View style={styles.scoreContainer}>
                <View style={styles.playerScoreContainer}>
                    <View style={styles.playerNameContainer}>
                        <Text style={styles.playerName}>{players.p1}</Text>
                    </View>
                    <View style={styles.checkerContainer}>
                        <Checker player={1} count={1} />
                    </View>
                    <View style={styles.score}>
                        <Text style={styles.scoreText}>{score.P1}</Text>
                    </View>
                </View>
                <View style={styles.playerScoreContainer}>
                    <View style={styles.playerNameContainer}>
                        <Text style={styles.playerName}>{players.p2}</Text>
                    </View>
                    <View style={styles.checkerContainer}>
                        <Checker player={2} count={1} />
                    </View>
                    <View style={styles.score}>
                        <Text style={styles.scoreText}>{score.P2}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.menuContainer}>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={props.toggleMenuHandler}
                >
                    <Text style={styles.menuButtonText}>Menu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        paddingTop: '1%',
        top: 0,
        left: 0,
        width: '100%',
        height: '12%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    logoContainer: {
        position: 'absolute',
        top: 0,
        width: '34%',
        bottom: 0,
        left: '1%',
    },
    title: {
        textShadowColor: 'rgba(77, 77, 77, 0.829)',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        color: 'rgba(255, 255, 255, 0.803)',
        fontWeight: 'bold',
        fontSize: 20, // Adjust font size as necessary
    },
    scoreContainer: {
        position: 'absolute',
        top: 0,
        width: '55%',
        bottom: 0,
        left: '35%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    playerScoreContainer: {
        position: 'relative',
        top: '20%',
        width: '50%',
        height: '80%',
        justifyContent: 'flex-start',
    },
    playerNameContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: '0%',
        width: '55%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    playerName: {
        fontSize: 16, // Adjust font size as necessary
        fontWeight: 'bold',
        color: 'white',
    },
    checkerContainer: {
        position: 'absolute',
        width: '25%',
        top: 0,
        left: '55%',
    },
    score: {
        position: 'absolute',
        top: 0,
        left: '80%',
        bottom: 0,
        width: '20%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    scoreText: {
        fontSize: 20, // Adjust font size as necessary
        fontWeight: 'bold',
        color: 'white',
    },
    menuContainer: {
        position: 'absolute',
        top: 0,
        width: '10%',
        bottom: 0,
        left: '90%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButton: {
        width: '80%',
        height: '80%',
        padding: '5%',
        backgroundColor: '#28a745', // Bootstrap success color
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButtonText: {
        fontSize: 16, // Adjust font size as necessary
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Status;
