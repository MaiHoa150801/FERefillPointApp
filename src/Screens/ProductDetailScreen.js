import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import Line from '../components/Line';
import Rating from '../components/Rating';
import AvatarView from '../components/AvatarView';
import Btn from '../components/Button';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const width = Dimensions.get('window').width;
  const height = (width / 100) * 60;
  const images = [
    'https://images.pexels.com/photos/10543007/pexels-photo-10543007.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    'https://images.pexels.com/photos/7013458/pexels-photo-7013458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/10323144/pexels-photo-10323144.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/5421792/pexels-photo-5421792.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  ];

  const [active, setActive] = useState(0);

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  return (
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
      </View>
    </ScrollView>
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
  nameProduct: {
    padding: 10,
  },
  price: {
    padding: 10,
    paddingBottom: 7,
    fontSize: 17,
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
  },
  shopView: {
    flexDirection: 'row',
  },
  saveText: {
    // padding: 5,
    // paddingHorizontal: 10,
    color: '#E8833A',
    fontWeight: '700',
    borderRadius: 3,
  },
  saveBtn: {
    borderColor: '#C3CFD9',
    borderWidth: 1,
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
});
