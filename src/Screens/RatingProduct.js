import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import { Divider } from 'react-native-paper';
import Btn from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { RatingProductAsyn } from '../service/RatingProductService';
import * as FileSystem from 'expo-file-system';
const RatingProduct = ({ route, navigation }) => {
  const { product, order_id } = route.params;
  const [star, setStar] = useState(5);
  const [comment, setComment] = useState(null);
  const [photo, setPhoto] = useState([]);
  const pickImage = async () => {
    if (photo.length == 5) {
      return 0;
    }
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!data.cancelled) {
      let options = { encoding: FileSystem.EncodingType.Base64 };
      FileSystem.readAsStringAsync(data.uri, options).then(async (data1) => {
        let filename = data.uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        const imagePush = {
          uri: data.uri,
          data: data1,
          name: filename,
          type,
        };
        const image = Array.from(photo);
        image.push(imagePush);
        await setPhoto(image);
      });
    }
  };
  const removeImage = async (index) => {
    const image = Array.from(photo);
    let imagePop = await image.splice(index, 1);
    setPhoto(image);
  };
  const rating = async () => {
    const profile = await SecureStore.getItemAsync('user');
    const user = await JSON.parse(profile).user;
    const data = {
      product_id: product._id,
      star: star,
      comment: comment,
      account_id: user._id,
      list_image: photo.length ? photo : null,
      list_order_id: order_id,
    };
    try {
      const res = await RatingProductAsyn(data);
      navigation.navigate('AccountScreen');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.notifi}>
          <FontAwesome5 name="coins" color="green" size={20} />
          <Text style={styles.txtNoti}>Đánh giá để nhận 200 Point</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.viewProduct}>
            <Image
              style={styles.image}
              source={{
                uri: product.list_image[0],
              }}
            />
            <Text style={styles.txtNoti}>{product.name}</Text>
          </View>
          <Divider />
          <View style={styles.rating}>
            <Rating
              type="custom"
              ratingCount={5}
              onFinishRating={(e) => {
                setStar(e);
              }}
              minValue={1}
              startingValue={star}
              imageSize={39}
              ratingBackgroundColor="#c8c7c8"
              tintColor="white"
            />
          </View>
          <Text style={styles.status}>
            Thêm nhận xét và đánh giá sao cho sản phẩm để nhận 200 Coin điểm
            xanh
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            {photo &&
              photo.map((e, index) => (
                <View style={{ width: '23%', marginHorizontal: 10 }}>
                  <Image
                    source={{ uri: e.uri }}
                    style={{ height: 100, width: '100%' }}
                  />
                  <TouchableOpacity
                    onPress={() => removeImage(index)}
                    style={styles.rmImg}
                  >
                    <Text>x</Text>
                  </TouchableOpacity>
                </View>
              ))}
            <TouchableOpacity
              style={[
                styles.viewAddImage,
                {
                  width: photo.length > 0 ? '23%' : '50%',
                  marginLeft: photo.length == 0 ? 'auto' : 0,
                  marginRight: photo.length == 0 ? 'auto' : 0,
                },
              ]}
              onPress={pickImage}
            >
              <FontAwesome5 name="camera" size={25} color="green" />
              <Text style={styles.addImage}>
                Thêm hình ảnh ({photo.length}/ 5)
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.comment}>
            <TextInput
              placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này nhé!"
              multiline={true}
              value={comment}
              numberOfLines={10}
              onChangeText={(text) => setComment(text)}
              style={{ textAlignVertical: 'top', fontSize: 17 }}
            />
          </View>
          <View style={styles.submit}>
            <Btn
              onPress={rating}
              disabled={comment ? false : true}
              text="Đánh giá"
              style={[
                styles.btn,
                { backgroundColor: comment ? 'green' : 'gray' },
              ]}
              textStyle={{ color: 'white', fontSize: 17, textAlign: 'center' }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RatingProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    width: '96%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image: {
    width: 40,
    height: 40,
  },
  notifi: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#AFFFB6',
  },
  txtNoti: {
    fontSize: 17,
    marginLeft: 10,
  },
  viewProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  rating: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  status: {
    fontSize: 17,
    color: '#B0B8B1',
  },
  comment: {
    borderWidth: 1,
    borderColor: '#676C68',
    backgroundColor: '#F5F5F5',
    padding: 5,
    borderRadius: 5,
  },
  addImage: {
    color: 'green',
    fontSize: 14,
    textAlign: 'center',
  },
  viewAddImage: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    backgroundColor: 'green',
    width: 100,
    borderRadius: 5,
  },
  submit: {
    alignItems: 'center',
    marginTop: 20,
  },
  rmImg: {
    position: 'absolute',
    backgroundColor: 'green',
    paddingHorizontal: 7,
    paddingVertical: 3,
    right: 0,
  },
});
