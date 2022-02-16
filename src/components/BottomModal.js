import { BottomSheet } from 'react-native-btr';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import Btn from './Button';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useRef } from 'react';
import { KeyboardAvoidingView } from 'react-native';
const BottomModal = (props) => {
  const { visible, onBackButtonPress, onBackdropPress, title, children } =
    props;
  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
    >
      <KeyboardAvoidingView behavior="height" style={styles.modalView}>
        <View style={styles.modalContainer}>
          <View style={styles.row}>
            <Text style={styles.title}>{title}</Text>
            <Btn
              text="x"
              textStyle={{ fontSize: 30 }}
              onPress={onBackButtonPress}
            />
          </View>
          <Divider style={styles.divider} />
          {children}
        </View>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};
export default BottomModal;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  modalView: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: '100%',
    backgroundColor: 'white',
    height: '80%',
  },
  modalContainer: {
    width: '94%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%',
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
});
