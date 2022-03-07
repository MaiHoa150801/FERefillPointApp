import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Line from "../components/Line";
import ImageView from "react-native-image-viewing";

const ProductDetailScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const image = {
    uri: "https://cdn.pixabay.com/photo/2017/04/04/23/54/rush-2203494_960_720.jpg",
  };
  const images = [
    {
      uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    },
    {
      uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
    },
    {
      uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    },
  ];

  const openSettingsModal = (img, index) => {
    let images = img.map((item) => ({ uri: item }));
    setModalImage(images);
    setModalVisible(!modalVisible);
    setImgIndex(index);
  };

  return (
    // <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <View style={styles.nameView}>
        <Image
          style={styles.productImage}
          source={{
            uri: "https://images.unsplash.com/photo-1565573349860-cbf26ef3f40f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJvc2UlMjBmbG93ZXJ8ZW58MHx8MHx8&w=1000&q=80",
          }}
          resizeMode="cover"
        />
        <Text style={styles.nameText}>
          Refill nước giặt hữu cơ Fuwa3e oragnic sinh học giặc quần áo an toàn
        </Text>
        <Text style={styles.price}>10.000đ/100ml</Text>
        <View style={styles.ratingView}>
          <Rating
            style={styles.ratingStyle}
            type="custom"
            ratingCount={4}
            startingValue={4}
            imageSize={18}
            readonly={true}
            ratingColor="#F7C325"
            tintColor="white"
          />
          <Text style={styles.numberSale}>Đã bán 2,2k</Text>
        </View>
      </View>
      <Line height={10} color={"#DFE6ED"} />

      <View style={styles.shopView}>
        <Image
          style={styles.avatarStyle}
          source={{
            uri: "https://images.unsplash.com/photo-1565573349860-cbf26ef3f40f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJvc2UlMjBmbG93ZXJ8ZW58MHx8MHx8&w=1000&q=80",
          }}
        />
        <View style={styles.nameShop}>
          <Text style={styles.nameText}>Fuwa3E - Chế phẩm sinh học...</Text>
          <View style={styles.locationView}>
            <Ionicons name="location-outline" size={17} color={"#0D0A03"} />
            <Text style={styles.locationText}>Đà Nẵng</Text>
          </View>
        </View>
      </View>

      <Line height={10} color={"#DFE6ED"} />

      <View style={styles.detailView}>
        <Text style={styles.detailText}>Chi tiết sản phẩm</Text>
        <Line height={2} color={"#9EADBA"} />
        <Text style={styles.detailText}>Thương hiệu</Text>
        <Line height={2} color={"#9EADBA"} />
        <Text>
          *Thông tin Nước giặt hữu cơ Fuwa3e organic sinh học giặt quần áo, an
          toàn cho bé Thành phần: -90% là chế phẩm Enzyme sinh học được ngâm ủ
          và lên men từ vỏ dứa, cam, chanh -10% là các chất hữu cơ tạo bọt lành
          tính từ thực vật
        </Text>
      </View>
      <Line height={10} color={"#DFE6ED"} />
      <View style={styles.reView}>
        <Text>ĐÁNH GIÁ SẢN PHẨM</Text>
        <View style={styles.reviewView}>
          <View style={styles.userStyle}>
            <Image
              style={styles.avatarStyle}
              source={{
                uri: "https://images.unsplash.com/photo-1565573349860-cbf26ef3f40f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJvc2UlMjBmbG93ZXJ8ZW58MHx8MHx8&w=1000&q=80",
              }}
            />
            <View style={styles.userName}>
              <Text style={styles.nameText}>Thu</Text>
              <Text style={styles.childText}>user</Text>
            </View>
            <View style={styles.starView}>
              <Rating
                type="custom"
                ratingCount={4}
                startingValue={4}
                imageSize={18}
                readonly={true}
                ratingColor="#DB147F"
                tintColor="white"
              />
              <Text style={styles.date}>22-02-2022</Text>
            </View>
          </View>
          <Text style={styles.reviewText}>Good</Text>

          <View style={styles.imgView}>
            {images.map((items, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.imgItem}
                  onPress={() => {
                    openSettingsModal(images, index);
                  }}
                >
                  <Image
                    style={styles.imgStyle}
                    source={{
                      uri: `${items}`,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <ImageView
            images={modalImage}
            imageIndex={imgIndex}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          />
        </View>
        <Text>Thu</Text>
        <Text>Thu</Text>
        <Text>Thu</Text>
        <Text>Thu</Text>
        <Text>Thu</Text>
        <Text>Thu</Text>
        <Text>Thu</Text>
        <Text>Thu</Text>
      </View>
    </View>
    /* </ScrollView> */
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: "white",
    // paddingLeft: 17,
  },
  nameView: {
    marginBottom: -70,
  },
  reviewView: {
    paddingTop: 16,
  },
  productImage: {
    width: "100%",
    height: "50%",
    // marginLeft: "auto",
  },
  nameText: {
    padding: 7,
  },
  price: {
    color: "#E8833A",
    fontWeight: "700",
    padding: 7,
    marginTop: -7,
    paddingBottom: 7,
    fontSize: 17,
  },
  ratingStyle: {
    // paddingLeft: 7,
  },
  ratingView: {
    flexDirection: "row",
    // marginRight: "auto",
    paddingLeft: 7,
  },
  numberSale: {
    paddingLeft: 7,
  },

  avatarStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  shopView: {
    flexDirection: "row",
    padding: 16,
  },
  nameShop: {
    marginLeft: 7,
  },
  locationView: {
    flexDirection: "row",
    paddingLeft: 3,
  },
  reviewView: {
    paddingTop: 16,
  },
  userStyle: {
    flexDirection: "row",
    paddingLeft: 16,
    alignItems: "center",
  },
  avatarStyle: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  userName: {
    paddingLeft: 10,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 17.57,
  },
  childText: {
    color: "#32A4FC",
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 16,
  },
  starView: {
    paddingLeft: 10,
    justifyContent: "flex-start",
  },
  date: {
    color: "#857E7F",
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "700",
  },
  reviewText: {
    paddingLeft: 16,
    paddingBottom: 12,
    paddingTop: 14,
  },
  imgView: {
    flexDirection: "row",
    marginLeft: 8,
  },
  imgItem: {
    paddingLeft: 8,
  },
  imgStyle: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  imgModal: {
    width: 400,
    height: 400,
  },
  imgModalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
});
