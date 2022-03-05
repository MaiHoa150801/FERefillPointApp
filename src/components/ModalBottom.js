import React from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { View } from 'react-native';
import { Modal } from 'react-native';
export default function ModalBottom({
  setModalVisible,
  modalVisible,
  children,
  title,
  closeIcon,
  height,
  closeRightIcon,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <TouchableNativeFeedback
          onPress={() => setModalVisible()}
          touchSoundDisabled={true}
        >
          <View style={styles.viewTouch} />
        </TouchableNativeFeedback>
        <View style={[styles.modalView, { height: height }]}>
          <View style={styles.modalContainer}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopColor: '#CCCCCC',
    borderTopWidth: 2,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
  },
  modalContainer: {
    width: '94%',
    alignContent: 'center',
  },
  title: {
    textAlign: 'center',
    width: '90%',
    fontSize: 25,
    color: 'black',
  },
  divider: {
    width: '100%',
    marginBottom: 20,
    height: 10,
  },
  viewTouch: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
});
