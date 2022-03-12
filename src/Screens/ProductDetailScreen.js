import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import ImageView from "react-native-image-viewing";
import { Ionicons } from "@expo/vector-icons";
import Line from "../components/Line";
import Rating from "../components/Rating";
import AvatarView from "../components/AvatarView";
import Btn from "../components/Button";
import { Items } from "../mock-data/ProductData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ProductDetailScreen = ({ route, navigation }) => {
  const { productID } = route.params;

  const [product, setProduct] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get product data by productID

  const getDataFromDB = async () => {
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].id == productID) {
        await setProduct(Items[index]);
        return;
      }
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const openSettingsModal = (img, index) => {
    let images = img.map((item) => ({ uri: item }));
    setModalImage(images);
    setModalVisible(!modalVisible);
    setImgIndex(index);
  };

  const width = Dimensions.get("window").width;
  const height = (width / 100) * 60;
  const images = [
    "https://images.pexels.com/photos/10543007/pexels-photo-10543007.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    "https://images.pexels.com/photos/7013458/pexels-photo-7013458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/10323144/pexels-photo-10323144.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/5421792/pexels-photo-5421792.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  ];
  const img = [
    "https://o.vdoc.vn/data/image/2021/02/22/ta-canh-san-truong-gio-ra-choi-sieu-hay-1.jpg",
    "https://www.collinsdictionary.com/images/full/school_309241295.jpg",
    "https://www.berkeleyside.org/wp-content/uploads/2020/01/BAM-berkeley-student-classroom-class-elementary-busd-school.jpg",
    "https://cdn.tgdd.vn/hoi-dap/1380273/back-to-school-la-gi-lich-back-to-school-cua-cac-nuoc-tren-7-800x450.jpg",
  ];
  const [active, setActive] = useState(0);

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

  const addToCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show("Đăng kí refill thành công!", ToastAndroid.SHORT);
        navigation.navigate("ShopDetail");
      } catch (e) {
        console.log("error");
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show("Đăng kí refill thành công!", ToastAndroid.SHORT);
        navigation.navigate("ShopDetail");
      } catch (e) {
        console.log("error");
      }
    }
  };

  const [quantity, setQuantity] = useState(1);
  const minus = () => {
    if (quantity >= 1) setQuantity(quantity - 1);
  };
  const plus = () => {
    setQuantity(quantity + 1);
  };
  return (
    <View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("GreenMap")}>
              <Ionicons
                name="arrow-back"
                size={23}
                color={"#ffff"}
                style={styles.icon}
              />
            </TouchableOpacity>
            <ScrollView
              horizontal={true}
              onScroll={change}
              pagingEnabled
              showsVerticalScrollIndicator={false}
            >
              {images.map((image, index) => (
                <Image
                  key={index}
                  style={{ width, height, resizeMode: "cover" }}
                  source={{
                    uri: image,
                  }}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
            <View style={styles.pagination}>
              {images.map((i, k) => (
                <Text
                  key={k}
                  style={
                    k == active ? styles.pagingActiveText : styles.pagingText
                  }
                >
                  ⬤
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.nameProduct}>
            <Text style={styles.nameText}>
              Refill nước giặt hữu cơ Fuwa3e oragnic sinh học giặc quần áo an
              toàn
            </Text>
            <Text style={styles.price}>
              <Text style={styles.money}>{product.unit_price}đ</Text>/100ml
            </Text>
            <View style={styles.starView}>{Rating(4)}</View>
          </View>
        </View>
        <Line height={10} color={"#F5F5F5"} />
        <View style={styles.shopView}>
          <AvatarView
            star={4}
            height={40}
            width={40}
            text="Fuwa3 - Chế phẩm sinh học"
            color="#293845"
          ></AvatarView>
        </View>
        <Line height={10} color={"#F5F5F5"} />
        <View style={styles.detailView}>
          <Text style={styles.detailText}>Chi tiết sản phẩm</Text>
          <Line height={2} color={"#F5F5F5"} />
          <View style={styles.brandView}>
            <View style={styles.typeView}>
              <Text style={styles.brandText}>Thương hiệu</Text>
            </View>

            <Text style={styles.brandName}>Fuwa3e</Text>
          </View>
          <View style={styles.brandView}>
            <View style={styles.typeView}>
              <Text style={styles.brandText}>Hình thức</Text>
            </View>

            <Text style={styles.brandName}>Chất lỏng</Text>
          </View>

          <Line height={2} color={"#F5F5F5"} />
          <Text style={styles.infoText}>
            * Thông tin Nước giặt hữu cơ Fuwa3e organic sinh học giặt quần áo,
            an toàn cho bé {"\n"}
            {"\n"}Thành phần: {"\n"}- 90% là chế phẩm Enzyme sinh học được ngâm
            ủ và lên men từ vỏ dứa, cam, chanh {"\n"}- 10% là các chất hữu cơ
            tạo bọt lành tính từ thực vật
          </Text>
        </View>

        <Line height={10} color={"#F5F5F5"} />
        <View style={styles.reviewView}>
          <Text style={styles.detailText}>ĐÁNH GIÁ SẢN PHẨM</Text>
          <View style={styles.starView}>{Rating(4)}</View>

          <Line height={2} color={"#F5F5F5"} />
          <AvatarView
            star={4}
            height={20}
            width={20}
            text="Thu"
            color="#293845"
          ></AvatarView>
          <Text style={styles.reviewText}>Sản phẩm chất lượng</Text>
          <View style={styles.imgView}>
            {img.map((items, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.imgItem}
                  onPress={() => {
                    openSettingsModal(img, index);
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
      </ScrollView>
      <Line height={2} color={"#F5F5F5"} />

      <View style={styles.bottomView}>
        <View style={styles.countView}>
          <TouchableOpacity
            style={styles.borderView}
            onPress={() => minus(quantity)}
          >
            {quantity >= 1 ? (
              <MaterialCommunityIcons name="minus" style={styles.iconStyle} />
            ) : (
              <MaterialCommunityIcons name="minus" style={styles.actionIcon} />
            )}
          </TouchableOpacity>
          <Text style={{ fontWeight: "650", fontSize: 16 }}>{quantity}</Text>
          <TouchableOpacity
            style={styles.borderView}
            onPress={() => {
              plus(quantity);
            }}
          >
            <MaterialCommunityIcons name="plus" style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.refillBtn}
          onPress={() => {
            addToCart(product.id);
          }}
        >
          <Text style={styles.refillText}>Đăng kí refill</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  pagingText: { color: "#888", margin: 3 },
  pagingActiveText: { color: "#fff", margin: 3 },

  price: {
    padding: 10,
    paddingBottom: 7,
    fontSize: 17,
  },
  nameText: {
    padding: 10,
  },
  money: { color: "#E8833A", fontWeight: "700" },
  detailText: {
    fontWeight: "700",
    padding: 10,
  },
  brandText: {
    padding: 10,
  },
  typeText: {
    padding: 10,
  },
  brandView: {
    flexDirection: "row",
  },
  brandName: {
    padding: 10,
  },
  typeView: {
    width: 100,
  },
  infoText: {
    padding: 10,
    lineHeight: 18,
  },
  starView: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  shopView: {
    flexDirection: "row",
  },
  saveText: {
    color: "#E8833A",
    fontWeight: "700",
    borderRadius: 3,
  },
  saveBtn: {
    borderColor: "#C3CFD9",
    borderWidth: 1,
  },
  reviewText: { paddingLeft: 40 },
  imgView: {
    flexDirection: "row",
    paddingLeft: 32,
  },
  imgItem: {
    paddingLeft: 8,
  },
  imgStyle: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  bottomView: {
    marginTop: "auto",
    height: "9%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fff",
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  countView: {
    width: 95,
    height: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  borderView: {
    width: 23,
    height: 23,
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: "green",
  },
  actionIcon: { fontSize: 16, fontWeight: "600", color: "#5e6977" },
  refillBtn: {
    width: "60%",
    height: "90%",
    backgroundColor: "green",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  refillText: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#ffff",
  },
});
