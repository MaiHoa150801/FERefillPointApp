import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { Modal } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Btn from './Button';

const ModalShow = ({
  modalHiden,
  canclePress,
  okPress,
  children,
  hideModal,
  btnCf,
  closeBtn = true,
}) => {
  return (
    <Modal
      animationType="fade"
      visible={modalHiden}
      onRequestClose={() => hideModal()}
      transparent={true}
    >
      <View style={styles.viewModel}>
        <View style={styles.viewModelContent}>
          <View style={{ alignItems: 'center' }}>
            <Image
              width={100}
              height={100}
              style={{ width: 100, height: 100 }}
              source={{
                uri: 'https://lh4.googleusercontent.com/proxy/lsTCw2VjeHy-iGWg0ltkQ7lfJWD6bfC0x8Q76xJF8nAOkHc1GL6Zmr2F17to0INGnSeopubJJ5QtTAxAQ43eUo5z_ms9XecbVdbRoZc',
              }}
            />
            {children}
          </View>
          {btnCf && (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.buttonOK}
                onPress={() => okPress()}
              >
                <Text style={{ fontWeight: 'bold', color: 'white' }}>OK</Text>
              </TouchableOpacity>
              {canclePress && (
                <TouchableOpacity
                  style={styles.buttonCancle}
                  onPress={() => canclePress()}
                >
                  <Text style={{ fontWeight: 'bold', color: 'white' }}>
                    Cancle
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {closeBtn == true && (
            <Btn
              text="X"
              textStyle={styles.txtClose}
              onPress={hideModal}
              style={styles.btnClose}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalShow;

const styles = StyleSheet.create({
  err: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },
  viewModel: {
    position: 'relative',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    flex: 1,
    justifyContent: 'center',
    borderColor: 'red',
    alignItems: 'center',
  },
  viewModelContent: {
    backgroundColor: 'white',
    height: '40%',
    width: '70%',
    borderColor: 'rgb(18, 136, 58)',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
  },
  checkView: {
    backgroundColor: '#92E2A952',
    height: 70,
    width: 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonOK: {
    backgroundColor: 'rgb(18, 136, 58)',
    padding: 15,
    borderRadius: 10,
    // width: '85%',
    marginTop: 20,
    alignItems: 'center',
    marginRight: 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 10,
    borderColor: 'green',
    borderWidth: 0,
  },
  buttonCancle: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    backgroundColor: 'rgb(18, 136, 58)',
    borderRadius: 4,
  },
  txtBtn: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnClose: {
    padding: 10,
    borderRadius: 4,
    position: 'absolute',
    top: 5,
    right: 10,
  },
  txtClose: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    marginTop: 30,
    // ...StyleSheet.absoluteFillObject,
  },
  map: {
    width: '100%',
    height: '100%',
    // ...StyleSheet.absoluteFillObject,
    // flex: 1,
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 48,
  },
});
