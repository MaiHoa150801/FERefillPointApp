import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AvatarView = () => {
  return (
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
  );
};

export default AvatarView;

const styles = StyleSheet.create({
  avatarView: {
    flexDirection: "row",
    padding: 16,
  },
  avatarStyle: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  nameShop: {
    paddingLeft: 16,
  },
  nameText: {
    fontWeight: "700",
    color: "black",
  },
  ratingView: {
    backgroundColor: "transparent",
  },
});
