import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Items } from "../../mock-data/ProductData";
import ShoppingCard from "../../components/cards/ShoppingCard";
import HeaderShoppingCart from "../../components/HeaderShoppingCart";

const Booking = ({ navigation }) => {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);
  const [checked, setChecked] = useState(0);
  const [edit, setEdit] = useState(null);
  const [name, setName] = useState("Nguyễn Thị Thu");
  const [phone, setPhone] = useState("0332281124");
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

  //checkout

  const checkOut = async () => {
    // try {
    //   await AsyncStorage.removeItem("cartItems");
    // } catch (error) {
    //   return error;
    // }

    // ToastAndroid.show("Function comming SOON!", ToastAndroid.SHORT);

    navigation.navigate("Booking");
  };

  const radioBtnsData = ["Nhận tại cửa hàng", "Giao tận nơi"];

  const dropDownEdit = () => {
    if (edit == null) {
      setEdit(true);
    }
  };

  const isChecked = () => {
    if (checked == 0) {
      setChecked(1);
    }
    if (checked == 1) {
      setChecked(0);
    }
  };

  //textinput dropdown
  const [filterBankList, setFilterBankList] = useState([]);
  const [bankName, setBankName] = useState("");

  const filterBanks = (value) => {
    let filterData =
      bankList && bankList?.length > 0
        ? bankList?.filter((data) =>
            data?.bank?.toLowerCase()?.includes(value?.toLowerCase())
          )
        : [];
    setFilterBankList([...filterData]);
  };

  const onBankSelected = (value) => {
    setBankName(value);
    setFilterBankList([]);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <HeaderShoppingCart name={"Đơn hàng"}></HeaderShoppingCart>
          <ScrollView>
            <View
              style={{
                backgroundColor: "#F5F5F5",
                paddingHorizontal: 16,
                marginTop: 10,
              }}
            >
              {product ? product.map(ShoppingCard) : null}
            </View>
            <View style={styles.customerInfo}>
              <Text>THÔNG TIN KHÁCH HÀNG</Text>
              {edit ? null : (
                <View style={styles.nameCustomerView}>
                  <Text>Nguyễn Thị Thu</Text>
                  <Text> - 0332281124</Text>
                  <TouchableOpacity onPress={() => dropDownEdit()}>
                    <Text style={styles.editText}>Sửa</Text>
                  </TouchableOpacity>
                </View>
              )}

              {edit ? (
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Họ và Tên"
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={setPhone}
                    value={phone}
                    placeholder="Số điện thoại"
                    keyboardType="numeric"
                  />
                </View>
              ) : null}
            </View>
            <View style={styles.customerInfo}>
              <Text>CHỌN CÁCH THỨC NHẬN HÀNG</Text>
              <View style={styles.radioView}>
                {radioBtnsData.map((data, key) => {
                  return (
                    <View key={key}>
                      {checked == key ? (
                        <TouchableOpacity
                          onPress={() => {
                            isChecked();
                          }}
                          style={styles.btn}
                        >
                          <Image
                            style={styles.img}
                            source={require("./img/ic_radio_button_on.png")}
                          />
                          <Text>{data}</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            isChecked();
                          }}
                          style={styles.btn}
                        >
                          <Image
                            style={styles.img}
                            source={require("./img/ic_radio_button_off.png")}
                          />
                          <Text>{data}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
            {checked == 1 ? (
              <View style={styles.detailView}>
                <Text>Kiểm tra địa chỉ giao hàng
                </Text>
                <TextInput
                  value={bankName}
                  placeholder={"y"}
                  style={styles.textInput}
                  onChangeText={filterBanks}
                />
                <FlatList
                  data={filterBankList}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => onBankSelected(item?.bank)}
                    >
                      <VariantsBox>
                        <Text>{item?.bank || ""}</Text>
                      </VariantsBox>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.bank}
                />
              </View>
            ) : null}
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
                  fontWeight: "600",
                  letterSpacing: 1,
                  color: "#ffffff",
                  textTransform: "uppercase",
                }}
              >
                Đặt hàng
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Booking;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // childContainer: {
  //   height: "99%",
  // },
  customerInfo: {
    marginLeft: 16,
    marginTop: 16,
  },
  nameCustomerView: {
    flexDirection: "row",
  },
  nameCustomerText: {
    fontWeight: "700",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    position: "relative",
  },

  editText: {
    color: "#699EE5",
    paddingLeft: 16,
  },
  input: {
    height: 40,
    marginTop: 12,
    marginRight: 16,
    borderWidth: 1,
    padding: 10,
    borderColor: "#D1D1D1",
    borderRadius: 5,
    width: "45%",
  },
  inputView: {
    flexDirection: "row",
    width: "100%",
  },
  radioView: {
    flexDirection: "row",
    paddingTop: 10,
  },
  img: {
    height: 20,
    width: 20,
    marginRight: 3,
  },
  btn: {
    flexDirection: "row",
    paddingRight: 40,
  },
  detailView: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,

    borderColor: "#E1E1E1",
  },
});
