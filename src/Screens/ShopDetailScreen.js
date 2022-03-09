import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Btn from '../components/Button';

import Searchbar from '../components/SearchBar';
import AvatarView from '../components/AvatarView';
import ProductCard from '../components/cards/ProductCard';
import Rating from '../components/Rating';
import { getOneSalespersonData } from '../service/SalespersonService';
const ShopDetailScreen = ({ navigation, route }) => {
  const shopId = route.params.shopId;
  console.log(shopId);
  const [data, setData] = useState(null);
  const image = {
    uri: 'https://fuwa.com.vn/wp-content/uploads/2020/06/ALL-1024x661.jpg',
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await getOneSalespersonData(shopId);
    setData(response.data.salesperson[0]);
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.overlayView}>
          <View style={styles.searchView}>
            <TouchableOpacity onPress={() => navigation.navigate('GreenMap')}>
              <Ionicons
                name="arrow-back"
                size={23}
                color={'#ffff'}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Searchbar
              textSearch={'Search'}
              style={styles.searchBar}
            ></Searchbar>
          </View>
          {/* {star ? (
          Rating(star)
        ) : (
          <View style={styles.locationView}>
            <Ionicons name="location-outline" size={17} color={"#0D0A03"} />
            <Text style={styles.locationText}>{address}</Text>
          </View>
        )} */}
          <View style={styles.avatarView}>
            {data && (
              <AvatarView
                imageShop={data.logo}
                nameShop={data.name}
                star={4}
                height={40}
                width={40}
                color="#ffff"
              ></AvatarView>
            )}
          </View>
        </View>
      </ImageBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.voucherText}>Voucher</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.voucherView}>
            <View style={styles.voucherViewLeft}>
              <Text style={styles.voucherName}>Giảm 15k</Text>
              <Text style={styles.voucherLimited}>Đơn tổi thiểu 199k</Text>
              <Text style={styles.voucherExpiry}>HSD: 31.3.2022</Text>
            </View>
            <View style={styles.voucherViewRight}>
              <Btn
                text="Lưu"
                style={styles.saveBtn}
                textStyle={styles.saveText}
              ></Btn>
            </View>
          </View>
          <View style={styles.voucherView}>
            <View style={styles.voucherViewLeft}>
              <Text style={styles.voucherName}>Giảm 15k</Text>
              <Text style={styles.voucherLimited}>Đơn tổi thiểu 199k</Text>
              <Text style={styles.voucherExpiry}>HSD: 31.3.2022</Text>
            </View>
            <View style={styles.voucherViewRight}>
              <Btn
                text="Lưu"
                style={styles.saveBtn}
                textStyle={styles.saveText}
              ></Btn>
            </View>
          </View>
        </ScrollView>
        <Text style={styles.productText}>Sản phẩm</Text>
        <View style={styles.productLists}>
          <View style={styles.productList}>
            {data &&
              data.list_product.map((e) => {
                return (
                  <View style={styles.productItemView}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ProductDetail', { product: e })
                      }
                    >
                      <Image
                        style={styles.productStyle}
                        source={{
                          uri: e.list_image[1],
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
  icon: {
    marginLeft: 32,
    paddingTop: 16,
  },
  searchBar: {
    marginTop: -27,
    paddingRight: 16,
    paddingLeft: 66,
  },
  voucherView: {
    flexDirection: 'row',
    paddingLeft: 16,
  },
  voucherViewLeft: {
    padding: 10,
    borderColor: '#E8833A',
    borderWidth: 0.7,
    backgroundColor: '#fff2e6',
  },
  voucherViewRight: {
    borderColor: '#E8833A',
    borderBottomWidth: 0.7,
    borderTopWidth: 0.7,
    borderRightWidth: 0.7,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#fff2e6',
  },
  saveBtn: {
    borderRadius: 10,
  },
  saveText: {
    backgroundColor: '#E8833A',
    padding: 5,
    paddingHorizontal: 20,
    color: 'white',
    fontWeight: '700',
    borderRadius: 3,
  },
  voucherName: {
    color: '#E8833A',
    fontWeight: '700',
    fontSize: 16,
  },
  voucherLimited: {
    color: '#E8833A',
    fontWeight: '700',
  },
  voucherExpiry: {
    color: '#6F7D89',
    fontWeight: '600',
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
    flexDirection: 'column',
    justifyContent: 'center',
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
