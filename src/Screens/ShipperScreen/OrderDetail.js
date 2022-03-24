import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'react-native';
import Line from '../../components/Line';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import * as SecureStore from 'expo-secure-store';
import Btn from '../../components/Button';
import {
  getOrder,
  getOrderById,
  updateOrder,
} from '../../service/OrderService';
import ModalShow from '../../components/ModalShow';
import NumberFormat from 'react-number-format';
const OrderDetail = ({ route, navigation }) => {
  const [modal, setModal] = useState(false);
  const [typeUpdate, setType] = useState(null);
  const [modalMess, setModalMess] = useState(false);
  const { orderId } = route.params;
  const [order, setOrder] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await getOrderById(orderId);
    setOrder(res.data.order);
  };
  const updateStatusOrder = async () => {
    try {
      if (typeUpdate == 'delete') {
        await updateOrder({ status: 'Đã hủy' }, orderId);
      } else {
        await updateOrder({ status: 'Giao hàng thành công' }, orderId);
      }
      setModal(false);
      navigation.navigate('OrderMap');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {order && (
          <View style={styles.viewOrder}>
            <View style={styles.viewHeaderOrder}>
              <View style={styles.shop}>
                <FontAwesome5 name="store" color="green" size={25} />
                <Text style={styles.txtNameShop}>
                  {order.salesperson_id.name}
                </Text>
              </View>
              <Text style={styles.txtStatus}>{order.status}</Text>
            </View>
            <Line height={10} />
            <Divider style={styles.divider} />
            {order.list_order_id.map((p, index2) => {
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
                      <Text numberOfLines={1} style={{ textAlign: 'right' }}>
                        {product.name}
                      </Text>
                      <Text>x{p.quantity}</Text>
                      <Text style={styles.txtPrice}>
                        <NumberFormat
                          value={
                            product.sale_price == 0
                              ? product.unit_price
                              : product.sale_price
                          }
                          renderText={(text) => <Text>{text}</Text>}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'đ'}
                        />
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.txtPrice,
                      { marginLeft: 'auto', marginTop: 10, color: 'red' },
                    ]}
                  >
                    <NumberFormat
                      value={
                        product.sale_price == 0
                          ? product.unit_price * p.quantity
                          : product.sale_price * p.quantity
                      }
                      renderText={(text) => <Text>{text}</Text>}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'đ'}
                    />
                  </Text>
                  <Divider style={styles.divider} />
                </View>
              );
            })}
            <View>
              <View style={styles.orderMoney}>
                <Text>Ngày đặt hàng</Text>
                <Text>
                  {new Date(order.date_created).toLocaleDateString('en-US')}
                </Text>
              </View>
            </View>
            <Line height={5} />
            <View>
              <View style={styles.orderMoney}>
                <Text>Ngày dự kiến đổ đầy</Text>
                <Text>{order.date_refill}</Text>
              </View>
            </View>
            <Line height={20} />
            {order.voucher_id && (
              <View>
                <View style={styles.orderMoney}>
                  <Text>Mã giảm giá</Text>
                  <Text>Sử dụng(-{order.voucher_id.discount})</Text>
                </View>
              </View>
            )}
            <View style={styles.orderMoney}>
              <Text>{order.list_order_id.length} sản phẩm</Text>
              <Text>
                Thành tiền:{' '}
                <NumberFormat
                  value={order.total_money}
                  renderText={(text) => (
                    <Text style={styles.txtPrice}>{text}</Text>
                  )}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'đ'}
                />
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.row}>
        <Btn
          onPress={() => {
            setType('delete');
            setModal(true);
            setModalMess(
              <Text style={styles.warning}>Xác nhận hủy đơn hàng</Text>
            );
          }}
          text="Hủy đơn hàng"
          textStyle={styles.txtDelete}
          style={styles.btnDelete}
        />
        <Btn
          onPress={() => {
            setType('update');
            setModal(true);
            setModalMess(
              <Text style={styles.notifi}>Xác nhận đã giao đơn hàng</Text>
            );
          }}
          text="Giao hàng thành công"
          textStyle={styles.txtBtn}
          style={styles.btn}
        />
      </View>
      <ModalShow
        modalHiden={modal}
        canclePress={() => {
          setModal(false);
        }}
        hideModal={() => {
          setModal(false);
        }}
        okPress={updateStatusOrder}
        btnCf={true}
      >
        <Text style={styles.successText}>{modalMess}</Text>
        <Text style={styles.txtOrder}>{orderId}</Text>
      </ModalShow>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    width: '48%',
    justifyContent: 'center',
    borderRadius: 5,
  },
  txtBtn: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  btnDelete: {
    padding: 12,
    width: '48%',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#DDDDDD',
  },
  txtDelete: {
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-between',
  },
  warning: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  notifi: {
    color: 'green',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
