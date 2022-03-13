import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Yup from 'yup';
import { useState, useContext } from 'react';
import Btn from '../../components/Button';
import { Image } from 'react-native';
import { Formik } from 'formik';
import * as SecureStore from 'expo-secure-store';
import Line from '../../components/Line';
import { updatePasswordUser } from '../../service/AuthService';
export default function ChangePasswordScreen({ navigation }) {
  const [modalhiden, setModalhiden] = useState(false);
  const validationSchema = Yup.object({
    password: Yup.string().required('Password is required!').min(8),
    cfPassword: Yup.string().when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], 'Mật khẩu không khớp!'),
    }),
  });
  const updatePassword = async (data) => {
    const resetData = await SecureStore.getItemAsync('resetData');
    const email = JSON.parse(resetData).email;
    try {
      await updatePasswordUser({ email: email, password: data.password });
      await SecureStore.deleteItemAsync('resetData');
      setModalhiden(true);
    } catch (error) {
      console.log(error);
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
      <Formik
        initialValues={{ password: '', cfPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          updatePassword(values);
        }}
      >
        {(props) => (
          <>
            <Text style={styles.textInputTitle}> Mật khẩu mới</Text>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                onChangeText={props.handleChange('password')}
                onBlur={props.handleBlur('password')}
                value={props.values.password}
                placeholder="Mật khẩu mới"
              />
            </View>
            {props.touched.password && props.errors.password ? (
              <Text style={styles.txtErr}>{props.errors.password}</Text>
            ) : null}
            <Line height={20} />
            <Text style={styles.textInputTitle}> Xác nhận lại mật khẩu</Text>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                onChangeText={props.handleChange('cfPassword')}
                onBlur={props.handleBlur('cfPassword')}
                value={props.values.cfPassword}
                placeholder="Xác nhận mật khẩu"
              />
            </View>
            {props.touched.cfPassword && props.errors.cfPassword ? (
              <Text style={styles.txtErr}>{props.errors.cfPassword}</Text>
            ) : null}
            <Btn
              text="Thay đổi"
              textStyle={styles.textStyle}
              onPress={props.handleSubmit}
              style={styles.btnLogin}
            />
          </>
        )}
      </Formik>
      <Modal animationType="fade" visible={modalhiden} transparent={true}>
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
              <Text style={styles.successText}>Thành công</Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#696974',
                  lineHeight: 25,
                }}
              >
                Thay đổi mật khẩu thành công
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttonOK}
              onPress={() => {
                setModalhiden(false);
                navigation.navigate('LoginScreen');
              }}
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
    backgroundColor: 'white',
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
    backgroundColor: 'rgb(18, 136, 58)',
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
    borderColor: 'rgb(18, 136, 58)',
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
    backgroundColor: 'rgb(18, 136, 58)',
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
