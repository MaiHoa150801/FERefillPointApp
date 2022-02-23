import React from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Btn from './src/components/Button';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://lh4.googleusercontent.com/proxy/lsTCw2VjeHy-iGWg0ltkQ7lfJWD6bfC0x8Q76xJF8nAOkHc1GL6Zmr2F17to0INGnSeopubJJ5QtTAxAQ43eUo5z_ms9XecbVdbRoZc',
        }}
        width={40}
        height={40}
        style={styles.image}
      />
      <View style={styles.viewTxt}>
        <Text style={styles.txtLogo}>Kết nối nhà sản xuất và khách hàng</Text>
        <Text style={styles.txtLogo}>mang lại giá trị bền vững cho xã hội</Text>
      </View>
      <Btn
        text="Bắt đầu"
        style={styles.btnStart}
        textStyle={styles.btnTxt}
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  viewTxt: {
    marginTop: '5%',
  },
  txtLogo: {
    fontSize: 20,
  },
  btnStart: {
    backgroundColor: '#3366CC',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  btnTxt: {
    fontSize: 15,
    color: 'white',
  },
});
export default SplashScreen;
