import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'react-native';
import Line from '../components/Line';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import * as SecureStore from 'expo-secure-store';
import Btn from '../components/Button';
import { getOrder } from '../service/OrderService';
const OrderSuccess = ({ route, navigation }) => {
  const [order, setOrder] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const profile = await SecureStore.getItemAsync('user');
    const user = await JSON.parse(profile).user;
    const res = await getOrder(user._id, 'Đã giao hàng');
    setOrder(res.data.listOrder);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {order && !order.length && (
          <Text style={{ textAlign: 'center' }}>Không có đơn hàng nào</Text>
        )}
        {order &&
          order.map((e, index) => {
            const {
              list_order_id,
              date_created,
              total_money,
              salesperson_id,
              date_refill,
            } = e;
            return (
              <View style={styles.viewOrder} key={index}>
                <View style={styles.viewHeaderOrder}>
                  <View style={styles.shop}>
                    <FontAwesome5 name="store" color="green" size={25} />
                    <Text style={styles.txtNameShop}>
                      {salesperson_id.name}
                    </Text>
                  </View>
                  <Text style={styles.txtStatus}>Đã giao hàng</Text>
                </View>
                <Line height={10} />
                <Divider style={styles.divider} />
                {list_order_id.map((p, index2) => {
                  const { product } = p;
                  return (
                    <View key={index2}>
                      <View style={styles.orderProduct}>
                        <Image
                          style={styles.imageProduct}
                          resizeMode="cover"
                          source={{
                            uri: product.list_image[0],
                          }}
                        />
                        <View style={styles.viewNameProduct}>
                          <Text
                            numberOfLines={1}
                            style={{ textAlign: 'right' }}
                          >
                            {product.name}
                          </Text>
                          <Text>x{p.quantity}</Text>
                          <Text style={styles.txtPrice}>
                            đ
                            {product.sale_price == 0
                              ? product.unit_price
                              : product.sale_price}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.orderFollow}>
                        <Btn
                          onPress={() =>
                            navigation.navigate('RatingProduct', {
                              product: product,
                              order_id: p._id,
                            })
                          }
                          text={
                            p.evalute == 'Đã đánh giá'
                              ? 'Đã đánh giá'
                              : 'Đánh giá'
                          }
                          textStyle={styles.txtBtn}
                          style={styles.btn}
                          disabled={p.evalute ? true : false}
                        />
                      </View>
                      <Divider style={styles.divider} />
                    </View>
                  );
                })}
                <View>
                  <View style={styles.orderMoney}>
                    <Text>Ngày đặt hàng</Text>
                    <Text>
                      {new Date(date_created).toLocaleDateString('en-US')}
                    </Text>
                  </View>
                </View>
                <Line height={5} />
                <View>
                  <View style={styles.orderMoney}>
                    <Text>Ngày dự kiến đổ đầy</Text>
                    <Text>
                      {new Date(date_refill).toLocaleDateString('en-US')}
                    </Text>
                  </View>
                </View>
                <Line height={20} />
                {e.voucher_id && (
                  <View>
                    <View style={styles.orderMoney}>
                      <Text>Mã giảm giá</Text>
                      <Text>Sử dụng(-{e.voucher_id.discount})</Text>
                    </View>
                  </View>
                )}
                <View style={styles.orderMoney}>
                  <Text>{list_order_id.length} sản phẩm</Text>
                  <Text>
                    Thành tiền:{' '}
                    <Text style={styles.txtPrice}>đ{total_money}</Text>
                  </Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewOrder: {
    padding: 15,
    backgroundColor: 'white',
    marginTop: 10,
  },
  viewHeaderOrder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shop: {
    flexDirection: 'row',
  },
  txtNameShop: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  txtStatus: {
    color: 'green',
  },
  imageProduct: {
    width: '20%',
    height: 80,
  },
  orderProduct: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  viewNameProduct: {
    width: '78%',
    marginLeft: '2%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  txtPrice: {
    fontSize: 17,
    color: 'green',
  },
  divider: {
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
  },
  orderMoney: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    padding: 7,
    backgroundColor: 'green',
    width: 100,
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  txtBtn: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  orderFollow: {
    alignItems: 'flex-end',
  },
});
