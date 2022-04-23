import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {} from 'expo';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
const GOOGLE_MAPS_APIKEY = 'AIzaSyD7ajralK0m1ME4tJKq9dptNG3Ol835gos';
import { io } from 'socket.io-client';
import { getCurrent } from '../service/ShipperMapService';

export default class OrderFollow extends Component {
  order = this.props.route.params.order;

  static navigationOptions = {
    title: 'San Francisco',
  };

  state = {
    markers: [],
    shipperLocation: {
      latitude: 16.052625,
      longitude: 108.242156,
    },
    orderLocation: { latitude: 16.0621755, longitude: 108.2405321 },
    destination: null,
  };
  socket = {
    current: null,
  };

  componentDidMount() {
    this.requestLocationPermission();
    this.getData();
  }
  getData = async () => {
    this.setState({
      orderLocation: {
        latitude: parseFloat(this.order.shipAddress.latitude),
        longitude: parseFloat(this.order.shipAddress.longitude),
      },
    });
    this.setState({
      destination: {
        latitude: parseFloat(this.order.salesperson_id.latitude),
        longitude: parseFloat(this.order.salesperson_id.longitude),
      },
    });
    const data = await getCurrent();
    this.setState({
      shipperLocation: data.data.shipperMap,
    });
    this.socket.current = io('http://192.168.32.160:8080');
    this.socket.current.on('connnection', () => {
      console.log('connected to server');
    });
    this.socket.current.on(`data/${this.order.shipper_id}`, async (data) => {
      try {
        this._map.animateToRegion({
          latitude: data.latitude,
          longitude: data.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      } catch (error) {}

      await this.setState({
        shipperLocation: {
          latitude: data.latitude,
          longitude: data.longitude,
        },
      });
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
      latitudeDelta: 19.039344,
      longitudeDelta: 110.197712,
    };
    this._map.animateToRegion({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    this.setState({ initialPosition });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={(map) => (this._map = map)}
          followsUserLocation={true}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          showsMyLocationButton={true}
          onUserLocationChange={(e) => {
            this.setState({
              currentLocation: {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              },
            });
          }}
          showsCompass={true}
          showsPointsOfInterest={true}
          style={styles.map}
          initialRegion={this.state.initialPosition}
        >
          {this.state.destination !== null && (
            <MapViewDirections
              origin={this.state.orderLocation}
              destination={this.state.destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="green"
            />
          )}
          <Marker
            draggables
            coordinate={this.state.destination}
            image={require('../../assets/caydoday.png')}
          ></Marker>
          <Marker
            draggables
            coordinate={this.state.orderLocation}
            image={require('../../assets/location.png')}
          ></Marker>
          <Marker
            draggables
            tracksViewChanges={true}
            coordinate={{
              latitude: parseFloat(this.state.shipperLocation.latitude),
              longitude: parseFloat(this.state.shipperLocation.longitude),
            }}
            image={require('../../assets/shipper.png')}
          ></Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 48,
  },
  cardContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 200,
    width: 300,
    padding: 24,
    borderRadius: 24,
  },
  buttonView: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    top: 15,
    borderRadius: 10,
    position: 'absolute',
  },
  txtBtnView: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardImage: {
    height: 120,
    width: 300,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardTitle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center',
  },
});
