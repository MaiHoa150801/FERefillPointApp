import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import Btn from '../../components/Button';
import { useState } from 'react';
import AnimatedLoader from 'react-native-animated-loader';
import { ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import Space from '../../components/Space';

export default function LoginScreen({ navigation, reloadApp }) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [hidenpassword, setHidenPassword] = useState(true);
  const [errors, setErrors] = useState(null);

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
  const onSubmit = async () => {
    navigation.navigate('HomeTab');
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.form}>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
              />
            </View>
            <View style={styles.input}>
              <View style={styles.inputPass}>
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={hidenpassword ? true : false}
                  placeholder="Password"
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
            {errors && <Text style={styles.err}>{errors}</Text>}
          </View>
          <View>
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
          <View style={styles.textOr}>
            <Text style={styles.or}>Or</Text>
          </View>
          <View style={styles.row}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png',
              }}
              width={40}
              height={40}
              style={{ width: 50, height: 50 }}
            />
            <Space width={30} />
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png',
              }}
              width={40}
              height={40}
              style={{ width: 50, height: 50 }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.textFooter}>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={{ fontSize: 15 }}>No account yet? Register</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
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
  divider: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    padding: 10,
  },
  form: {
    width: '100%',
  },
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#d9d5d4',
    borderRadius: 40,
    marginBottom: '5%',
  },
  inputPass: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  textForgor: {
    textAlign: 'right',
    color: '#111111',
  },
  textFooter: {
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textOr: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 25,
  },
  txt: {
    color: 'black',
    textAlign: 'center',
    margin: 2,
    fontSize: 15,
  },
  err: {
    color: 'red',
    paddingLeft: 10,
  },
  or: {
    fontSize: 17,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
