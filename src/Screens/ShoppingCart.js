import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Items } from "../mock-data/ProductData";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ShoppingCart = ({ navigation }) => {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get data from local DB by ID
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem("cartItems");
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      Items.forEach((data) => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct(false);
      getTotal(false);
    }
  };

  //get total price of all items in the cart
  const getTotal = (productData) => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].unit_price;

      total = total + productPrice;
    }
    setTotal(total);
  };

  //remove data from Cart

  const removeItemFromCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] == id) {
          array.splice(index, 1);
        }

        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        getDataFromDB();
      }
    }
  };

  //checkout

  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem("cartItems");
    } catch (error) {
      return error;
    }

    ToastAndroid.show("Function comming SOON!", ToastAndroid.SHORT);

    navigation.navigate("ShopDetail");
  };

  const renderProducts = (data, index) => {
    return (
      <TouchableOpacity
        key={data.id}
        onPress={() =>
          navigation.navigate("ProductInfo", { productID: data.id })
        }
        style={{
          width: "100%",
          height: 100,
          marginVertical: 6,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "30%",
            height: 100,

            justifyContent: "center",
            alignItems: "center",

            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#F0F0F3",
            marginRight: 22,
          }}
        >
          <Image
            source={{ uri: data.productImage }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                maxWidth: "100%",
                color: "black",
                fontWeight: "600",
                letterSpacing: 1,
              }}
            >
              {data.name}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: "row",
                alignItems: "center",
                opacity: 0.6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  maxWidth: "85%",
                  marginRight: 4,
                }}
              >
                {data.unit_price}đ
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 23,
                  height: 23,
                  borderRadius: 5,
                  backgroundColor: "rgba(0,0,0,0.06)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 20,
                  padding: 4,
                }}
              >
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "green",
                  }}
                />
              </TouchableOpacity>
              <Text>1</Text>
              <TouchableOpacity
                style={{
                  width: 23,
                  height: 23,
                  borderRadius: 5,
                  backgroundColor: "rgba(0,0,0,0.06)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 20,
                  padding: 4,
                }}
              >
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "green",
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: "#777777",
                  backgroundColor: "#F0F0F3",
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        position: "relative",
      }}
    >
      <ScrollView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 18,
                color: "#777777",
                padding: 12,
                backgroundColor: "#F0F0F3",
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: "#000000",
              fontWeight: "400",
            }}
          >
            Giỏ hàng
          </Text>
          <View></View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          {product ? product.map(renderProducts) : null}
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 40,
              marginBottom: 80,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontWeight: "600",
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              Thông tin đơn hàng
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: "#000000",
                  opacity: 0.5,
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#000000",
                  opacity: 0.8,
                }}
              >
                {total}đ
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 22,
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            ></View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 10,
          height: "8%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => (total != 0 ? checkOut() : null)}
          style={{
            width: "86%",
            height: "90%",
            backgroundColor: "green",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "650",
              letterSpacing: 1,
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            Đặt lịch refill
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShoppingCart;
