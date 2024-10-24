import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Image, StyleSheet, Modal, ScrollView } from 'react-native';
import GamesScreen from '../screens/GamesScreen';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Menu = ({ gameStatus, players, toggleMenuHandler, newGameHandler }) => {
    const [header, setHeader] = useState('');
    const [body, setBody] = useState(null);
    const [footer, setFooter] = useState(null);
    const [menuWidth, setMenuWidth] = useState(styles.menuSmall);
    const [canClose, setCanClose] = useState(true);
    const [playerNames, setPlayerNames] = useState({ p1: players.p1, p2: players.p2 });
    const [playerStarts, setPlayerStarts] = useState(1);

    useEffect(() => {
        const content = getContent(gameStatus, players);
        setHeader(content.header);
        setBody(content.body);
        setFooter(content.footer);
        setMenuWidth(content.width);
        setCanClose(content.canClose);
    }, [gameStatus, players]);

    const getContent = (gameStatus, players) => {
        let content = null;

        switch (gameStatus) {
            case 60:
            case 70:
                content = getWinner(gameStatus, players);
                break;
            default:
                content = getMenu(gameStatus, players);
                break;
        }
        return content;
    };

    const getMenu = (gameStatus, players) => {
        return {
            header: <Text style={styles.header}>Menu</Text>,
            body: <Text style={styles.body}>Backgammon by Bruno Nunes</Text>,
            footer: getRegularFooter(),
            width: styles.menuSmall,
            canClose: gameStatus !== 80,
        };
    };

    const getWinner = (gameStatus, players) => {
        return {
            header: <Text style={styles.header}></Text>,
            body: (
                <>
                    <Image source={require('../assets/images/coinIcon.png')} style={styles.image} />
                    <Text style={styles.body}>{gameStatus === 60 ? players.p1 : players.p2} wins!</Text>
                </>
            ),
            footer: getRegularFooter(),
            width: styles.menuSmall,
            canClose: true,
        };
    };

    const getRegularFooter = () => {
        const alertNewGame = gameStatus < 60 ? 12 : 11;

        return (
            <>
                <TouchableOpacity onPress={toggleAboutHandler}>
                    <Text style={styles.aboutButton}>About</Text>
                </TouchableOpacity>
                <Button title="New Game" onPress={() => newGameHandler(alertNewGame)} color="#28a745" />
            </>
        );
    };

    const getNewGame = (gameStatus, players, playerStarts) => {
        const p1Starts = playerStarts === 1 ? styles.buttonInfo : styles.buttonDefault;
        const p2Starts = playerStarts === 2 ? styles.buttonInfo : styles.buttonDefault;

        return (
            
                <Modal transparent={true} visible={gameStatus.showMenu} >
                    <View style={{backgroundColor:'green',width:responsiveWidth(80),height:responsiveHeight(40)}}>

                    </View>
                </Modal>
            
            
        //     header: <Text style={styles.header}>New Game</Text>,
        //     body: (
        //         <ScrollView>
        //             <Text style={styles.label}>Player One:</Text>
        //             <View style={styles.inputGroup}>
        //                 <TextInput
        //                     style={styles.input}
        //                     value={players.p1}
        //                     onChangeText={(value) => changePlayerName(1, value)}
        //                 />
        //                 <TouchableOpacity style={p1Starts} onPress={() => changePlayerStart(1)}>
        //                     <Text>starts</Text>
        //                 </TouchableOpacity>
        //             </View>
        //             <Text style={styles.label}>Player Two:</Text>
        //             <View style={styles.inputGroup}>
        //                 <TextInput
        //                     style={styles.input}
        //                     value={players.p2}
        //                     onChangeText={(value) => changePlayerName(2, value)}
        //                 />
        //                 <TouchableOpacity style={p2Starts} onPress={() => changePlayerStart(2)}>
        //                     <Text>starts</Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </ScrollView>
        //     ),
        //     footer: (
        //         <>
        //             <TouchableOpacity onPress={toggleAboutHandler}>
        //                 <Text style={styles.aboutButton}>About</Text>
        //             </TouchableOpacity>
        //             <Button title="New Game" onPress={() => newGameHandler(players, playerStarts)} color="#28a745" />
        //         </>
        //     ),
        //     width: styles.menuSmall,
        //     canClose: gameStatus !== 80,
        // };
        )
    };

    const changePlayerStart = (playerStarts) => {
        const content = getNewGame(11, playerNames, playerStarts);
        setBody(content.body);
        setFooter(content.footer);
        setPlayerStarts(playerStarts);
    };

    const changePlayerName = (player, value) => {
        if (value.length <= 12) {
            const updatedPlayerNames = { ...playerNames };
            if (player === 1) {
                updatedPlayerNames.p1 = value;
            } else {
                updatedPlayerNames.p2 = value;
            }
            const content = getNewGame(11, updatedPlayerNames, playerStarts);
            setBody(content.body);
            setFooter(content.footer);
            setPlayerNames(updatedPlayerNames);
        }
    };

    const handleNewGame = (newGameStatus) => {
        const content = getNewGame(11, playerNames, playerStarts);
        console.log('Starting a new game');

        if (newGameStatus === 12) {
            content.body = (
                <Text style={styles.body}>Are you sure you want to end the current game?</Text>
            );

            content.footer = (
                <>
                    <TouchableOpacity onPress={toggleAboutHandler}>
                        <Text style={styles.aboutButton}>About</Text>
                    </TouchableOpacity>
                    <Button title="New Game" onPress={() => newGameHandler(11)} color="#dc3545" />
                </>
            );
        }

        setHeader(content.header);
        setBody(content.body);
        setFooter(content.footer);
        setMenuWidth(content.width);
        setCanClose(content.canClose);
    };

    const toggleAboutHandler = (show) => {
        let content = {};

        if (show) {
            content.header = <Text style={styles.header}>About</Text>;
            content.body = <Text style={styles.body}>Backgammon by Bruno Nunes</Text>; // Add detailed about info here
            content.footer = <Button title="Close" onPress={() => toggleAboutHandler(false)} color="#dc3545" />;
            content.width = styles.menuBig;
            content.canClose = false;
        } else {
            content = getContent(gameStatus, players);
        }

        setHeader(content.header);
        setBody(content.body);
        setFooter(content.footer);
        setMenuWidth(content.width);
        setCanClose(content.canClose);
    };

    return (
        <Modal  transparent={true} visible={gameStatus.showMenu}>
            <View style={styles.modal}>
                <View style={menuWidth}>
                    <View style={styles.headerContainer}>
                        {canClose && <TouchableOpacity onPress={toggleMenuHandler}><Text style={styles.closeButton}>X</Text></TouchableOpacity>}
                        {header}
                    </View>
                    <View style={styles.bodyContainer}>
                        {body}
                    </View>
                    <View style={styles.footerContainer}>
                        {footer}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    menuSmall: {
        width: '50%',
        backgroundColor: 'white',
        padding: '2%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    menuBig: {
        width: '85%',
        backgroundColor: 'white',
        padding: '2%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    body: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 20,
    },
    image: {
        width: '100%',
        marginVertical: 10,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    buttonInfo: {
        backgroundColor: '#17a2b8',
        padding: 10,
        borderRadius: 5,
    },
    buttonDefault: {
        backgroundColor: '#6c757d',
        padding: 10,
        borderRadius: 5,
    },
    closeButton: {
        fontSize: 18,
        color: 'red',
        position: 'absolute',
        right: 10,
        top: 10,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    aboutButton: {
        color: '#007bff',
    },
});

export default Menu;
