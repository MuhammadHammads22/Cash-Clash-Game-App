import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LottieView from 'lottie-react-native';

const FullScreenModal = ({ gameEnd, won, message }) => {

  // Function to safely split message into two parts
  const splitMessage = (msg) => {
    if (!msg) return ['', ''];
    const words = msg.split(' ');
    const m1 = words.slice(0, 2).join(' ');
    const m2 = words.slice(2, 4).join(' ');
    return [m1, m2];
  };

  const [m1, m2] = splitMessage(message);

  return (
    <Modal
      visible={gameEnd}
      animationType="fade"
      transparent={true} // Full-screen modal
      onRequestClose={() => {
        // Override back press behavior if needed
      }}
    >
      <View style={styles.modalContainer}>
        {/* Optionally, display animation if 'won' is true */}
        {won && (
          <LottieView
            source={require('../animation/coinsAnimation.json')} // Ensure the path is correct
            autoPlay
            loop
            style={styles.lottie}
          />
        )}
        {/* Content Container */}
        
          {won ? (
            <View style={styles.contentContainer}>
              <Text style={styles.text}>{m1}</Text>
              {
                m2&& <Text style={styles.text}>{m2}</Text>
              }
            </View>
          ) : (
            
            <View style={[styles.contentContainer,{left:responsiveWidth(34),top:responsiveHeight(46)}]}>
              <Text style={styles.text}>{m2}You Lost!</Text>
            </View>
          )
          }
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dimmed background for better contrast
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    transform: [{ scale: 1.2 }],
    zIndex: 0, // Ensure Lottie is behind the text
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for text
    padding: responsiveWidth(5),
    borderRadius: responsiveWidth(2),
    position:'absolute',
    top:responsiveHeight(44),
    left:responsiveWidth(30),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0, // Ensure text is above the Lottie animation
  },
  text: {
    color: 'black', // Dark text on a light semi-transparent background
    fontSize: responsiveWidth(5), // Adjusted for better readability
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: responsiveHeight(0.5),
  },
});

export default FullScreenModal;
