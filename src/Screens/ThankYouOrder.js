import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
const ThankYouOrder = ({ navigation }) => {
  return (
    <View style={styles.contaniner}>
      <View style={styles.thankyou}>
        <FontAwesome5 name="check-circle" size={50} color="green" />
        <Text style={styles.succ}>Thành công</Text>
        <Text style={styles.txt}>Cám ơn bạn đã đăng kí đổ đầy sản phẩm</Text>
        <Text style={styles.txt}>
          Chúng tôi sẽ nhanh chóng đến lấy dụng cụ đổ đầy chỗ bạn và đến shop
          trong thòi gian sớm nhất
        </Text>
        <Text style={styles.id}>Mã đơn hàng: 45645765876</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('GreenMap')}
        >
          <Text style={styles.txtBack}>Quay lại trang chủ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ThankYouOrder;

const styles = StyleSheet.create({
  contaniner: {
    flex: 1,
    marginTop: 30,
  },
  thankyou: {
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    paddingTop: 40,
  },
  txt: {
    color: '#444444',
    width: '90%',
    textAlign: 'center',
  },
  succ: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  id: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 20,
    marginBottom: 20,
  },
  txtBack: {
    color: 'white',
    fontSize: 17,
  },
  btn: {
    padding: 10,
    borderRadius: 10,
    width: '40%',
    backgroundColor: 'green',
  },
});
