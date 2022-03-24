import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import {
  deleteCart,
  getCart,
  updateQuantityCart,
} from '../service/CartService';
import { StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Modal } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { createOrder } from '../service/OrderService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Map from '../components/Map';
import Btn from '../components/Button';
import Line from '../components/Line';
import { userGetVoucher } from '../service/VoucherService';
import CardVoucher from '../components/CardVoucher';
import CardVoucherUse from '../components/CardVoucherUse';
const ShoppingCart = ({ navigation, route }) => {
  const [date, setDate] = useState('');
  const [discount, setDiscount] = useState(0);
  const [modalhiden, setModalhiden] = useState(false);
  const [voucher, setVoucher] = useState(null);
  const [voucherSelect, setVoucherSelect] = useState(null);
  const [address, setAddress] = useState(null);
  const [shipAddress, setShipAddress] = useState(null);
  const [map, setMap] = useState(false);
  const { shop, shopId } = route.params;
  const [product, setProduct] = useState();
  const [err, setErr] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getDataCart();
    getVoucher();
  }, [navigation]);

  //get data from local DB by ID
  const getDataCart = async () => {
    let items = await getCart(shop);
    setProduct(items);
    getTotal(items);
  };

  const getVoucher = async () => {
    const profile = await SecureStore.getItemAsync('user');
    const user = await JSON.parse(profile).user;
    const voucher = await userGetVoucher(user._id);
    setVoucher(voucher.data.voucher.list_voucher_id);
  };

  const getTotal = (productData) => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice =
        productData[index].sale_price * productData[index].quantity;

      total = total + productPrice;
    }
    setTotal(total);
  };

  const checkOut = async () => {
    if (date == '') {
      setErr('Vui lòng chọn ngày!');
      return 0;
    }
    if (shipAddress == null) {
      setErr('Vui lòng chọn địa chỉ!');
      return 0;
    }
    const profile = await SecureStore.getItemAsync('user');
    const user = JSON.parse(profile).user;
    const orderDetail = [];
    await product.map((e) =>
      orderDetail.push({
        product: e._id,
        quantity: e.quantity,
      })
    );
    const order = {
      account_id: user._id,
      list_order: orderDetail,
      total_money: total - discount,
      salesperson_id: shopId,
      date_refill: date,
      shipAddress,
      voucher_id: voucherSelect !== null ? voucherSelect._id : null,
    };
    try {
      const nameShop = await `cart${shop.replace(/ /g, '')}`;
      const response = await createOrder(order);
      await AsyncStorage.removeItem(nameShop);
      navigation.navigate('ThankYouOrder');
    } catch (err) {
      console.log(err);
    }
  };
  const useVoucher = (voucherSelected) => {
    if (!voucherSelect) {
      setVoucherSelect(voucherSelected);
      if (voucherSelected.discount.indexOf('%') == -1) {
        setDiscount(total - parseInt(voucherSelected.discount));
      } else {
        let giam = voucherSelected.discount.replace('%', '');
        setDiscount((parseInt(total) / 100) * parseInt(giam));
      }
    } else {
      setVoucherSelect(null);
      setDiscount(0);
    }
  };
  const renderProducts = (data, index) => {
    return (
      <TouchableOpacity
        key={data._id}
        onPress={() =>
          navigation.navigate('ProductInfo', { productID: data.id })
        }
        style={{
          width: '100%',
          height: 100,
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '30%',
            height: 100,
            borderRadius: 10,
            marginRight: 22,
          }}
        >
          <Image
            source={{ uri: data.list_image[0] }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            // justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 17,
                  maxWidth: '100%',
                  color: 'black',
                  fontWeight: '600',
                  letterSpacing: 1,
                }}
              >
                {data.name}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '400',
                  maxWidth: '100%',
                  color: 'green',
                  fontWeight: 'bold',
                  marginRight: 4,
                }}
              >
                {data.sale_price}đ/100ml
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  width: 23,
                  height: 23,
                  borderRadius: 5,
                  backgroundColor: 'rgba(0,0,0,0.06)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 20,
                  padding: 4,
                }}
                onPress={async () => {
                  await updateQuantityCart(shop, data._id, -1);
                  getDataCart();
                }}
              >
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: 'green',
                  }}
                />
              </TouchableOpacity>
              <Text>{data.quantity}</Text>
              <TouchableOpacity
                style={{
                  width: 23,
                  height: 23,
                  borderRadius: 5,
                  backgroundColor: 'rgba(0,0,0,0.06)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 20,
                  padding: 4,
                }}
                onPress={async () => {
                  await updateQuantityCart(shop, data._id, 1);
                  getDataCart();
                }}
              >
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: 'green',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginLeft: 'auto',
            }}
            onPress={async () => {
              await deleteCart(shop, data._id);
              getDataCart();
            }}
          >
            <MaterialCommunityIcons
              name="delete"
              style={{
                fontSize: 40,
                color: 'red',
                padding: 8,
              }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        position: 'relative',
        marginTop: 20,
      }}
    >
      <ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{ backgroundColor: 'white' }}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 30,
                color: '#777777',
                padding: 12,
                backgroundColor: 'white',
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              color: '#000000',
              fontWeight: 'bold',
              color: 'rgb(18, 136, 58)',
            }}
          >
            Giỏ hàng
          </Text>
          <View></View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          {product ? product.map(renderProducts) : null}
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 20 }}
        >
          {voucher &&
            voucher.map((e) => (
              <CardVoucherUse
                description={e.description}
                expiry_date={e.expiry_date}
                saved={
                  voucherSelect == null
                    ? false
                    : voucherSelect._id == e._id
                    ? true
                    : false
                }
                saveVoucher={() => useVoucher(e)}
              />
            ))}
        </ScrollView>
        <View>
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 40,
              marginBottom: 80,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#000000',
                fontWeight: '600',
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              Thông tin đơn hàng
            </Text>
            {discount !== 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    maxWidth: '80%',
                    color: 'rgb(18, 136, 58)',
                    opacity: 0.5,
                  }}
                >
                  Voucher giảm giá
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: 'rgb(18, 136, 58)',
                    opacity: 0.8,
                  }}
                >
                  {discount}đ
                </Text>
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  maxWidth: '80%',
                  color: '#000000',
                  opacity: 0.5,
                }}
              >
                Tổng tiền thanh toán
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#000000',
                  opacity: 0.8,
                }}
              >
                {total - discount}đ
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 22,
              }}
            ></View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            ></View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          marginBottom: 20,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          disabled={product ? false : true}
          onPress={() => setModalhiden(true)}
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: product ? 'green' : 'gray',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '650',
              letterSpacing: 1,
              color: '#ffffff',
              textTransform: 'uppercase',
            }}
          >
            Đặt lịch refill
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        visible={modalhiden}
        onRequestClose={() => setModalhiden(false)}
        transparent={true}
      >
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
              <Text style={styles.successText}>Đăng kí thời gian</Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={date} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    //display: 'none',
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    // marginLeft: 36,
                    borderColor: 'green',
                  },
                  dateText: {
                    color: 'green',
                    fontWeight: 'bold',
                  },
                }}
                onDateChange={(date) => {
                  setDate(date);
                  setErr(null);
                }}
              />
              {err != null && <Text style={styles.err}>{err}</Text>}
            </View>
            <Line height={10} />
            <TouchableOpacity onPress={() => setMap(true)}>
              <Text style={{ color: 'green', fontWeight: 'bold' }}>
                Chọn địa điểm giao hàng
              </Text>
            </TouchableOpacity>
            {shipAddress && <Text style={{ color: 'green' }}>Đã chọn</Text>}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.buttonOK}
                onPress={() => {
                  checkOut();
                }}
              >
                <Text style={{ fontWeight: 'bold', color: 'white' }}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCancle}
                onPress={() => {
                  setModalhiden(false);
                }}
              >
                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                  Cancle
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        visible={map}
        onRequestClose={() => setMap(false)}
        transparent={true}
      >
        <View style={styles.viewModel}>
          <View style={styles.viewModelContent}>
            <Map location={address} onPress={setAddress} />
            {address && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 10,
                  padding: 10,
                  backgroundColor: '#DDDDDD',
                  width: '60%',
                }}
              >
                <Text>Kinh độ: {address.longitude}</Text>
                <Line height={10} />
                <Text>Vĩ độ: {address.latitude}</Text>
                <Line height={10} />
                <Btn
                  text="Xác nhận địa chỉ"
                  textStyle={styles.txtBtn}
                  style={styles.btn}
                  onPress={() => {
                    setShipAddress(address);
                    setMap(false);
                  }}
                />
              </View>
            )}
            <Btn
              onPress={() => setMap(false)}
              style={styles.btnClose}
              text={<FontAwesome5 name="times" size={35} />}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  err: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
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
    height: '55%',
    width: '80%',
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
    // width: '85%',
    marginTop: 20,
    alignItems: 'center',
    marginRight: 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 10,
    borderColor: 'green',
    borderWidth: 0,
  },
  buttonCancle: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    backgroundColor: 'rgb(18, 136, 58)',
    borderRadius: 4,
  },
  txtBtn: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnClose: {
    padding: 10,
    borderRadius: 4,
    position: 'absolute',
    top: 5,
    left: 10,
  },
});
