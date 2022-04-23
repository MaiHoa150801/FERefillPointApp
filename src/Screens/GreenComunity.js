import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Btn from '../components/Button';
import { EvilIcons, Fontisto } from '@expo/vector-icons';
import { colors } from '../global/styles';
import * as SecureStore from 'expo-secure-store';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Modal } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Dimensions } from 'react-native';
import { TextInput } from 'react-native';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  createPost,
  deletePostAsyn,
  getPost,
  updateLikePost,
  updatePostAsyn,
} from '../service/PostService';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { io } from 'socket.io-client';
import ImageView from 'react-native-image-viewing';
import ModalSharePost from '../components/ModalSharePost';
export default function GreenComunity({ navigation }) {
  let _carousel = {};
  let socket = {
    current: null,
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [postIdUpdate, setPostIdUpdate] = useState(null);
  const [sharePost, setSharePost] = useState({
    visible: false,
    postShare: null,
  });
  const [description, setDescription] = useState('');
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState(null);
  const [typeAction, setTypeAction] = useState('add');
  const [posts, setPost] = useState(null);
  const [numberLine, setNumberLine] = useState(1);
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, []);
  const getData = async () => {
    socket.current = io('http://192.168.32.160:8080');
    socket.current.on('connnection', () => {
      console.log('connected to server');
    });
    socket.current.on(`posts`, async (data) => {
      setPost(data);
    });
    const profile = await SecureStore.getItemAsync('user');
    const user = JSON.parse(profile);
    setUser(user.user);
    const { data } = await getPost();
    setPost(data.listPost);
  };
  const removePhoto = async (index) => {
    const image = Array.from(photo);
    let imagePop = await image.splice(index, 1);
    setPhoto(image);
  };
  const acctionPost = async () => {
    if (typeAction == 'add') {
      const data = {
        description: description,
        list_image: photo,
      };
      const res = await createPost(data);
      closeModal();
    } else {
      const data = {
        description: description,
        list_image: photo,
      };
      const res = await updatePostAsyn(postIdUpdate, data);
      closeModal();
    }
  };
  const closeModal = () => {
    setPhoto([]);
    setDescription('');
    setTypeAction('add');
    setModalVisible(false);
  };
  const renderCarouselItem = ({ item, index }) => (
    <View style={styles.cardContainer} key={index}>
      <Image
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
        source={{
          uri: item.uri,
        }}
      />
      <TouchableOpacity
        onPress={() => removePhoto(index)}
        style={{ position: 'absolute', top: -10, right: 0, padding: 5 }}
      >
        <Text style={{ fontSize: 30, color: 'red' }}>x</Text>
      </TouchableOpacity>
    </View>
  );
  const updateLike = async (post_id) => {
    try {
      const res = await updateLikePost(post_id);
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = async (post_id) => {
    Alert.alert(
      'Bạn có muốn xóa bài viết này',
      'Bài viết sẽ bị xóa vĩnh viễn!',
      [
        {
          text: 'Thoát',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: async () => await deletePostAsyn(post_id),
          style: 'ok',
        },
      ]
    );
  };
  const setUpdateAction = async (data) => {
    setPostIdUpdate(data.id);
    setTypeAction('update');
    setDescription(data.description);
    let images = [];
    await data.list_image.map((e) => {
      images.push({
        uri: e,
      });
    });
    setPhoto(images);
    setModalVisible(true);
  };
  const showImageView = async (list_image) => {
    let image = [];
    await list_image.map((e) => {
      image.push({
        uri: e,
      });
    });
    setImages(image);
    setVisible(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Cộng đồng cùng hành động</Text>
        <Btn
          text="Đăng"
          textStyle={styles.textStyle}
          onPress={() => setModalVisible(true)}
          style={styles.btnCapNhat}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {posts &&
          posts.map((post, index) => (
            <View style={styles.greenComunity} key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingTop: 10,
                }}
              >
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    borderRadius: 20,
                  }}
                  source={{
                    uri: post.account_id.avatar.url
                      ? post.account_id.avatar.url
                      : 'https://icon-library.com/images/icon-material/icon-material-12.jpg',
                  }}
                />
                <View>
                  <Text style={styles.name}>{post.account_id.name}</Text>
                  {post.share_id && (
                    <Text style={{ color: '#00CC00' }}>
                      Đã chia sẻ bài viết
                    </Text>
                  )}
                </View>
                {post.account_id._id == (user ? user._id : 7) ? (
                  <Menu style={{ marginLeft: 'auto' }}>
                    <MenuTrigger>
                      <FontAwesome5 name="ellipsis-v" size={20} color="white" />
                    </MenuTrigger>
                    <MenuOptions
                      customStyles={{
                        optionsContainer: {
                          width: 100,
                          padding: 5,
                          backgroundColor: 'gray',
                        },
                      }}
                    >
                      <MenuOption onSelect={() => setUpdateAction(post)}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <FontAwesome5 name="pen" color="white" size={20} />
                          <Text
                            style={{
                              color: 'white',
                              textAlign: 'center',
                              fontSize: 15,
                            }}
                          >
                            Update
                          </Text>
                        </View>
                      </MenuOption>
                      <Divider />
                      <MenuOption onSelect={() => deletePost(post.id)}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <FontAwesome5 name="trash" color="white" size={20} />
                          <Text
                            style={{
                              color: 'white',
                              textAlign: 'center',
                              fontSize: 15,
                            }}
                          >
                            Delete
                          </Text>
                        </View>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                ) : null}
              </View>

              <Text style={styles.textDescription}>{post.description}</Text>
              {post.share_id && (
                <View
                  style={[
                    styles.greenComunity,
                    { width: '90%', marginLeft: 'auto', marginRight: 'auto' },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: 10,
                    }}
                  >
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        borderRadius: 20,
                      }}
                      source={{
                        uri: post.share_id.account_id.avatar.url
                          ? post.share_id.account_id.avatar.url
                          : 'https://icon-library.com/images/icon-material/icon-material-12.jpg',
                      }}
                    />
                    <Text style={styles.name}>
                      {post.share_id.account_id.name}
                    </Text>
                    <TouchableOpacity
                      style={{ marginLeft: 'auto' }}
                      onPress={() =>
                        navigation.navigate('PostDetailScreen', {
                          post_id: post.share_id._id,
                        })
                      }
                    >
                      <Text style={{ color: '#00CC00' }}>Xem chi tiết</Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={[styles.textDescription, { marginHorizontal: 0 }]}
                  >
                    {post.share_id.description}
                  </Text>
                  {post.share_id.list_image.length > 0 && (
                    <View>
                      <TouchableOpacity
                        onPress={() => showImageView(post.share_id.list_image)}
                      >
                        <Image
                          style={styles.tinyLogo}
                          source={{
                            uri: post.share_id.list_image[0],
                          }}
                        />
                      </TouchableOpacity>
                      {post.share_id.list_image.length > 1 && (
                        <View style={styles.abImg}>
                          <Text
                            style={{
                              color: 'black',
                              marginRight: 20,
                              marginBottom: 20,
                              fontSize: 20,
                            }}
                          >
                            +{post.share_id.list_image.length - 1}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              )}
              {post.list_image.length > 0 && (
                <View>
                  <TouchableOpacity
                    onPress={() => showImageView(post.list_image)}
                  >
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: post.list_image[0],
                      }}
                    />
                  </TouchableOpacity>

                  {post.list_image.length > 1 && (
                    <View style={styles.abImg}>
                      <Text
                        style={{
                          color: 'black',
                          marginRight: 20,
                          marginBottom: 20,
                          fontSize: 20,
                        }}
                      >
                        +{post.list_image.length - 1}
                      </Text>
                    </View>
                  )}
                </View>
              )}

              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ color: 'white' }}>
                  {post.like == 0 ? null : post.like + ' lượt thích'}
                </Text>
                <View>
                  <Text style={{ color: 'white' }}>
                    {post.list_comment.length == 0
                      ? null
                      : post.list_comment.length + ' lượt bình luận'}
                  </Text>
                  <Text style={{ color: 'white' }}>
                    {post.share == 0 ? null : post.share + ' lượt chia sẻ'}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  marginTop: 15,
                }}
              >
                <TouchableOpacity
                  onPress={() => updateLike(post.id)}
                  style={{ flexDirection: 'row' }}
                >
                  <FontAwesome
                    style={{ marginRight: 8 }}
                    name={
                      post.list_account_like.indexOf(user && user._id) == -1
                        ? 'thumbs-o-up'
                        : 'thumbs-up'
                    }
                    size={25}
                    color={
                      post.list_account_like.indexOf(user && user._id) == -1
                        ? 'white'
                        : 'rgb(18, 136, 58)'
                    }
                  />
                  <Text
                    style={[
                      styles.text1,
                      {
                        color:
                          post.list_account_like.indexOf(user && user._id) == -1
                            ? 'white'
                            : 'rgb(18, 136, 58)',
                      },
                    ]}
                  >
                    Thích
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() =>
                    navigation.navigate('PostDetailScreen', {
                      post_id: post.id,
                      nav: navigation,
                    })
                  }
                >
                  <EvilIcons
                    style={{ marginRight: 8 }}
                    name="comment"
                    size={30}
                    color={'white'}
                  />
                  <Text style={styles.text1}>Bình luận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setSharePost((prevState) => ({
                      ...prevState,
                      visible: true,
                      postShare: post,
                    }))
                  }
                  style={{ flexDirection: 'row' }}
                >
                  <Fontisto
                    style={{ marginRight: 8 }}
                    name="share-a"
                    size={20}
                    color={'white'}
                  />
                  <Text style={styles.text1}>Chia sẻ</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContain}>
          <ScrollView>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeModal} style={styles.btnClose}>
                <Text style={styles.txtClose}>x</Text>
              </TouchableOpacity>
              <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
              >
                {typeAction == 'add' ? 'Tạo bài viết' : 'Cập nhật bài viết'}
              </Text>
              <Btn
                text={typeAction == 'add' ? 'Đăng' : 'Cập nhật'}
                disabled={description == '' ? true : false}
                textStyle={styles.textStyle}
                onPress={acctionPost}
                style={[
                  styles.btnCapNhat,
                  {
                    backgroundColor:
                      description == '' ? 'gray' : 'rgb(18, 136, 58)',
                  },
                ]}
              />
            </View>
            <View style={styles.user}>
              {user && (
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
              )}

              <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
              >
                {user && user.name}
              </Text>
            </View>
            <View style={styles.viewInput}>
              <TextInput
                onChangeText={(text) => setDescription(text)}
                multiline={true}
                placeholderTextColor="white"
                onKeyPress={(e) => {
                  if (e.nativeEvent.key == 'Enter' && numberLine < 11)
                    setNumberLine(numberLine + 1);
                }}
                value={description}
                numberOfLines={numberLine}
                style={styles.txtInput}
                placeholder="Hãy chia sẻ những niềm vui của bạn"
              />
            </View>
            {photo.length > 0 && (
              <Carousel
                ref={(c) => {
                  _carousel = c;
                }}
                data={photo}
                containerCustomStyle={styles.carousel}
                renderItem={renderCarouselItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={300}
                removeClippedSubviews={false}
                // onSnapToItem={(index) => onCarouselItemChange(index)}
              />
            )}
          </ScrollView>
          <TouchableOpacity style={[styles.viewAddImage]} onPress={pickImage}>
            <FontAwesome5 name="camera" size={25} color="green" />
            <Text numberOfLines={6} style={styles.addImage}>
              Thêm hình ảnh
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
      <ModalSharePost
        postShare={sharePost.postShare}
        modalVisible={sharePost.visible}
        closeModal={() =>
          setSharePost((prevState) => ({
            ...prevState,
            visible: false,
          }))
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    margin: 10,
  },
  greenComunity: {
    marginVertical: 10,
    backgroundColor: '#444444',
    paddingBottom: 10,
  },
  iconComunity: {
    marginRight: 20,
  },
  text: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 20,
    marginLeft: 10,
    alignContent: 'center',
  },
  textStyle: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },

  btnCapNhat: {
    backgroundColor: 'rgb(18, 136, 58)',
    padding: 10,
    borderRadius: 10,
    width: 80,
  },
  text1: {
    fontSize: 16,
    color: 'white',
    // fontWeight: "bold",
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  tinyLogo: {
    width: '100%',
    height: 300,
    marginTop: 10,
  },
  textDescription: {
    fontSize: 16,
    marginHorizontal: 20,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalContain: {
    flex: 1,
    backgroundColor: '#222222',
  },
  modalHeader: {
    backgroundColor: '#444444',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnClose: {
    padding: 10,
  },
  txtClose: {
    fontSize: 30,
    color: 'white',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20,
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
    marginTop: 20,
  },
  cardContainer: {
    backgroundColor: 'white',
    height: 200,
    width: 300,
    borderColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
  },
  viewInput: {
    padding: 10,
  },
  txtInput: {
    fontSize: 17,
    color: 'white',
    textAlignVertical: 'top',
  },
  abImg: {
    width: 100,
    height: 100,
    position: 'absolute',
    backgroundColor: '#CDC9C9',
    bottom: 0,
    right: 0,
    opacity: 0.6,
    borderTopLeftRadius: 100,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
