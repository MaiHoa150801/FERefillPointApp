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
const Order = ({ route, navigation }) => {
  const { status } = route.params;
  const [order, setOrder] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const profile = await SecureStore.getItemAsync('user');
    const user = await JSON.parse(profile).user;
    const res = await getOrder(user._id, status);
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
                  <Text style={styles.txtStatus}>{status}</Text>
                </View>
                <Line height={10} />
                <Divider style={styles.divider} />
                {list_order_id.map((p, index2) => {
                  const { product } = p;
                  return (
                    <View>
                      <View style={styles.orderProduct} key={index2}>
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
                <Divider style={styles.divider} />
                <View style={styles.orderFollow}>
                  <Btn
                    onPress={() =>
                      navigation.navigate('OrderFollowScreen', { order: e })
                    }
                    text="Theo dõi đơn hàng"
                    textStyle={styles.txtBtn}
                    style={styles.btn}
                  />
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Order;

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
    padding: 12,
    backgroundColor: 'green',
    width: 150,
    justifyContent: 'center',
    borderRadius: 5,
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
