import React, { useState } from 'react';
import { ToastAndroid, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import Btn from '../../components/Button';
import FieldInput from '../../components/Form/FieldInput';
import { Picker } from '@react-native-picker/picker';
import { Image } from 'react-native';
import { Register } from '../../service/AuthService';
const RegisterScreen = ({ navigation }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Vui lòng nhập tên!'),
    address: Yup.string().required('Vui lòng nhập địa chỉ!'),
    gender: Yup.string().required('Chọn giới tính!'),
    phone: Yup.number('Số điện thoại không hợp lệ!')
      .required('Vui lòng nhập số điện thoại!')
      .min(100000000, 'Số điện thoại không hợp lệ!'),
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Vui lòng nhập Email!'),
    password: Yup.string()
      .required('Vui lòng nhập mật khẩu!')
      .min(6, 'Mật khẩu phải lớn hơn 6 kí tự!'),
    cpassword: Yup.string().when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], 'Mật khẩu không khớp!'),
    }),
  });
  const showToastWithGravity = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  const initialValues = {
    name: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    cpassword: '',
  };
  const register = async (values) => {
    try {
      const response = await Register(values);
      navigation.navigate('LoginScreen');
    } catch (error) {
      showToastWithGravity('Tài khoản đã tồn tại!');
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
                  name="name"
                  placeholder="Họ tên"
                />
                <View style={styles.field}>
                  <View style={styles.input}>
                    <Picker
                      selectedValue={props.values.gender}
                      mode="dropdown"
                      onValueChange={(itemValue, itemIndex) =>
                        props.setFieldValue('gender', itemValue)
                      }
                    >
                      <Picker.Item label="Giới tính" value="" />
                      <Picker.Item label="Nam" value="Male" />
                      <Picker.Item label="Nữ" value="Female" />
                    </Picker>
                  </View>
                  {props.touched.gender && props.errors.gender ? (
                    <Text style={styles.err}>{props.errors.gender}</Text>
                  ) : null}
                </View>
                <FieldInput
                  formProps={props}
                  name="phone"
                  placeholder="Số điện thoại"
                />
                <FieldInput
                  formProps={props}
                  name="address"
                  placeholder="Địa chỉ"
                />
                <FieldInput
                  formProps={props}
                  name="email"
                  placeholder="Email"
                />
                <FieldInput
                  formProps={props}
                  name="password"
                  placeholder="Mật khẩu"
                  type="password"
                />
                <FieldInput
                  formProps={props}
                  name="cpassword"
                  placeholder="Xác nhận lại mật khẩu"
                  type="password"
                />
                <Btn
                  text="Đăng kí"
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
            <Text style={{ fontSize: 15 }}>Đã có tài khoản? Đăng nhập</Text>
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
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#d9d5d4',
    borderRadius: 40,
  },
  field: {
    marginBottom: '5%',
  },
  err: {
    color: 'red',
    paddingLeft: 10,
    fontWeight: 'bold',
  },
});
