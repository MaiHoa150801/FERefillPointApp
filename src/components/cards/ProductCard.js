import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const ProductCard = () => {
  return (
    <View style={styles.productView}>
      <View style={styles.productItemView}>
        <Image
          style={styles.productStyle}
          source={{
            uri: "https://cf.shopee.vn/file/03c4e055b7fea58f17224da588f415c2",
          }}
          resizeMode="cover"
        />
        <Text style={styles.nameProduct}>
          Refill nước giặt hữu cơ Fuwa3e oragnic sinh học
        </Text>
        <Text style={styles.price}>10.000đ/100ml</Text>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productItemView: {
    width: "47%",
    height: 280,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "white",
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
//   productView: {
//     flex: 1,
//     flexDirection: "row",
//   },
});
