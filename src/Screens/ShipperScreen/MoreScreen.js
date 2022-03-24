import React, { useContext } from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native';
import Btn from '../../components/Button';
import * as SecureStore from 'expo-secure-store';
import { SignInContext } from '../../contexts/authContext';
const { width } = Dimensions.get('window');
const MoreScreen = () => {
  const { dispatchSignedIn } = useContext(SignInContext);
  const logout = async () => {
    await SecureStore.deleteItemAsync('user');
    dispatchSignedIn({
      type: 'UPDATE_SIGN_IN',
      payload: { userToken: null },
    });
  };
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.header]}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://lh3.googleusercontent.com/a-/AOh14GiYrBcPo9COfsKpA9E17tBtbcze-VqAdMvxdGDW5g=s288-p-rw-no',
          }}
        />
        <View style={styles.info}>
          <Text style={styles.name}>Nguyen Van Sy</Text>
          <Text style={styles.title}>Shipper</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Divider />
        <View
          style={[
            styles.row,
            { justifyContent: 'space-between', paddingVertical: 5 },
          ]}
        >
          <Text style={{ fontSize: 20 }}>Đơn hàng đã giao</Text>
          <FontAwesome5 name="angle-right" size={30} />
        </View>
        <Divider />
        <View
          style={[
            styles.row,
            { justifyContent: 'space-between', paddingVertical: 5 },
          ]}
        >
          <Text style={{ fontSize: 20 }}>Cập nhật thông tin</Text>
          <FontAwesome5 name="angle-right" size={30} />
        </View>
        <Divider />
      </ScrollView>
      <Btn
        onPress={logout}
        text="Đăng xuất"
        style={styles.btnLogout}
        textStyle={styles.txtLogout}
      />
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'green',
    paddingTop: 30,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  info: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 17,
    color: 'white',
  },
  content: {
    padding: 15,
  },
  btnLogout: {
    padding: 10,
    backgroundColor: 'red',
    width: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
  },
  txtLogout: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
});
