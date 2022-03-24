import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import ImageView from 'react-native-image-viewing';
import Line from '../components/Line';
import Rating from '../components/Rating';
import AvatarView from '../components/AvatarView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addToCart } from '../service/CartService';
import DatePicker from 'react-native-datepicker';
import { Modal } from 'react-native';
import { createOrder } from '../service/OrderService';
import Btn from '../components/Button';
import Map from '../components/Map';
import { GetRatingProductAsyn } from '../service/RatingProductService';

const ProductDetailScreen = ({ route, navigation }) => {
  const [address, setAddress] = useState(null);
  const [rating, setRating] = useState(null);
  const [shipAddress, setShipAddress] = useState(null);
  const [map, setMap] = useState(false);
  const [err, setErr] = useState(null);
  const [modalhiden, setModalhiden] = useState(false);
  const [date, setDate] = useState('');
  const { product, shop } = route.params;
  const width = Dimensions.get('window').width;
  const height = (width / 100) * 60;
  const [active, setActive] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getRating();
    });
    return unsubscribe;
  }, []);
  const getRating = async () => {
    const res = await GetRatingProductAsyn(product._id);
    setRating(res.data.ratingProduct);
  };
  const openSettingsModal = (img, index) => {
    let images = img.map((item) => ({ uri: item }));
    setModalImage(images);
    setModalVisible(!modalVisible);
    setImgIndex(index);
  };
  const img = [
    'https://o.vdoc.vn/data/image/2021/02/22/ta-canh-san-truong-gio-ra-choi-sieu-hay-1.jpg',
    'https://www.collinsdictionary.com/images/full/school_309241295.jpg',
    'https://www.berkeleyside.org/wp-content/uploads/2020/01/BAM-berkeley-student-classroom-class-elementary-busd-school.jpg',
    'https://cdn.tgdd.vn/hoi-dap/1380273/back-to-school-la-gi-lich-back-to-school-cua-cac-nuoc-tren-7-800x450.jpg',
  ];
  const addCart = async (data) => {
    await addToCart(shop.name, data, quantity);
    ToastAndroid.show('Thêm vào giỏ hàng thành công!', ToastAndroid.CENTER);
  };
  const checkOut = async (data) => {
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
    orderDetail.push({
      product: data._id,
      quantity: quantity,
    });
    const order = {
      account_id: user._id,
      list_order: orderDetail,
      total_money: data.sale_price
        ? data.sale_price * quantity
        : data.unit_price * quantity,
      salesperson_id: shop.id,
      date_refill: date,
      shipAddress,
    };
    try {
      const response = await createOrder(order);
      navigation.navigate('ThankYouOrder');
    } catch (err) {
      console.log(err);
    }
  };
  const [quantity, setQuantity] = useState(1);
  const minus = () => {
    if (quantity >= 1) setQuantity(quantity - 1);
  };
  const plus = () => {
    setQuantity(quantity + 1);
  };
  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  return (
    <View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <ScrollView
              horizontal={true}
              onScroll={change}
              pagingEnabled
              showsVerticalScrollIndicator={false}
            >
              {product.list_image.map((image, index) => (
                <Image
                  key={index}
                  style={{ width, height, resizeMode: 'cover' }}
                  source={{
                    uri: image,
                  }}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
            <View style={styles.pagination}>
              {product.list_image.map((i, k) => (
                <Text
                  key={k}
                  style={
                    k == active ? styles.pagingActiveText : styles.pagingText
                  }
                >
                  ⬤
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.nameProduct}>
            <Text style={styles.nameText}>{product.name}</Text>
            <Text style={styles.price}>
              <Text style={styles.money}>{product.sale_price}vnđ</Text>/100ml
            </Text>
            <Text style={styles.unit_price}>{product.unit_price}vnđ</Text>
          </View>
        </View>
        <Line height={10} color={'#F5F5F5'} />
        <AvatarView
          image={shop.logo}
          text={shop.name}
          star={4}
          height={40}
          width={40}
          color="rgb(18, 136, 58)"
        ></AvatarView>
        <Line height={10} color={'#F5F5F5'} />
        <View style={styles.detailView}>
          <Text style={styles.detailText}>Chi tiết sản phẩm</Text>
          <Line height={2} color={'#F5F5F5'} />
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <Line height={10} color={'#F5F5F5'} />
        <View style={styles.reviewView}>
          <Text style={styles.detailText}>ĐÁNH GIÁ SẢN PHẨM</Text>
          <View style={styles.starView}>{Rating(4)}</View>
          <Line height={2} color={'#F5F5F5'} />
          {rating &&
            rating.map((e) => {
              const { account_id } = e;
              return (
                <View key={e.id}>
                  <AvatarView
                    image={
                      account_id.avatar.url !== ''
                        ? account_id.avatar.url
                        : null
                    }
                    star={e.star}
                    height={30}
                    width={30}
                    text={account_id.name}
                    color="#293845"
                  ></AvatarView>
                  <Text style={styles.reviewText}>{e.comment}</Text>
                  <View style={styles.imgView}>
                    {e.list_image.length > 0 &&
                      e.list_image.map((items, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={styles.imgItem}
                            onPress={() => {
                              openSettingsModal(e.list_image, index);
                            }}
                          >
                            <Image
                              style={styles.imgStyle}
                              source={{
                                uri: `${items}`,
                              }}
                            />
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                  <ImageView
                    images={modalImage}
                    imageIndex={imgIndex}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                  />
                </View>
              );
            })}
        </View>
      </ScrollView>
      <View style={styles.bottomView}>
        <View style={styles.countView}>
          <TouchableOpacity
            style={styles.borderView}
            onPress={() => minus(quantity)}
          >
            {quantity >= 1 ? (
              <MaterialCommunityIcons name="minus" style={styles.iconStyle} />
            ) : (
              <MaterialCommunityIcons name="minus" style={styles.actionIcon} />
            )}
          </TouchableOpacity>
          <Text style={{ fontWeight: '650', fontSize: 16 }}>{quantity}</Text>
          <TouchableOpacity
            style={styles.borderView}
            onPress={() => {
              plus(quantity);
            }}
          >
            <MaterialCommunityIcons name="plus" style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            addCart(product);
          }}
        >
          <FontAwesome5 size={30} color={'#E8833A'} name="cart-plus" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.refillBtn}
          onPress={() => {
            setModalhiden(true);
          }}
        >
          <Text style={styles.refillText}>Đăng kí refill</Text>
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
              <Line height={10} />
              <TouchableOpacity onPress={() => setMap(true)}>
                <Text style={{ color: 'green', fontWeight: 'bold' }}>
                  Chọn địa điểm giao hàng
                </Text>
              </TouchableOpacity>
              {shipAddress && <Text style={{ color: 'green' }}>Đã chọn</Text>}
              <Line height={10} />
              {err != null && <Text style={styles.err}>{err}</Text>}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.buttonOK}
                onPress={() => {
                  checkOut(product);
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

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  pagingText: { color: '#888', margin: 3 },
  pagingActiveText: { color: '#fff', margin: 3 },
  price: {
    padding: 10,
    paddingBottom: 7,
    fontSize: 20,
  },
  nameText: {
    padding: 10,
    fontSize: 17,
    color: 'rgb(18, 136, 58)',
    fontWeight: 'bold',
  },
  money: { color: '#E8833A', fontWeight: '700' },
  detailText: {
    fontWeight: '700',
    fontSize: 17,
    padding: 10,
  },
  brandText: {
    padding: 10,
  },
  typeText: {
    padding: 10,
  },
  brandView: {
    flexDirection: 'row',
  },
  brandName: {
    padding: 10,
  },
  typeView: {
    width: 100,
  },
  infoText: {
    padding: 10,
    lineHeight: 18,
  },
  starView: {
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 10,
  },
  shopView: {
    flexDirection: 'row',
  },
  saveText: {
    color: '#E8833A',
    fontWeight: '700',
    borderRadius: 3,
  },
  saveBtn: {
    borderColor: '#C3CFD9',
    borderWidth: 1,
  },
  reviewText: { paddingLeft: 40 },
  imgView: {
    flexDirection: 'row',
    paddingLeft: 32,
  },
  imgItem: {
    paddingLeft: 8,
  },
  imgStyle: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  bottomView: {
    marginTop: 'auto',
    height: '9%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  countView: {
    width: 95,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  borderView: {
    width: 23,
    height: 23,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'green',
  },
  actionIcon: { fontSize: 16, fontWeight: '600', color: '#5e6977' },
  refillBtn: {
    width: '30%',
    height: '70%',
    backgroundColor: 'green',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refillText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#ffff',
  },
  unit_price: {
    color: 'gray',
    fontSize: 13,
    marginLeft: 10,
    marginTop: -7,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  description: {
    width: '94%',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 15,
  },
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
