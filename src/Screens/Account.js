import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { posts } from './GreenComunity';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { AntDesign, EvilIcons, Fontisto } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';
import ViewColumnIconText from '../components/ViewColumnIconText';
import * as SecureStore from 'expo-secure-store';
import { getRefillPoint } from '../service/RefillPointService';
export default function Account({ navigation }) {
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
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TouchableOpacity style={styles.header}>
          <AntDesign
            style={styles.iconsetting}
            name="setting"
            size={30}
            onPress={() => navigation.navigate('Setting')}
            color={'#ffff'}
          />
        </TouchableOpacity>
      </View>
      {user && <ProfileHeader user={user} point={refillPoint} />}

      <Post navigation={navigation} />
    </SafeAreaView>
  );
}

const ProfileHeader = ({ user, point }) => (
  <View style={styles.viewimage}>
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 25 }}>{user.name}</Text>
      <Image
        style={styles.avatar}
        source={{
          uri: user.avatar.url
            ? user.avatar.url
            : 'https://icon-library.com/images/icon-material/icon-material-12.jpg',
        }}
      />
    </View>
    <View style={styles.headerAvatar}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          left: 20,
          top: -20,
        }}
      >
        <AntDesign
          style={styles.icon1}
          name="setting"
          size={40}
          color={'rgb(18, 136, 58)'}
          onPress={null}
        />
        <Text style={styles.text1}>{point} GP</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          alignItems: 'center',
          right: 30,
          top: -20,
        }}
      >
        <AntDesign
          style={styles.icon2}
          name="dingding"
          size={40}
          color={'rgb(18, 136, 58)'}
          onPress={null}
        />
        <Text style={styles.text2}>1</Text>
      </View>
    </View>
  </View>
);
const Categorites = () => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    }}
  >
    <Text style={styles.textCategory}>H??nh ???nh</Text>
    <Text style={styles.textCategory}>S??? ki???n</Text>
    <Text style={styles.textCategory}>Video</Text>
  </View>
);
const Post = ({ navigation }) => (
  <ScrollView
    contentContainerStyle={styles.contentContainer}
    // style={{ flex: 0 }}
  >
    <View style={styles.row}>
      <FontAwesome5 name="wallet" size={20} color="#BBBBBB" />
      <Text style={styles.txt}>????n ?????t h??ng</Text>
    </View>

    <Divider style={styles.divider} />
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={{
        // flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
      }}
    >
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('OrderScreen', { status: 'Ch??? x??c nh???n' })
        }
      >
        <ViewColumnIconText icon="receipt" text="Ch??? x??c nh???n" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('OrderScreen', { status: '???? x??c nh???n' })
        }
        s
      >
        <ViewColumnIconText icon="store" text="???? x??c nh???n" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('OrderScreen', { status: '??ang giao h??ng' })
        }
      >
        <ViewColumnIconText icon="shipping-fast" text="??ang giao h??ng" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('OrderScreen', { status: '???? h???y' })}
      >
        <ViewColumnIconText icon="times-circle" text="???? h???y" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('OrderSuccessScreen')}
      >
        <ViewColumnIconText icon="star" text="????nh gi??" />
      </TouchableOpacity>
    </ScrollView>
    <Divider style={styles.divider} />

    <View style={styles.viewbody}>
      <Text style={styles.titlePost}>B??i vi???t xanh</Text>
    </View>
  </ScrollView>
);
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    width: '100%',
    height: 70,
    backgroundColor: 'rgb(18, 136, 58)',
  },
  iconsetting: {
    position: 'absolute',
    right: 25,
    top: 26,
  },
  viewimage: { marginBottom: 30 },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 40,
    marginTop: 10,
  },
  headerAvatar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text1: {
    fontSize: 16,
  },
  icon1: { marginRight: 10 },
  icon2: { marginRight: 10 },
  text2: {
    fontSize: 20,
  },
  textCategory: {
    height: 40,
    width: 100,
    textAlign: 'center',
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    color: '#ffffff',
    borderRadius: 20,
    fontSize: 17,
    backgroundColor: 'rgb(18, 136, 58)',
  },
  titlePost: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'rgb(18, 136, 58)',
    marginBottom: 10,
  },
  tinyLogo: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  contentContainer: {
    // paddingVertical: 20,
  },
  txtDescription: {
    fontSize: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewbody: {
    marginHorizontal: 20,
    // marginVertical: 15,
    backgroundColor: '#eee',
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    height: 1,
  },
  txt: {
    marginLeft: 10,
    fontSize: 17,
    color: '#444444',
    fontWeight: 'bold',
  },
  item: {
    marginHorizontal: 5,
  },
});
