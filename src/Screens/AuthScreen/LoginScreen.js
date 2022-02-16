import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import Btn from '../../components/Button';
import { useState } from 'react';
import AnimatedLoader from 'react-native-animated-loader';
import { ScrollView } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function LoginScreen({ navigation, reloadApp }) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [hidenpassword, setHidenPassword] = useState(true);
  const [errors, setErrors] = useState('');

  const checkError = (err) => {
    switch (err) {
      case 'auth/missing-email':
        setErrors('Email is required');
        break;
      case 'auth/invalid-email':
        setErrors('Invalid email');
        break;
      case 'auth/internal-error':
        setErrors('Password is required');
        break;
      case 'auth/user-not-found':
        setErrors('User not found');
        break;
      case 'auth/wrong-password':
        setErrors('Incorrect password');
        break;
      default:
        break;
    }
  };
  const onSubmit = async () => {};
  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle="#DB147F"
        speed={1}
      >
        <Text>Loading...</Text>
      </AnimatedLoader>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.checkView}>
              <AntDesign name="checkcircle" size={40} color="#27C754" />
            </View>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.textInputTitle}> Email</Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder=" Enter your email"
              />
            </View>
            <View style={styles.input}>
              <Text> Password</Text>
              <View style={styles.inputPass}>
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={hidenpassword ? true : false}
                  placeholder=" Enter your password"
                />
                <TouchableOpacity
                  onPress={() => setHidenPassword(!hidenpassword)}
                >
                  {hidenpassword ? (
                    <Feather name="eye-off" size={20} color="black" />
                  ) : (
                    <Feather name="eye" size={20} color="black" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.err}>{errors}</Text>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotScreen')}
            >
              <Text style={styles.textForgor}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <Btn
            text="Login"
            textStyle={styles.textStyle}
            onPress={onSubmit}
            style={styles.btnLogin}
          />
          <View style={styles.divider}></View>
          <View style={styles.textFooter}>
            <Text style={styles.txt}>
              If you have trouble logging in to KindiCare CRM,
            </Text>
            <Text style={{ color: '#DB147F', marginTop: '1%' }}>
              {' '}
              please contact our Customer Care team.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    alignContent: 'center',
  },
  checkView: {
    backgroundColor: '#92E2A952',
    height: 90,
    width: 90,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
  },
  content: {
    width: '90%',
    margin: '5%',
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
  divider: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    padding: 5,
    borderRadius: 5,
  },
  form: {
    width: '100%',
  },
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#d9d5d4',
    borderRadius: 10,
    marginBottom: '5%',
  },
  inputPass: {
    flexDirection: 'row',
    width: '90%',
  },
  textForgor: {
    textAlign: 'right',
    color: '#DB147F',
  },
  textFooter: {
    marginTop: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: 'black',
    textAlign: 'center',
    margin: 2,
    fontSize: 15,
  },
  lottie: {
    width: 100,
    height: 100,
  },
  err: {
    color: 'red',
    paddingLeft: 10,
  },
});
