import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Btn from '../../components/Button';
import FieldInput from '../../components/Form/FieldInput';
import * as Yup from 'yup';
import { Formik } from 'formik';
import ModalShow from '../../components/ModalShow';
import { updatePasswordAsyn } from '../../service/AuthService';
import { Text } from 'react-native';
export default function ChangePassword({ navigation }) {
  const [modal, setModal] = useState(false);
  const [err, setErr] = useState(null);
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Vui lòng nhập mật khẩu cũ!'),
    newPassword: Yup.string()
      .required('Vui lòng nhập mật khẩu mới!')
      .min(6, 'Mật khẩu phải lớn hơn 6 kí tự!'),
    confirmPassword: Yup.string().when('newpassword', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('newpassword')],
        'Mật khẩu không khớp!'
      ),
    }),
  });
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const updatePassword = async (data) => {
    try {
      const res = await updatePasswordAsyn(data);
      setModal(true);
    } catch (error) {
      console.log(error);
      setErr('Mật khẩu cũ không đúng!');
    }
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
              updatePassword(values);
            }}
          >
            {(props) => (
              <View style={styles.form}>
                <FieldInput
                  formProps={props}
                  name="oldPassword"
                  placeholder="Nhập mật khẩu cũ"
                  type="password"
                />
                {err && <Text style={styles.err}>{err}</Text>}
                <FieldInput
                  formProps={props}
                  name="newPassword"
                  placeholder="Nhập mật khẩu mới"
                  type="password"
                />
                <FieldInput
                  formProps={props}
                  name="confirmPassword"
                  placeholder="Xác nhận lại mật khẩu mới"
                  type="password"
                />
                <Btn
                  text="Thay đổi"
                  textStyle={styles.textStyle}
                  onPress={props.handleSubmit}
                  style={styles.btnCapNhat}
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
      <ModalShow
        modalHiden={modal}
        closeBtn={false}
        okPress={() => {
          setModal(false);
          navigation.navigate('AccountScreen');
        }}
      >
        <Text style={styles.success}>Thay đổi mật khẩu thành công </Text>
      </ModalShow>
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

  btnCapNhat: {
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
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  or: {
    fontSize: 17,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  success: {
    textAlign: 'center',
    fontSize: 17,
    color: 'green',
  },
});
