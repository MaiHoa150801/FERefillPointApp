import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Btn from '../../components/Button';
const RegisterScreen = ({ navigation }) => {
  const [hidenpassword, setHidenPassword] = useState(true);
  const [hidenCfPassword, setHidenCfPassword] = useState(true);
  const validationSchema = Yup.object({
    name: Yup.string().required('!Name is required'),
    phone: Yup.string().required('!Phone is required'),
    email: Yup.string().email('!Invalid Email').required('!Email is required'),
    password: Yup.string().required('!Password is required'),
    confirmPassword: Yup.string().required('!Confirm password is required'),
  });

  const initialValues = {
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, formikActions) => {
              setTimeout(() => {
                addCentre(values);
              }, 500);
            }}
          >
            {(props) =>
              console.log(props) || (
                <View style={styles.form}>
                  <View style={styles.input}>
                    <TextInput
                      onChangeText={props.handleChange('name')}
                      onBlur={props.handleBlur('name')}
                      value={props.values.name}
                      autoFocus
                      style={styles.textInput}
                      placeholder="Name"
                    />
                  </View>
                  {props.touched.name && props.errors.name ? (
                    <Text style={styles.error}>{props.errors.name}</Text>
                  ) : null}
                  <View style={styles.input}>
                    <TextInput
                      onChangeText={props.handleChange('phone')}
                      onBlur={props.handleBlur('phone')}
                      value={props.values.phone}
                      autoFocus
                      style={styles.textInput}
                      placeholder="Phone"
                    />
                  </View>
                  {props.touched.phone && props.errors.phone ? (
                    <Text style={styles.error}>{props.errors.phone}</Text>
                  ) : null}
                  <View style={styles.input}>
                    <TextInput
                      onChangeText={props.handleChange('email')}
                      onBlur={props.handleBlur('email')}
                      value={props.values.email}
                      autoFocus
                      style={styles.textInput}
                      placeholder="Email"
                    />
                  </View>
                  {props.touched.email && props.errors.email ? (
                    <Text style={styles.error}>{props.errors.email}</Text>
                  ) : null}
                  <View style={styles.input}>
                    <View style={styles.inputPass}>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={props.handleChange('password')}
                        onBlur={props.handleBlur('password')}
                        value={props.values.password}
                        autoFocus
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
                    <Text style={styles.error}>{props.errors.password}</Text>
                  ) : null}
                  <View style={styles.input}>
                    <View style={styles.inputPass}>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={props.handleChange('confirmPassword')}
                        onBlur={props.handleBlur('confirmPassword')}
                        value={props.values.confirmPassword}
                        autoFocus
                        secureTextEntry={hidenCfPassword ? true : false}
                        placeholder="Confirm password"
                      />
                      <TouchableOpacity
                        onPress={() => setHidenCfPassword(!hidenCfPassword)}
                      >
                        {hidenCfPassword ? (
                          <Feather name="eye-off" size={20} color="black" />
                        ) : (
                          <Feather name="eye" size={20} color="black" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  {props.touched.confirmPassword &&
                  props.errors.confirmPassword ? (
                    <Text style={styles.error}>
                      {props.errors.confirmPassword}
                    </Text>
                  ) : null}
                  <Btn
                    text="Register"
                    textStyle={styles.textStyle}
                    onPress={props.handleSubmit}
                    style={styles.btnLogin}
                  />
                </View>
              )
            }
          </Formik>
        </View>
      </ScrollView>
      <View style={styles.textFooter}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={{ fontSize: 15 }}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#3366CC',
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
  inputPass: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    margin: 10,
  },
  textFooter: {
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
