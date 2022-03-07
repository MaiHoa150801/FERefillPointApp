import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import ModalBottom from './ModalBottom';
import { Rating } from 'react-native-ratings';
import RowIcon from './RowIcon';
import Space from './Space';
import Btn from './Button';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { BounceOutLeft } from 'react-native-reanimated';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import Slide from './SlideImage';
const { width } = Dimensions.get('window');
const dataSource = [
  'http://xacamhung.hatinh.gov.vn/uploads/news/2020_07/anh-moi-truong.png',
  'http://xacamhung.hatinh.gov.vn/uploads/news/2020_07/anh-moi-truong.png',
  'http://xacamhung.hatinh.gov.vn/uploads/news/2020_07/anh-moi-truong.png',
  'http://xacamhung.hatinh.gov.vn/uploads/news/2020_07/anh-moi-truong.png',
];
const ModalMapShop = ({ openModal, closeModal, nameShop, navigation }) => {
  return (
    <ModalBottom
      modalVisible={openModal}
      setModalVisible={() => closeModal()}
      height="50%"
    >
      <Text style={styles.name}>{nameShop}</Text>
      <View style={styles.row}>
        <Text style={styles.star}>5.0</Text>
        <Rating
          type="custom"
          ratingCount={5}
          startingValue={5}
          imageSize={20}
          readonly={true}
          ratingColor="#FFFF00"
          tintColor="white"
        />
      </View>
      <RowIcon
        style={{ marginTop: 5 }}
        icon="map-marker"
        text="329 Đình Nghệ, Sơn Trà, Đà Nẵng"
      />
      <View style={[styles.row, { marginTop: 10 }]}>
        <View style={styles.row}>
          <Text style={styles.txtOpen}>Giờ mở cửa: </Text>
          <Text style={styles.txtTime}>9:00</Text>
        </View>
        <Space width={20} />
        <View style={styles.row}>
          <Text style={styles.txtClose}>Giờ đóng cửa: </Text>
          <Text style={styles.txtTime}>18:00</Text>
        </View>
      </View>
      <View style={[styles.row, styles.mt10]}>
        <Btn
          text={
            <TouchableOpacity style={[styles.row, styles.buttonDirection]}>
              <FontAwesome name="mail-forward" size={15} color="#1a73e8" />
              <Text style={styles.txtDirection}>Đường đi</Text>
            </TouchableOpacity>
          }
        />
        <Space width={20} />
        <Btn
          style={styles.buttonView}
          onPress={() => navigation.navigate('ShopDetail')}
          text="View shop"
          textStyle={styles.txtBtnView}
        />
      </View>
      <View style={styles.imagesShop}>
        <Slide images={dataSource} auto={false} />
      </View>
    </ModalBottom>
  );
};

export default ModalMapShop;

const styles = StyleSheet.create({
  name: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 15,
    marginRight: 5,
  },
  txtClose: {
    color: 'red',
  },
  txtOpen: {
    color: 'black',
  },
  txtTime: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttonDirection: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonView: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#1a73e8',
    borderRadius: 10,
  },
  txtBtnView: {
    color: 'white',
    fontWeight: 'bold',
  },
  txtDirection: {
    color: '#1a73e8',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  mt10: {
    marginTop: 10,
  },
  imagesShop: {
    marginTop: 20,
  },
});
