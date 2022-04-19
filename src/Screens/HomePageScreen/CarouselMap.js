import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Alert, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {} from 'expo';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import ModalMapShop from '../../components/ModalMapShop';
import { getSalespersonData } from '../../service/SalespersonService';
import MapViewDirections from 'react-native-maps-directions';
import Btn from '../../components/Button';
import { TouchableOpacity } from 'react-native';
const GOOGLE_MAPS_APIKEY = 'AIzaSyD7ajralK0m1ME4tJKq9dptNG3Ol835gos';
import { io } from 'socket.io-client';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { getCurrent } from '../../service/ShipperMapService';

export default class CarouselMap extends Component {
  static navigationOptions = {
    title: 'San Francisco',
  };

  state = {
    markers: [],
    openModal: false,
    modalData: null,
    shop: [],
    currentLocation: { latitude: 16.0621755, longitude: 108.2405321 },
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
    const response = await getSalespersonData();
    this.setState({
      shop: response.data.salespersons,
    });
  };
  showWelcomeMessage = () =>
    Alert.alert('Welcome to San Francisco', 'The food is amazing', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Ok',
      },
    ]);

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
    this.setState({
      currentLocation: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    });
    this.setState({ initialPosition });
  };

  onCarouselItemChange = (index) => {
    let location = this.state.coordinates[index];

    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 16.039344,
      longitudeDelta: 108.197712,
    });

    this.state.markers[index].showCallout();
  };

  onMarkerPressed = (location, index) => {
    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 16.039344,
      longitudeDelta: 108.197712,
    });

    this._carousel.snapToItem(index);
  };
  shopMapClick = (data) => {
    this.setState({ openModal: true, modalData: data });
  };
  renderCarouselItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Image style={styles.cardImage} source={item.image} />
    </View>
  );

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
          {this.state.destination && (
            <MapViewDirections
              origin={this.state.currentLocation}
              destination={this.state.destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="green"
            />
          )}

          {this.state.shop &&
            this.state.shop.map((marker, index) => (
              <Marker
                draggable
                key={index}
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
        </MapView>
        {this.state.destination && (
          <Btn
            style={styles.buttonView}
            text={
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    destination: null,
                  })
                }
              >
                <FontAwesome5 name="arrow-left" size={30} />
              </TouchableOpacity>
            }
            textStyle={styles.txtBtnView}
          />
        )}

        <ModalMapShop
          openModal={this.state.openModal}
          modalData={this.state.modalData}
          closeModal={() => this.setState({ openModal: false })}
          nameShop={this.state.modalData ? this.state.modalData.name : ''}
          navigation={this.props.navigation}
          setDirection={() => {
            this.setState({
              openModal: false,
            });
            this.setState({
              destination: {
                latitude: this.state.modalData.latitude,
                longitude: this.state.modalData.longitude,
              },
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    // ...StyleSheet.absoluteFillObject,
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
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
