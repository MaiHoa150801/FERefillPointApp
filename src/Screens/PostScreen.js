import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Btn from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PostScreen({ navigation: { goBack } }) {
  const [text, onChangeText] = React.useState('What do you want to share?');
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.conatiner}>
      <View style={styles.header}>
        <Ionicons
          style={styles.iconHeader}
          name="arrow-back"
          size={25}
          onPress={() => goBack()}
        />
        <Text style={styles.textHeader}>Create Post</Text>
        <Btn
          text="Đăng"
          textStyle={styles.textStyle}
          onPress={null}
          style={styles.btnCapNhat}
        />
      </View>
      <View style={styles.post}>
        <FontAwesome style={styles.postIcon} name="user-circle-o" size={25} />
        <Text style={styles.name}>Lê Ngọc Vĩ</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <View style={styles.postImage}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <TouchableOpacity style={styles.BtnAddImage} onPress={pickImage}>
          <FontAwesome style={styles.iconAddImage} name="photo" size={25} />
          {/* <Button style={{ width: 100 }} title="Image" onPress={pickImage} /> */}
          <Text>Photo/Video</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  conatiner: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    marginTop: 10,
    borderBottomWidth: 0.5,
    justifyContent: 'space-around',
  },
  textHeader: {
    fontSize: 25,
  },
  iconHeader: {
    marginLeft: 20,
  },
  textStyle: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },

  btnCapNhat: {
    backgroundColor: '#3366CC',
    padding: 5,
    height: 40,
    borderRadius: 10,
    width: 100,
  },

  input: {
    height: 200,
    width: '90%',
    margin: 12,
    padding: 10,
  },
  post: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },
  postIcon: {
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
  },
  image: {
    width: 200,
    height: 200,
  },
  BtnAddImage: {
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  iconAddImage: {
    marginRight: 20,
  },
});
