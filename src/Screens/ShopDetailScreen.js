import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Searchbar from '../components/SearchBar';
import AvatarView from '../components/AvatarView';
import * as SecureStore from 'expo-secure-store';
import { getOneSalespersonData } from '../service/SalespersonService';
import BadgedIcon from '../components/BadgedIcon';
import { getCart } from '../service/CartService';
import {
  getUserVoucher,
  getVoucher,
  userSaveVoucher,
} from '../service/VoucherService';
import CardVoucher from '../components/CardVoucher';
const ShopDetailScreen = ({ navigation, route }) => {
  const shopId = route.params.shopId;
  const [data, setData] = useState(null);
  const [voucher, setVoucher] = useState(null);
  const [uservoucher, setUserVoucher] = useState(null);
  const [userusevoucher, setUserUseVoucher] = useState(null);
  const [numberCart, setNumberCart] = useState(0);
  const image = {
    uri: 'https://fuwa.com.vn/wp-content/uploads/2020/06/ALL-1024x661.jpg',
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, []);
  const getData = async () => {
    const profile = await SecureStore.getItemAsync('user');
    const user = await JSON.parse(profile).user;
    const response = await getOneSalespersonData(shopId);
    const voucher = await getVoucher(shopId);
    const userVou = await getUserVoucher(user._id);
    await setUserVoucher(
      userVou.data.voucher !== null
        ? userVou.data.voucher.list_voucher_id
        : null
    );
    await setUserUseVoucher(
      userVou.data.voucher !== null
        ? userVou.data.voucher.list_voucher_used
        : null
    );
    await setVoucher(voucher.data.voucher);
    const cart = await getCart(response.data.salesperson[0].name);
    if (cart) setNumberCart(cart.length);
    await setData(response.data.salesperson[0]);
  };
  const saveVoucher = async (voucherId) => {
    const profile = await SecureStore.getItemAsync('user');
    const user = await JSON.parse(profile).user;
    const data = {
      account_id: user._id,
      voucher_id: voucherId,
    };
    const res = await userSaveVoucher(data);
    getData();
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.overlayView}>
          <View style={styles.searchView}>
            <TouchableOpacity
              style={{
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('GreenMap')}
            >
              <Ionicons
                name="arrow-back"
                size={30}
                color={'#ffff'}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View
              style={{
                width: '70%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Searchbar
                textSearch={'Search'}
                style={styles.searchBar}
              ></Searchbar>
            </View>
          </View>

          <View style={styles.avatarView}>
            {data && (
              <AvatarView
                key={data.logo}
                image={data.logo}
                text={data.name}
                star={4}
                height={40}
                width={40}
                color="#ffff"
              ></AvatarView>
            )}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ShoppingCart', {
                  shop: data.name,
                  shopId: data.id,
                })
              }
              style={styles.shoppingCart}
            >
              <BadgedIcon name="shopping-cart" number={numberCart} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        {voucher && (
          <View>
            <Text style={styles.voucherText}>Voucher</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {voucher.map((e, index) => (
                <CardVoucher
                  key={index}
                  description={e.description}
                  expiry_date={e.expiry_date}
                  saved={
                    userusevoucher !== null &&
                    (uservoucher.indexOf(e.id) !== -1
                      ? true
                      : userusevoucher.indexOf(e.id) !== -1
                      ? true
                      : false)
                  }
                  type={
                    userusevoucher !== null &&
                    userusevoucher.indexOf(e.id) !== -1
                      ? true
                      : false
                  }
                  saveVoucher={() => saveVoucher(e.id)}
                />
              ))}
            </ScrollView>
          </View>
        )}

        <Text style={styles.productText}>Sản phẩm</Text>
        <View style={styles.productLists}>
          <View style={styles.productList}>
            {data &&
              data.list_product.map((e, index) => {
                return (
                  <View style={styles.productItemView} key={index}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ProductDetail', {
                          product: e,
                          shop: data,
                        })
                      }
                    >
                      <Image
                        style={styles.productStyle}
                        source={{
                          uri: e.list_image.length > 0 ? e.list_image[0] : '',
                        }}
                        resizeMode="cover"
                      />
                      <Text style={styles.nameProduct}>{e.name}</Text>
                      <Text style={styles.price}>{e.sale_price}vnđ/100ml</Text>
                      <Text style={styles.unit_price}>{e.unit_price}vnđ</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //
  },
  overlayView: {
    backgroundColor: '#rgba(179, 153, 255,0.4)',
  },
  voucherText: {
    color: '#E8833A',
    fontWeight: '700',
    fontSize: 17,
    paddingTop: 25,
    paddingLeft: 16,
  },
  image: {
    marginLeft: -16,
  },
  productText: {
    color: '#1B71B9',
    fontWeight: '700',
    fontSize: 17,
    paddingTop: 25,
    paddingLeft: 16,
  },
  productLists: {
    backgroundColor: '#F5F5F5',
  },
  productView: {
    flex: 1,
    flexDirection: 'row',
  },
  productItemView: {
    width: '47%',
    height: 280,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: 'white',
  },
  productStyle: {
    height: '70%',
    width: '100%',
  },
  nameProduct: {
    padding: 7,
  },
  price: {
    color: '#E8833A',
    fontWeight: '700',
    padding: 7,
    marginTop: -7,
    fontSize: 17,
  },

  searchView: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewItemStar: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  productList: {
    paddingLeft: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  avatarView: {
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listProduct: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  shoppingCart: {
    marginLeft: 'auto',
    marginRight: 20,
  },
  unit_price: {
    color: 'gray',
    fontSize: 13,
    marginLeft: 7,
    marginTop: -7,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});
