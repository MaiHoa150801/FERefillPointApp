import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { getRefillPoint } from '../service/RefillPointService';
const HeaderHome = () => {
  const [user, setUser] = useState(null);
  const [refillPoint, setRefillPoint] = useState(0);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const profile = await SecureStore.getItemAsync('user');
    const user = JSON.parse(profile).user;
    setUser(user);
    const point = await getRefillPoint(user._id);
    setRefillPoint(point.data.refillPoint.score);
  };
  return (
    <>
      {user && (
        <View style={styles.container}>
          <Image
            width={60}
            height={60}
            style={styles.image}
            source={{
              uri: user.avatar.url
                ? user.avatar.url
                : 'https://icon-library.com/images/icon-material/icon-material-12.jpg',
            }}
          />
          <View style={styles.title}>
            <Text style={styles.txtTitle}>{user.name}</Text>
            <Text style={styles.txtTitle}>{refillPoint}RP</Text>
          </View>
          <View style={styles.bell}>
            <FontAwesome name="bell" size={35} color={'#ffffff'} />
          </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 20,
    padding: 10,
    backgroundColor: 'rgb(18, 136, 58)',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  title: {
    justifyContent: 'center',
  },
  bell: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  txtTitle: {
    fontSize: 15,
    color: '#ffffff',
  },
});

export default HeaderHome;
