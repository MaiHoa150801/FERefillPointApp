import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Rating from "./Rating";
import { Ionicons } from "@expo/vector-icons";

const AvatarView = ({ star, width, height, color, text }) => {
  return (
    <View style={styles.avatarView}>
      <Image
        style={{
          width: width,
          height: height,
          borderRadius: 25,
        }}
        source={{
          uri: "https://images.unsplash.com/photo-1565573349860-cbf26ef3f40f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJvc2UlMjBmbG93ZXJ8ZW58MHx8MHx8&w=1000&q=80",
        }}
      />
      <View style={styles.nameShop}>
        <Text
          style={{
            fontWeight: "700",
            color: color,
            fontSize: 16,
          }}
        >
          {text}
        </Text>

        <View style={styles.starView}>{Rating(star)}</View>
      </View>
    </View>
  );
};

export default AvatarView;

const styles = StyleSheet.create({
  avatarView: {
    flexDirection: "row",
    padding: 10,
    // marginLeft: 16,
  },

  nameShop: {
    paddingLeft: 10,
  },

  starView: {
    flexDirection: "row",
  },
  locationView: {
    flexDirection: "row",
    paddingLeft: 3,
  },
});
