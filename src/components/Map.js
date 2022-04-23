import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Alert, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {} from 'expo';
import * as Location from 'expo-location';

export default class Map extends Component {
  static navigationOptions = {
    title: 'San Francisco',
  };

  state = {
    markers: [],
    openModal: false,
    modalData: null,
    shop: [],
    currentLocation: { latitude: 16.052625, longitude: 108.242156 },
    destination: null,
  };

  componentDidMount() {
    this.requestLocationPermission();
  }
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
  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={(map) => (this._map = map)}
        followsUserLocation={true}
        showsUserLocation={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        onPress={(event) => this.props.onPress(event.nativeEvent.coordinate)}
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
        // showsPointsOfInterest={true}
        style={styles.map}
        initialRegion={this.state.initialPosition}
      >
        {this.props.location && (
          <Marker
            draggable
            coordinate={{
              latitude: this.props.location.latitude,
              longitude: this.props.location.longitude,
            }}
            icon={require('../../assets/location.png')}

            // image={{
            //   uri: 'https://vietnam.sapapathfinder.com/images/location.png',
            // }}
          ></Marker>
        )}
      </MapView>
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
    width: '100%',
    height: '100%',
    // ...StyleSheet.absoluteFillObject,
    // flex: 1,
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 48,
  },
});
