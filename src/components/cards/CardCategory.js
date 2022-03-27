import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const CardCategory = ({ img, category }) => (
  <TouchableOpacity style={styles.categoryView}>
    <Image
      style={styles.img}
      source={{
        uri: img,
      }}
      resizeMode="cover"
    />
    <Text style={styles.categoryText}>{category}</Text>
  </TouchableOpacity>
);
export default CardCategory;

const styles = StyleSheet.create({
  img: {
    height: 60,
    width: 60,
    resizeMode: "cover",
    borderRadius: 10,
  },
  categoryView: {
    alignItems: "center",
    padding: 10,
    marginLeft: -10,
  },
  categoryText: {
    padding: 5,
  },
});
