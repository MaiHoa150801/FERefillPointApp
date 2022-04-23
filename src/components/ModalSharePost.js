import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { Modal } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import Btn from './Button';
import * as SecureStore from 'expo-secure-store';
import { sharePostAsyn } from '../service/PostService';
const ModalSharePost = ({ modalVisible, closeModal, postShare, text = '' }) => {
  const [description, setDescription] = useState('');
  const [numberLine, setNumberLine] = useState(1);
  const [user, setUser] = useState(null);
  useEffect(() => {
    getData();
    return () => {
      setDescription('');
    };
  }, []);
  const getData = async () => {
    const profile = await SecureStore.getItemAsync('user');
    const user = JSON.parse(profile);
    setUser(user.user);
  };
  const sharePost = async () => {
    const data = {
      description: description,
      share_id: postShare.id,
    };
    try {
      await sharePostAsyn(data);
      setDescription('');
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
              Chia sẻ bài viết
            </Text>
            <Btn
              text="Đăng"
              disabled={description == '' ? true : false}
              textStyle={styles.textStyle}
              onPress={() => {
                sharePost();
              }}
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

            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
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
          {postShare && (
            <View style={styles.greenComunity}>
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
                    uri: postShare.account_id.avatar.url
                      ? postShare.account_id.avatar.url
                      : 'https://icon-library.com/images/icon-material/icon-material-12.jpg',
                  }}
                />
                <Text style={styles.name}>{postShare.account_id.name}</Text>
              </View>
              <Text style={styles.textDescription}>
                {postShare.description}
              </Text>
              {postShare.list_image.length > 0 && (
                <View>
                  <TouchableOpacity
                    onPress={() => showImageView(postShare.list_image)}
                  >
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: postShare.list_image[0],
                      }}
                    />
                  </TouchableOpacity>
                  {postShare.list_image.length > 1 && (
                    <View style={styles.abImg}>
                      <Text
                        style={{
                          color: 'black',
                          marginRight: 20,
                          marginBottom: 20,
                          fontSize: 20,
                        }}
                      >
                        +{postShare.list_image.length - 1}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalSharePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444444',
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
  viewInput: {
    padding: 10,
    borderRadius: 20,
  },
  txtInput: {
    fontSize: 17,
    color: 'white',
    textAlignVertical: 'top',
    lineHeight: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenComunity: {
    marginVertical: 10,
    backgroundColor: '#444444',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  textDescription: {
    fontSize: 16,
    marginHorizontal: 20,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  tinyLogo: {
    width: '100%',
    height: 300,
    marginTop: 10,
  },
  addImage: {
    color: 'green',
    fontSize: 14,
    textAlign: 'center',
  },
});
