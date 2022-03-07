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

const ProductDetailScreen = () => {
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
            {images.map((image, index) => (
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
            {images.map((i, k) => (
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
          <Text style={styles.nameText}>
            Refill nước giặt hữu cơ Fuwa3e oragnic sinh học giặc quần áo an toàn
          </Text>
          <Text style={styles.price}>
            <Text style={styles.money}>10.000 vnd</Text>/100ml
          </Text>
          <View style={styles.starView}>{Rating(4)}</View>
        </View>
      </View>
      <Line height={10} color={'#F5F5F5'} />
      <View style={styles.shopView}>
        <AvatarView
          star={4}
          height={30}
          width={30}
          color="#293845"
        ></AvatarView>
        {/* <Btn
          text="Lưu"
          style={styles.saveBtn}
          textStyle={styles.saveText}
        ></Btn> */}
      </View>
      <Line height={10} color={'#F5F5F5'} />
      <View style={styles.detailView}>
        <Text style={styles.detailText}>Chi tiết sản phẩm</Text>
        <Line height={2} color={'#F5F5F5'} />
        <View style={styles.brandView}>
          <View style={styles.typeView}>
            <Text style={styles.brandText}>Thương hiệu</Text>
          </View>

          <Text style={styles.brandName}>Fuwa3e</Text>
        </View>
        <View style={styles.brandView}>
          <View style={styles.typeView}>
            <Text style={styles.brandText}>Hình thức</Text>
          </View>

          <Text style={styles.brandName}>Chất lỏng</Text>
        </View>

        <Line height={2} color={'#F5F5F5'} />
        <Text style={styles.infoText}>
          * Thông tin Nước giặt hữu cơ Fuwa3e organic sinh học giặt quần áo, an
          toàn cho bé {'\n'}
          {'\n'}Thành phần: {'\n'}- 90% là chế phẩm Enzyme sinh học được ngâm ủ
          và lên men từ vỏ dứa, cam, chanh {'\n'}- 10% là các chất hữu cơ tạo
          bọt lành tính từ thực vật
        </Text>
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
});
