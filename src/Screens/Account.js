import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { posts } from './GreenComunity';
import { FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';

export default function Account({ navigation }) {
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
      <ProfileHeader />
      <Categorites />
      <Post />
    </SafeAreaView>
  );
}

const ProfileHeader = () => (
  <View style={styles.viewimage}>
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 25 }}>Vĩ Lê</Text>
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://bain.design/wp-content/uploads/2013/03/People-Avatar-Set-Rectangular-13.jpg',
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
        <Text style={styles.text1}>150 GP</Text>
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
    <Text style={styles.textCategory}>Hình ảnh</Text>
    <Text style={styles.textCategory}>Sự kiện</Text>
    <Text style={styles.textCategory}>Video</Text>
  </View>
);
const Post = () => (
  <ScrollView
    contentContainerStyle={styles.contentContainer}
    style={{ flex: 0 }}
  >
    <View>
      {posts.map((post1, index) => (
        <View
          style={{
            marginBottom: 20,
            backgroundColor: 'transparent',
          }}
          key={index}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20,
            }}
          >
            <Image
              style={{ width: 50, height: 50, marginRight: 10 }}
              source={{
                uri: post1.avatar,
              }}
            />
            <Text style={styles.text1}>{post1.name}</Text>
          </View>
          <Text style={styles.txtDescription}>{post1.description}</Text>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: post1.image,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 30,
              marginTop: 15,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <AntDesign
                style={{ marginRight: 10 }}
                name="like2"
                color="rgb(18, 136, 58)"
                size={25}
              />
              <Text style={styles.text1}>Like</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome5
                style={{ marginRight: 10, color: 'rgb(18, 136, 58)' }}
                name="comment"
                size={25}
              />
              <Text style={styles.text1}>Comment</Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <AntDesign
                style={{ marginRight: 10 }}
                name="sharealt"
                color="rgb(18, 136, 58)"
                size={25}
              />
              <Text style={styles.text1}>Share</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  </ScrollView>
);
const styles = StyleSheet.create({
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
  },
  headerAvatar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text1: {
    fontSize: 20,
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
  tinyLogo: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  txtDescription: {
    fontSize: 20,
    marginLeft: 20,
  },
});
