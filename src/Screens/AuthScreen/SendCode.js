import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import * as Yup from 'yup';
import { useState, useContext } from 'react';
import Btn from '../../components/Button';
import { Image } from 'react-native';
import { Formik } from 'formik';
import CountDown from 'react-native-countdown-component';
import * as SecureStore from 'expo-secure-store';
import { forgotPasswordUser, verifyCode } from '../../service/AuthService';
export default function SendCodeScreen({ navigation }) {
  const [modalhiden, setModalhiden] = useState(false);
  const [resend, setResend] = useState(false);
  const [countDownTime, setCountDownTime] = useState(120);
  const [countDown, setCountDown] = useState(true);
  const [message, setMessage] = useState({
    type: '',
    message: '',
  });
  const validationSchema = Yup.object({
    code: Yup.string().required('Code is required!').min(6),
  });
  const sendCode = async (code) => {
    const data = await SecureStore.getItemAsync('resetData');
    const email = JSON.parse(data).email;
    try {
      const message = await verifyCode({ code: code, email: email });
      setCountDown(false);
      navigation.navigate('ChangePasswordScreen');
    } catch (error) {
      console.log(error);
      setMessage({
        type: 'Lỗi!',
        message: `Mã code không chính xác hoặc đã hết hạn!`,
      });
      setModalhiden(true);
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
        initialValues={{ code: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          sendCode(values.code);
        }}
      >
        {(props) => (
          <>
            <Text style={styles.textInputTitle}>
              {' '}
              Nhập mã bảo vệ được gửi về email của bạn
            </Text>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                onChangeText={props.handleChange('code')}
                onBlur={props.handleBlur('code')}
                value={props.values.code}
                placeholder=" * * * * * *(6)"
              />
            </View>
            {props.touched.code && props.errors.code ? (
              <Text style={styles.txtErr}>{props.errors.code}</Text>
            ) : null}
            <Btn
              text="Gửi mật mã xác nhận"
              textStyle={styles.textStyle}
              onPress={props.handleSubmit}
              style={styles.btnLogin}
            />
            {resend && (
              <TouchableOpacity
                onPress={async () => {
                  setCountDownTime((prevState) => prevState + 0.1);
                  setResend(false);
                  setCountDown(true);
                  const data = await SecureStore.getItemAsync('resetData');
                  const email = JSON.parse(data).email;
                  await forgotPasswordUser({ email: email });
                }}
                style={{ alignItems: 'center', marginTop: 10 }}
              >
                <Text style={styles.txtRS}>Gửi lại mã</Text>
              </TouchableOpacity>
            )}

            <CountDown
              size={15}
              until={countDownTime}
              running={countDown}
              onFinish={() => {
                setMessage({
                  type: 'Cảnh báo',
                  message: 'Mã xác thực đã hết hạn!',
                });
                setModalhiden(true);
                setResend(true);
              }}
              digitStyle={{
                backgroundColor: '#FFF',
                marginTop: 20,
                borderWidth: 2,
                borderColor: '#1CC625',
              }}
              digitTxtStyle={{ color: '#1CC625' }}
              timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
              separatorStyle={{ color: '#1CC625' }}
              timeToShow={['M', 'S']}
              timeLabels={{ m: null, s: null }}
              showSeparator
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
              <Text style={styles.successText}>{message.type}</Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#696974',
                  lineHeight: 25,
                }}
              >
                {message.message}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttonOK}
              onPress={async () => {
                setModalhiden(false);
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
  txtRS: {
    color: 'rgb(18, 136, 58)',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
