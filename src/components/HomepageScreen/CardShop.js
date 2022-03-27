import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const CardShop = ({ img, name, address, key }) => (
  <TouchableOpacity style={styles.shopView}>
    <Image
      key={key}
      style={styles.imgShop}
      source={{
        uri: img,
      }}
      resizeMode="cover"
    />
    <View style={styles.infoShop}>
      <Text style={styles.txtName}>{name}</Text>
      <Text style={styles.txtAdress}>{address}</Text>
    </View>
  </TouchableOpacity>
);

export default CardShop;

const styles = StyleSheet.create({
  shopView: {
    margin: 10,
    width: "44%",
    flexDirection: "column",
    height: 175,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  imgShop: {
    height: 110,
    width: "100%",
    resizeMode: "cover",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  infoShop: {
    padding: 5,
  },
  txtAdress: {
    fontSize: 12,
    color: "#757575",
  },

  txtName: {
    color: "green",
  },
});
