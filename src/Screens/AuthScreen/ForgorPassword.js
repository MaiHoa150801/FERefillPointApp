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
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase';
import { Image } from 'react-native';
export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState(null);
  const [err, setErr] = useState(null);
  const [modalhiden, setModalhiden] = useState(false);

  const forgotPassword = async () => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email).then((e) => {
          setModalhiden(true);
        });
      } catch (error) {
        setErr('Email does not exist!');
      }
    } else {
      setErr('Email is required!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={{
            uri: 'https://lh4.googleusercontent.com/proxy/lsTCw2VjeHy-iGWg0ltkQ7lfJWD6bfC0x8Q76xJF8nAOkHc1GL6Zmr2F17to0INGnSeopubJJ5QtTAxAQ43eUo5z_ms9XecbVdbRoZc',
          }}
          width={200}
          height={200}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <Text style={styles.textInputTitle}> Email</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          placeholder=" Enter your email"
        />
      </View>
      <Text style={styles.txtErr}>{err}</Text>
      <Btn
        text="Get Reset Link"
        textStyle={styles.textStyle}
        onPress={forgotPassword}
        style={styles.btnLogin}
      />
      <Modal
        animationType="fade"
        visible={modalhiden}
        onRequestClose={() => setModalhiden(false)}
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
              <Text style={styles.successText}>Success</Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#696974',
                  lineHeight: 25,
                }}
              >
                Reset link has been sent to {email}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
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
    marginBottom: 5,
  },
  textStyle: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  btnLogin: {
    backgroundColor: '#3366CC',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
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
    height: '35%',
    width: '60%',
    borderColor: '#9900CC',
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
    backgroundColor: '#9900CC',
    padding: 15,
    borderRadius: 10,
    width: '85%',
    marginTop: 20,
    alignItems: 'center',
  },
  textInputTitle: {
    fontSize: 15,
  },
  txtErr: {
    color: 'red',
    fontWeight: 'bold',
  },
});
