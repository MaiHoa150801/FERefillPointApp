import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const ProductCard = ({ data }) => {
  return (
    <View style={styles.productItemView}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetail", { productID: data.id })
        }
      >
        <Image
          style={styles.productStyle}
          source={data.productImage}
          resizeMode="cover"
        />
        <Text style={styles.nameProduct}>{data.name}</Text>
        <Text style={styles.price}>{data.unit_price}đ/100ml</Text>
      </TouchableOpacity>
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
