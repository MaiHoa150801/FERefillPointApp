import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import Btn from '../../components/Button';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import Space from '../../components/Space';
import * as Google from 'expo-google-app-auth';
import {
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../../firebase';
import * as Facebook from 'expo-facebook';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ToastAndroid, Toast } from 'react-native';
export default function LoginScreen({ navigation, reloadApp }) {
  const [hidenpassword, setHidenPassword] = useState(true);

  const checkError = (err) => {
    switch (err) {
      case 'auth/user-not-found':
        showToastWithGravity('User not found!');
        break;
      case 'auth/wrong-password':
        showToastWithGravity('Incorrect password!');
        break;
      default:
        break;
    }
  };
  const loginWithEmail = async (data) => {
    const { email, password } = data;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      checkError(error.code);
    }
  };
  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '301647466997-nsfjo1drogmaun60nu2f939991hn663b.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        try {
          const credential = GoogleAuthProvider.credential(
            result.idToken,
            result.accessToken
          );
          const user = await signInWithCredential(auth, credential);
        } catch {}
      } else {
        return { cancelled: true };
      }
    } catch {}
  };
  async function loginWithFacebook() {
    await Facebook.initializeAsync('359802282610628');
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      const credential = FacebookAuthProvider.credential(token);
      signInWithCredential(auth, credential).catch((error) => {});
    }
  }
  const validationSchema = Yup.object({
    email: Yup.string().email('!Invalid Email').required('!Email is required'),
    password: Yup.string().required('!Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };
  const showToastWithGravity = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="handled"
      >
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
        <View style={styles.content}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, formikActions) => {
              loginWithEmail(values);
            }}
          >
            {(props) => (
              <>
                <View style={styles.form}>
                  <View style={styles.field}>
                    <View style={styles.input}>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={props.handleChange('email')}
                        onBlur={props.handleBlur('email')}
                        autoFocus
                        value={props.values.email}
                        placeholder="Email"
                      />
                    </View>
                    {props.touched.email && props.errors.email ? (
                      <Text style={styles.err}>{props.errors.email}</Text>
                    ) : null}
                  </View>

                  <View style={styles.input}>
                    <View style={styles.inputPass}>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={props.handleChange('password')}
                        onBlur={props.handleBlur('password')}
                        value={props.values.password}
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
                  {props.touched.password && props.errors.password ? (
                    <Text style={styles.err}>{props.errors.password}</Text>
                  ) : null}
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
                  onPress={props.handleSubmit}
                  style={styles.btnLogin}
                />
              </>
            )}
          </Formik>
          <View style={styles.divider}></View>
          <View style={styles.textOr}>
            <Text style={styles.or}>Or</Text>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={signInWithGoogleAsync}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png',
                }}
                width={40}
                height={40}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
            <Space width={30} />
            <TouchableOpacity onPress={loginWithFacebook}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png',
                }}
                width={40}
                height={40}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textFooter}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            <Text style={{ fontSize: 15 }}>No account yet? Register</Text>
          </TouchableOpacity>
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
  },
  field: {
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
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 50,
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
    fontWeight: 'bold',
  },
  or: {
    fontSize: 17,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  txtWar: {
    color: 'yellow',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
