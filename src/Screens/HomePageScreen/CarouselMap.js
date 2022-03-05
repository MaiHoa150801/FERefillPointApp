import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Alert, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {} from 'expo';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import ModalMapShop from '../../components/ModalMapShop';

export default class CarouselMap extends Component {
  static navigationOptions = {
    title: 'San Francisco',
  };

  state = {
    markers: [],
    openModal: false,
    coordinates: [
      {
        name: 'Burger',
        latitude: 16.069103,
        longitude: 108.234217,
        image: require('./img/burger.jpg'),
      },
      {
        name: 'Pizza',
        latitude: 16.058865,
        longitude: 108.241492,
        image: require('./img/pizza.jpg'),
      },
      {
        name: 'Soup',
        latitude: 37.7665248,
        longitude: -122.4165628,
        image: require('./img/soup.jpg'),
      },
      {
        name: 'Sushi',
        latitude: 37.7834153,
        longitude: -122.4527787,
        image: require('./img/sushi.jpg'),
      },
      {
        name: 'Curry',
        latitude: 37.7948105,
        longitude: -122.4596065,
        image: require('./img/curry.jpg'),
      },
    ],
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
    await Permissions.askAsync(Permissions.LOCATION_BACKGROUND);
    this.locateCurrentPosition();
  };

  locateCurrentPosition = async () => {
    const position = await Location.getCurrentPositionAsync();
    let initialPosition = {
      latitude: 16.039344,
      longitude: 108.197712,
      latitudeDelta: 19.039344,
      longitudeDelta: 110.197712,
    };

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
          showsUserLocation={true}
          zoomControlEnabled={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsPointsOfInterest={true}
          style={styles.map}
          initialRegion={this.state.initialPosition}
        >
          <Marker
            draggable
            coordinate={{ latitude: 37.7825259, longitude: -122.4351431 }}
            image={require('../../../assets/caydoday.png')}
          >
            <Callout onPress={this.showWelcomeMessage}>
              <Text>An Interesting city</Text>
            </Callout>
          </Marker>
          {this.state.coordinates.map((marker, index) => (
            <Marker
              draggable
              key={marker.name}
              ref={(ref) => (this.state.markers[index] = ref)}
              onPress={() => this.setState({ openModal: true })}
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
        <ModalMapShop
          openModal={this.state.openModal}
          closeModal={() => this.setState({ openModal: false })}
          nameShop="Bacon-Chế phẩm sinh học từ vỏ trái cây"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
