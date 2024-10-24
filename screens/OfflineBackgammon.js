import { View, Text, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import GrayBar from '../components/GrayBar';
import Board from '../components/Board';
import OutSideBar from '../components/OutSideBar';
import Status from '../components/Status';
import Menu from '../components/Menu';

class OfflineBackgammon extends Component {
    state = {
        gameStatus: 80, //not started
        history: [],
        currentPosition: 0,
        p1IsNext: true,
        dice: [0],
        points: Array(24).fill({ player: false, checkers: 0 }),
        grayBar: { checkersP1: 0, checkersP2: 0 },
        outSideBar: {
            checkersP1: 15, checkersP2: 15, p1CanReceive: false,  // Initialize as needed
            p2CanReceive: false
        },
        movingChecker: false,
        players: { p1: 'Player 1', p2: 'Player 2' },
        showMenu: true,
    };

    toggleMenuHandler = () => {
        this.setState({ showMenu: !this.state.showMenu });
    };

    setupNewGameHandler = (playerNames, playerStarts) => {
        const gameStatus = 11; //New game
        const history = [];
        const currentPosition = 0;
        const p1IsNext = playerStarts === 1 ? true : false;
        const dice = [0];
        const points = Array(24).fill({ player: false, checkers: 0 });
        const grayBar = { checkersP1: 0, checkersP2: 0 };
        const outSideBar = {
            checkersP1: 0, checkersP2: 0, p1CanReceive: false,  // Initialize as needed
            p2CanReceive: false
        };
        const movingChecker = false;
        const showMenu = false;
        const players = { p1: playerNames.p1, p2: playerNames.p2 };

        history.push(this.setHistory(p1IsNext, dice, points, grayBar, outSideBar));

        // Setting up points on the board
        points[0] = { player: 1, checkers: 2 };
        points[11] = { player: 1, checkers: 5 };
        points[16] = { player: 1, checkers: 3 };
        points[18] = { player: 1, checkers: 5 };

        points[23] = { player: 2, checkers: 2 };
        points[12] = { player: 2, checkers: 5 };
        points[7] = { player: 2, checkers: 3 };
        points[5] = { player: 2, checkers: 5 };

        this.setState({
            gameStatus,
            history,
            currentPosition,
            p1IsNext,
            dice,
            points,
            grayBar,
            outSideBar,
            movingChecker,
            showMenu,
            players,
        });
    };

    setHistory = (p1IsNext, dice, points, grayBar, outSideBar, gameStatus) => {
        const history = {
            p1IsNext,
            dice: [...dice],
            points: [...points],
            grayBar: { ...grayBar },
            outSideBar: { ...outSideBar },
            gameStatus,
        };
        return history;
    };

    rollDiceHandler = () => {
        const p1IsNext = this.state.gameStatus === 50 ? !this.state.p1IsNext : this.state.p1IsNext;
        const dice = [];
        dice.push(Math.floor(Math.random() * 6) + 1);
        dice.push(Math.floor(Math.random() * 6) + 1);

        if (dice[0] === dice[1]) {
            dice[2] = dice[3] = dice[0];
        }

        console.log("Rolled dice: " + dice);

        const moves = this.calculateCanMove(
            this.getPointsWithoutActions(this.state.points),
            dice,
            p1IsNext,
            this.state.grayBar
        );

        const points = moves.points;
        const gameStatus = moves.gameStatus;
        const currentPosition = 0;
        const history = [];

        history.push(this.setHistory(
            p1IsNext,
            dice,
            points,
            this.state.grayBar,
            this.state.outSideBar,
            gameStatus
        ));

        this.setState({
            gameStatus,
            history,
            currentPosition,
            points,
            dice,
            p1IsNext,
        });
    };

    calculateCanMove = (points, dice, p1IsNext, grayBar) => {
        let newPoints = [...points];
        let gameStatus = 50; //No moves available

        if (!dice[0]) {
            gameStatus = 40; // No dice to play
        } else {
            if ((p1IsNext && grayBar.checkersP1) || (!p1IsNext && grayBar.checkersP2)) {
                for (let die of dice) {
                    const destination = p1IsNext ? die - 1 : 24 - die;
                    if (points[destination].player === this.getPlayer(p1IsNext) || points[destination].checkers < 2) {
                        newPoints[destination].canReceive = this.receiveCheckerHandler.bind(this, die);
                        gameStatus = 31; //Playing from graybar
                    }
                }
            } else {
                const inHomeBoard = this.checkHomeBoard(newPoints, p1IsNext);

                for (let index = 0; index < points.length; index++) {
                    let canMove = false;
                    if (points[index].player === this.getPlayer(p1IsNext)) {
                        for (let die of dice) {
                            const destination = p1IsNext ? index + die : index - die;
                            if (!canMove && destination < 24 && destination >= 0) {
                                if (points[destination].player === this.getPlayer(p1IsNext) || points[destination].checkers < 2) {
                                    canMove = true;
                                    gameStatus = 30; //Playing
                                }
                            }
                        }
                    }

                    if (inHomeBoard && ((p1IsNext && index >= 18) || (!p1IsNext && index <= 5))) {
                        if (this.checkCanBearOff(points, index, p1IsNext, dice)) {
                            canMove = true;
                            gameStatus = 32; //Bearing off
                        }
                    }

                    if (canMove) {
                        newPoints[index].canMove = this.moveCheckerHandler.bind(this, index);
                    }
                }
            }
        }

        return { points: newPoints, gameStatus };
    };

    checkHomeBoard = (points, p1IsNext) => {
        let homeBoard = true;

        points.map((point, index) => {
            if (p1IsNext && index <= 17 && point.player === 1) {
                homeBoard = false;
            } else if (!p1IsNext && index >= 6 && point.player === 2) {
                homeBoard = false;
            }
            return null;
        });

        return homeBoard;
    };

    checkCanBearOff = (points, checker, p1IsNext, dice) => {
        let canBearOff = false;

        if (checker >= 0 && checker < 24 && points[checker].player === this.getPlayer(p1IsNext)) {
            for (let die of dice) {
                if ((p1IsNext && (checker + die) === 24) || (!p1IsNext && (checker - die) === -1)) {
                    canBearOff = die;
                }
            }

            if (!canBearOff) {
                const highDie = [...dice].sort().reverse()[0];
                let checkerBehind = false;

                if ((p1IsNext && (checker + highDie) > 24) || (!p1IsNext && (checker - highDie) < -1)) {
                    if (p1IsNext) {
                        for (let i = 18; i < checker; i++) {
                            if (points[i].player && points[i].player === this.getPlayer(p1IsNext)) {
                                checkerBehind = true;
                            }
                        }
                    } else {
                        for (let i = 5; i > checker; i--) {
                            if (points[i].player && points[i].player === this.getPlayer(p1IsNext)) {
                                checkerBehind = true;
                            }
                        }
                    }

                    if (!checkerBehind) {
                        canBearOff = highDie;
                    }
                }
            }
        }
        return canBearOff;
    };

    moveCheckerHandler = (checker) => {
        // Move logic
    };

    receiveCheckerHandler = (die) => {
        // Receive logic
    };

    getPlayer = (p1IsNext) => p1IsNext ? 1 : 2;

    getPointsWithoutActions = (points) => points.map((point) => {
        return { player: point.player, checkers: point.checkers };
    });

    getOutSideBarWithoutActions = (outSideBar) => {
        return { checkersP1: outSideBar.checkersP1, checkersP2: outSideBar.checkersP2 };
    };

    getMovingChecker = (p1IsNext) => {
        let movingChecker;
        if (this.state.movingChecker !== false) {
            movingChecker = this.state.movingChecker;
        } else {
            movingChecker = p1IsNext ? -1 : 24; //Checker from gray bar
        }
        return movingChecker;
    };

    render() {
     
        return (
            <View style={styles.container}>
                <Board points={this.state.points} />
                {/* <GrayBar grayBar={this.state.grayBar} /> */}
                {/* <OutSideBar outSideBar={this.state.outSideBar} /> */}
                {/* <Status gameStatus={this.state} players={this.state.players} /> */}
                {/* <Menu gameStatus={this.state} players={this.state.players} toggleMenuHandler={this.toggleMenuHandler} newGameHandler={this.setupNewGameHandler} /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    board: {
        // Add styles for the board
    },
    grayBar: {
        // Add styles for gray bar
    },
    outSideBar: {
        // Add styles for outside bar
    },
    status: {
        // Add styles for status
    },
    menu: {
        // Add styles for menu
    },
});

export default OfflineBackgammon;
