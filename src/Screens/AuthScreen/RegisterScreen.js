import React, { useState } from 'react';
import { ToastAndroid, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Btn from '../../components/Button';
import FieldInput from '../../components/Form/FieldInput';
import {
  createUserWithEmailAndPassword,
  signInAnonymously,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../../firebase';
import { Image } from 'react-native';
const RegisterScreen = ({ navigation }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('!Name is required'),
    phone: Yup.string()
      .required('!Phone is required')
      .min(10, '!Invalid phone number'),
    email: Yup.string().email('!Invalid Email').required('!Email is required'),
    password: Yup.string()
      .required('!Password is required')
      .min(6, 'Password should be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('!Confirm password is required')
      .min(6, 'Password should be at least 6 characters'),
  });
  const checkError = (err) => {
    switch (err) {
      case 'auth/email-already-in-use':
        showToastWithGravity('!Email already in use');
        break;
      default:
        break;
    }
  };
  const showToastWithGravity = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  const initialValues = {
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const register = async ({ email, password, name }) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then(async (e) => {
        await updateProfile(auth.currentUser, { displayName: name });
      });
    } catch (error) {
      checkError(error.code);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
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
              register(values);
            }}
          >
            {(props) => (
              <View style={styles.form}>
                <FieldInput
                  formProps={props}
                  focus={true}
                  name="name"
                  placeholder="Name"
                />
                <FieldInput
                  formProps={props}
                  name="phone"
                  placeholder="Phone"
                />
                <FieldInput
                  formProps={props}
                  name="email"
                  placeholder="Email"
                />
                <FieldInput
                  formProps={props}
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <FieldInput
                  formProps={props}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  type="password"
                />
                <Btn
                  text="Register"
                  textStyle={styles.textStyle}
                  onPress={props.handleSubmit}
                  style={styles.btnLogin}
                />
              </View>
            )}
          </Formik>
        </View>
        <View style={styles.textFooter}>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={{ fontSize: 15 }}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLogin: {
    backgroundColor: 'rgb(18, 136, 58)',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginTop: 20,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFooter: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 50,
  },
});
