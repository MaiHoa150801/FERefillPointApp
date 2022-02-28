import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import Btn from "../components/Button";

import Searchbar from "../components/SearchBar";
const ShopDetailScreen = () => {
  const navigation = useNavigation();
  const image = {
    uri: "https://cdn.pixabay.com/photo/2017/04/04/23/54/rush-2203494_960_720.jpg",
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <TouchableOpacity onPress={() => navigation.navigate("GreenMap")}>
          <Ionicons name="arrow-back" size={19} color={"#0D0A03"} />
        </TouchableOpacity>
        <Searchbar textSearch={"Search"} style={styles.searchBar}></Searchbar>
        <View style={styles.avatarView}>
          <Image
            style={styles.avatarStyle}
            source={{
              uri: "https://images.unsplash.com/photo-1565573349860-cbf26ef3f40f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJvc2UlMjBmbG93ZXJ8ZW58MHx8MHx8&w=1000&q=80",
            }}
          />
          <View style={styles.nameShop}>
            <Text style={styles.nameText}>Fuwa3E - Chế phẩm sinh học...</Text>
            <View style={styles.ratingView}>
              <Rating
                type="custom"
                ratingCount={4}
                startingValue={4}
                imageSize={18}
                readonly={true}
                ratingColor="#F7C325"
                tintColor="white"
              />
            </View>
          </View>
        </View>
      </ImageBackground>
      <Text style={styles.voucherText}>Voucher</Text>
      <View style={styles.voucherView}>
        <View style={styles.voucherViewLeft}>
          <Text style={styles.voucherName}>Giảm 15k</Text>
          <Text style={styles.voucherLimited}>Đơn tổi thiểu 199k</Text>
          <Text style={styles.voucherExpiry}>HSD: 31.3.2022</Text>
        </View>
        <View style={styles.voucherViewRight}>
          <Btn text="Lưu" style={styles.saveText}></Btn>
        </View>
      </View>
      <Text style={styles.productText}>Sản phẩm</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.productView}>
          <View style={styles.productItemView}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductDetail")}
            >
              <Image
                style={styles.productStyle}
                source={{
                  uri: "https://cf.shopee.vn/file/0c24e32e696b0c07d30929fd42f8963c",
                }}
                resizeMode="cover"
              />
              <Text style={styles.nameProduct}>
                Refill nước giặt hữu cơ Fuwa3e oragnic sinh học
              </Text>
              <Text style={styles.price}>10.000đ/100ml</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productItemView}>
            <Image
              style={styles.productStyle}
              source={{
                uri: "https://cf.shopee.vn/file/0c24e32e696b0c07d30929fd42f8963c",
              }}
              resizeMode="cover"
            />

            <Text style={styles.nameProduct}>
              Refill nước giặt hữu cơ Fuwa3e oragnic sinh học
            </Text>
            <Text style={styles.price}>10.000đ/100ml</Text>
          </View>
        </View>

        <View style={styles.productView}>
          <View style={styles.productItemView}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductDetail")}
            >
              <Image
                style={styles.productStyle}
                source={{
                  uri: "https://cf.shopee.vn/file/0c24e32e696b0c07d30929fd42f8963c",
                }}
                resizeMode="cover"
              />
              <Text style={styles.nameProduct}>
                Refill nước giặt hữu cơ Fuwa3e oragnic sinh học
              </Text>
              <Text style={styles.price}>10.000đ/100ml</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productItemView}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductDetail")}
            >
              <Image
                style={styles.productStyle}
                source={{
                  uri: "https://cf.shopee.vn/file/0c24e32e696b0c07d30929fd42f8963c",
                }}
                resizeMode="cover"
              />
              <Text style={styles.nameProduct}>
                Refill nước giặt hữu cơ Fuwa3e oragnic sinh học
              </Text>
              <Text style={styles.price}>10.000đ/100ml</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 16,
  },
  avatarStyle: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  avatarView: {
    flexDirection: "row",
    padding: 16,
  },
  nameShop: {
    paddingLeft: 16,
  },
  nameText: {
    fontWeight: "700",
    color: "black",
  },
  voucherText: {
    color: "#E8833A",
    fontWeight: "700",
    fontSize: 17,
    paddingTop: 25,
  },
  image: {
    marginLeft: -16,
  },
  searchBar: {
    paddingTop: 30,
    paddingLeft: 30,
  },
  ratingView: {
    backgroundColor: "transparent",
  },
  voucherView: {
    flexDirection: "row",
  },
  voucherViewLeft: {
    padding: 10,
    borderColor: "#6F7D89",
    borderWidth: 1,
  },
  voucherViewRight: {
    borderColor: "#6F7D89",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    padding: 10,
    justifyContent: "center",
  },
  saveText: {
    backgroundColor: "#E8833A",
    padding: 10,
    color: "white",
    fontWeight: "700",
  },
  voucherName: {
    color: "#E8833A",
    fontWeight: "700",
    fontSize: 16,
  },
  voucherLimited: {
    color: "#E8833A",
    fontWeight: "700",
  },
  voucherExpiry: {
    color: "#6F7D89",
    fontWeight: "600",
  },
  productText: {
    color: "#1B71B9",
    fontWeight: "700",
    fontSize: 17,
    paddingTop: 25,
  },
  productView: {
    flex: 1,
    flexDirection: "row",
  },
  productItemView: {
    width: "47%",
    height: 280,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    borderColor: "#6F7D89",
    borderWidth: 1,
  },
  productStyle: {
    height: "70%",
    width: "100%",
    borderWidth: 1,
  },
  nameProduct: {
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
});
