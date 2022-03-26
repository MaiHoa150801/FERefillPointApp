import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {} from 'expo';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import { updateCurrent } from '../../service/ShipperMapService';
import { getOrderByStatus, updateOrder } from '../../service/OrderService';
import { getSalespersonData } from '../../service/SalespersonService';
import ModalShow from '../../components/ModalShow';
import { io } from 'socket.io-client';
import Toast, { DURATION } from 'react-native-easy-toast';
export default class Map extends Component {
  toast = {};
  state = {
    markers: [],
    modal: false,
    modalMessage: false,
    messageModal: null,
    modalData: null,
    order: [],
    shop: [],
  };
  socket = {
    current: null,
  };
  componentDidMount() {
    this.requestLocationPermission();
    this.getOrder();
  }
  showToast = (message) => {};
  getOrder = async () => {
    this.socket.current = io('http://refillpointapp.cleverapps.io');
    this.socket.current.on('connnection', () => {
      console.log('connected to server');
    });
    this.socket.current.on(`orderShip`, async (data) => {
      this.setState({
        order: data.orders,
      });
      if (data.message != null) {
        this.toast.show(
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {data.message}
            </Text>
          </View>
        );
      }
    });
    const response = await getSalespersonData();
    this.setState({
      shop: response.data.salespersons,
    });
    const res = await getOrderByStatus('Đã xác nhận');
    this.setState({
      order: res.data.Orders,
    });
  };

  requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    this.locateCurrentPosition();
  };

  locateCurrentPosition = async () => {
    const position = await Location.getCurrentPositionAsync();
    let initialPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    this._map.animateToRegion({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    this.setState({ initialPosition });
  };
  orderClick = async (data) => {
    this.setState({ modalData: data });
    this.setState({ modal: true });
  };
  updateLocation = async (e) => {
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
  shipOrder = async () => {
    const profile = await SecureStore.getItemAsync('user');
    const user = await JSON.parse(profile).user;
    const data = {
      shipper_id: user._id,
      status: 'Đang giao hàng',
    };
    try {
      const res = await updateOrder(data, this.state.modalData.id);
      this.setState({ modal: false });
      this.setState({ modalMessage: true });
      this.setState({
        messageModal: 'Bạn đã nhận giao đơn hàng ' + this.state.modalData.id,
      });
    } catch (err) {
      this.setState({ modalMessage: true });
      this.setState({ messageModal: 'Đơn hàng này đã được nhận giao!' });
    }
  };
  render() {
    return (
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={(map) => (this._map = map)}
          followsUserLocation={true}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          showsMyLocationButton={true}
          onUserLocationChange={(e) => {
            this.updateLocation(e);
          }}
          showsCompass={true}
          showsPointsOfInterest={true}
          style={styles.map}
          initialRegion={this.state.initialPosition}
        >
          {this.state.shop &&
            this.state.shop.map((marker, index) => (
              <Marker
                draggable
                key={marker.name}
                ref={(ref) => (this.state.markers[index] = ref)}
                onPress={() => this.shopMapClick(marker)}
                image={require('../../../assets/caydoday.png')}
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
          {this.state.order &&
            this.state.order.map((marker, index) => (
              <Marker
                draggable
                key={marker.id}
                ref={(ref) => (this.state.markers[index] = ref)}
                onPress={() => this.orderClick(marker)}
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
        <ModalShow
          modalHiden={this.state.modal}
          canclePress={() => {
            this.setState({ modal: false });
            this.setState({ modalData: null });
          }}
          hideModal={() => this.setState({ modal: false })}
          okPress={this.shipOrder}
          btnCf={true}
        >
          <Text style={styles.successText}>Xác nhận giao đơn hàng này</Text>
          <Text style={styles.txtOrder}>ID đơn hàng:</Text>
          <Text style={styles.txtOrder}>
            {this.state.modalData && this.state.modalData.id}
          </Text>
        </ModalShow>
        <ModalShow
          modalHiden={this.state.modalMessage}
          canclePress={() => {
            this.setState({ modalMessage: false });
          }}
          hideModal={() => this.setState({ modalMessage: false })}
          okPress={() => this.setState({ modalMessage: false })}
        >
          <Text style={styles.successText}>{this.state.messageModal}</Text>
        </ModalShow>
        <Toast
          ref={(toast) => (this.toast = toast)}
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderColor: 'green',
            borderWidth: 2,
          }}
          position="top"
          positionValue={50}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: 'red' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txtOrder: {
    fontSize: 17,
    textAlign: 'center',
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
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
});
