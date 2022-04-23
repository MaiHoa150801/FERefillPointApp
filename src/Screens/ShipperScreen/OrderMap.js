import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {} from 'expo';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import { updateCurrent } from '../../service/ShipperMapService';
import { getShipperOrder } from '../../service/OrderService';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { getSalespersonData } from '../../service/SalespersonService';
import ModalShow from '../../components/ModalShow';
import Btn from '../../components/Button';
import MapViewDirections from 'react-native-maps-directions';
import Carousel from 'react-native-snap-carousel';
const GOOGLE_MAPS_APIKEY = 'AIzaSyD7ajralK0m1ME4tJKq9dptNG3Ol835gos';
import { TouchableOpacity } from 'react-native';
import Space from '../../components/Space';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import RowIcon from '../../components/RowIcon';
const OrderMap = ({ navigation }) => {
  let _map = {
    latitude: 19.039344,
    longitude: 110.197712,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };
  let _carousel = {};
  const [markers, setMarkers] = useState([]);
  const [direction, setDirection] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [orderSelected, setOrderSelected] = useState(null);
  const [shop, setShop] = useState([]);
  const [order, setOrder] = useState([]);
  const [initialPosition, setInitialPosition] = useState({
    latitude: 19.039344,
    longitude: 110.197712,
    latitudeDelta: 19.039344,
    longitudeDelta: 110.197712,
  });
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      requestLocationPermission();
      getOrder();
    });
    return unsubscribe;
  }, []);
  const getOrder = async () => {
    const response = await getSalespersonData();
    setShop(response.data.salespersons);
    const res = await getShipperOrder('Đang giao hàng');
    setOrder(res.data.listOrder);
  };

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    locateCurrentPosition();
  };

  const locateCurrentPosition = async () => {
    const position = await Location.getCurrentPositionAsync();
    let initialPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 19.039344,
      longitudeDelta: 110.197712,
    };
    _map.animateToRegion({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    setInitialPosition(initialPosition);
  };
  const shopClick = async (data) => {
    setModalData(data);
    setModal(true);
  };
  const updateLocation = async (e) => {
    const latitude = e.nativeEvent.coordinate.latitude;
    const longitude = e.nativeEvent.coordinate.longitude;
    try {
      const data = {
        latitude: latitude,
        longitude: longitude,
      };
      const res = await updateCurrent(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onCarouselItemChange = (index) => {
    let location = order[index].shipAddress;

    _map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.005,
    });

    markers[index].showCallout();
  };
  const renderCarouselItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image
        width={80}
        height={80}
        style={{ width: 80, height: 80 }}
        source={{
          uri: 'https://lh4.googleusercontent.com/proxy/lsTCw2VjeHy-iGWg0ltkQ7lfJWD6bfC0x8Q76xJF8nAOkHc1GL6Zmr2F17to0INGnSeopubJJ5QtTAxAQ43eUo5z_ms9XecbVdbRoZc',
        }}
      />
      <Text style={styles.successText}>Đơn hàng</Text>
      <Text style={styles.txtOrder}>{item.id}</Text>
      <View style={[styles.row, styles.mt10]}>
        <Btn
          text={
            <TouchableOpacity
              onPress={() => {
                setOrderSelected(item);
                setDirection(true);
              }}
              style={[styles.row, styles.buttonDirection]}
            >
              <FontAwesome name="mail-forward" size={15} color="#1a73e8" />
              <Text style={styles.txtDirection}>Lộ trình</Text>
            </TouchableOpacity>
          }
        />
        <Space width={20} />
        <Btn
          style={styles.buttonView}
          onPress={() => {
            setModal(false);
            navigation.navigate('OrderDetail', { orderId: item.id });
          }}
          text="Xem đơn hàng"
          textStyle={styles.txtBtnView}
        />
      </View>
    </View>
  );
  const onMarkerPressed = (location, index) => {
    _map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    });

    _carousel.snapToItem(index);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={(map) => (_map = map)}
        followsUserLocation={true}
        showsUserLocation={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        showsMyLocationButton={true}
        onUserLocationChange={(e) => {
          updateLocation(e);
        }}
        showsCompass={true}
        showsPointsOfInterest={true}
        style={styles.map}
        initialRegion={initialPosition}
      >
        {direction == true && orderSelected != null && (
          <MapViewDirections
            origin={orderSelected.shipAddress}
            destination={{
              latitude: parseFloat(orderSelected.salesperson_id.latitude),
              longitude: parseFloat(orderSelected.salesperson_id.longitude),
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="green"
          />
        )}
        {shop &&
          shop.map((marker, index) => (
            <Marker
              draggable
              key={marker.name}
              ref={(ref) => (markers[index] = ref)}
              image={require('../../../assets/caydoday.png')}
              onPress={() => shopClick(marker)}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            >
              <Callout>
                <Text>{marker.name}</Text>
              </Callout>
            </Marker>
          ))}
        {order &&
          order.map((marker, index) => (
            <Marker
              draggable
              key={marker.id}
              ref={(ref) => (markers[index] = ref)}
              onPress={() => onMarkerPressed(marker.shipAddress, index)}
              image={require('../../../assets/order.png')}
              coordinate={{
                latitude: marker.shipAddress.latitude,
                longitude: marker.shipAddress.longitude,
              }}
            >
              <Callout>
                <Text>{marker.id}</Text>
              </Callout>
            </Marker>
          ))}
      </MapView>
      {order && (
        <Carousel
          ref={(c) => {
            _carousel = c;
          }}
          data={order}
          containerCustomStyle={styles.carousel}
          renderItem={renderCarouselItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={300}
          removeClippedSubviews={false}
          onSnapToItem={(index) => onCarouselItemChange(index)}
        />
      )}

      {direction == true && (
        <Btn
          style={styles.buttonViewBack}
          text={
            <TouchableOpacity
              onPress={() => {
                setDirection(false);
                setModalData(null);
              }}
            >
              <FontAwesome5 name="arrow-left" size={30} />
            </TouchableOpacity>
          }
          textStyle={styles.txtBtnView}
        />
      )}
      <ModalShow
        modalHiden={modal}
        canclePress={() => {
          setModalData(null);
          setModal(false);
        }}
        hideModal={() => {
          setModalData(null);
          setModal(false);
        }}
        okPress={() => {}}
      >
        {modalData && (
          <View>
            <Text style={styles.successText}>{modalData.name}</Text>
            <RowIcon
              style={{ marginTop: 5 }}
              icon="phone"
              text={modalData.phone_number}
            />
            <RowIcon
              style={{ marginTop: 5 }}
              icon="map-marker"
              text={modalData.address}
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
          </View>
        )}
      </ModalShow>
    </View>
  );
};

export default OrderMap;
const styles = StyleSheet.create({
  buttonViewBack: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    top: 10,
    borderRadius: 10,
    position: 'absolute',
  },
  txtOrder: {
    fontSize: 17,
    textAlign: 'center',
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    marginTop: 30,
    // ...StyleSheet.absoluteFillObject,
  },
  map: {
    width: '100%',
    height: '100%',
    // ...StyleSheet.absoluteFillObject,
    // flex: 1,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 48,
  },
  cardContainer: {
    backgroundColor: 'white',
    height: 200,
    width: 300,
    padding: 10,
    borderRadius: 24,
    borderColor: 'green',
    borderWidth: 2,
    alignItems: 'center',
  },
  cardTitle: {
    color: 'green',
    fontSize: 22,
    alignSelf: 'center',
  },
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
});
