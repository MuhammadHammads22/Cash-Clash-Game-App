import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';

const FullScreenModal = ({isVisible}) => {

  // Disable Back Button
  // React.useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => true // Prevent back button from closing the modal
  //   );

  //   return () => backHandler.remove();
  // }, []);

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true} // Full-screen modal
      onRequestClose={() => {
        // Override back press behavior
      }}
    >
      <TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          {/* <Text style={styles.text}>This is a full-screen modal</Text> */}
          {/* Your custom modal content */}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.8)', // Optional dim background
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default FullScreenModal;
