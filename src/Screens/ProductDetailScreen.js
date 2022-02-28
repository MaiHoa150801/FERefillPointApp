import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { Rating } from "react-native-ratings";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Line from "../components/Line";

const ProductDetailScreen = () => {
  const image = {
    uri: "https://cdn.pixabay.com/photo/2017/04/04/23/54/rush-2203494_960_720.jpg",
  };
  return (
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
      <View style={styles.reviewView}>
        <Text>ĐÁNH GIÁ SẢN PHẨM</Text>
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
        <Line height={2} color={"#9EADBA"} />
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // paddingLeft: 17,
  },
  nameView: {
    marginBottom: -150,
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
    marginRight: "auto",
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
});
