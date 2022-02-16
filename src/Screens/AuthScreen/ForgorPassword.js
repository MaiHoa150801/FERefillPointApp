import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState, useContext } from 'react';
import Btn from '../../components/Button';
export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState(null);

  const [modalhiden, setModalhiden] = useState(false);

  const onSubmit = async () => {};

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        visible={modalhiden}
        onRequestClose={() => setModalhiden(false)}
      >
        <View style={styles.viewModel}>
          <View style={styles.viewModelContent}>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.checkView}>
                <AntDesign name="checkcircle" size={35} color="#27C754" />
              </View>
              <Text style={styles.successText}>Success</Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#696974',
                  lineHeight: 25,
                }}
              >
                Reset link has been sent to “goodstartearlylearning@gmail.com”
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttonOK}
              onPress={() => setModalhiden(false)}
            >
              <Text style={{ fontWeight: 'bold', color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Forgot password</Text>
      <Text style={styles.detail}>
        Please enter your email address to get reset link
      </Text>
      <View style={styles.input}>
        <Text style={styles.textInputTitle}> Email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          autoCapitalize={false}
          onChangeText={setEmail}
          placeholder=" Enter your email"
        />
      </View>
      <Btn
        text="Get Reset Link"
        textStyle={styles.textStyle}
        onPress={onSubmit}
        style={styles.btnLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: '3%',
  },
  detail: {
    marginBottom: '7%',
  },
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#d9d5d4',
    borderRadius: 10,
    marginBottom: '5%',
  },

  textStyle: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  btnLogin: {
    backgroundColor: '#DB147F',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
  },
  viewModel: {
    backgroundColor: 'grey',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewModelContent: {
    backgroundColor: 'white',
    height: '40%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
    backgroundColor: '#DB147F',
    padding: 15,
    borderRadius: 10,
    width: '85%',
    marginTop: 20,
    alignItems: 'center',
  },
});
