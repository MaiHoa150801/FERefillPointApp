import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../global/styles";
import { auth } from "../../firebase";
const HeaderHome = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = () => {
    setUser(auth.currentUser);
  };
  return (
    <>
      {user && (
        <View style={styles.container}>
          <Image
            width={60}
            height={60}
            style={styles.image}
            source={{
              uri: user.photoURL
                ? user.photoURL
                : "https://icon-library.com/images/icon-material/icon-material-12.jpg",
            }}
          />
          <View style={styles.title}>
            <Text style={styles.txtTitle}>{user.displayName}</Text>
            <Text style={styles.txtTitle}>100 RP</Text>
          </View>
          <View style={styles.bell}>
            {/* <FontAwesome name="bell" size={35} color={colors.grey2} /> */}
            <FontAwesome
              name="bell"
              size={35}
              color={"rgba(254, 254, 254, 0.9)"}
            />
          </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingLeft: 20,
    padding: 10,
    // backgroundColor: "#6699FF",
    backgroundColor: "#01803D",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
    borderWidth: 1,
    borderColor: "rgba(254, 254, 254, 0.9)",
  },
  title: {
    justifyContent: "center",
  },
  bell: {
    marginLeft: "auto",
    marginRight: 10,
  },
  txtTitle: {
    fontSize: 15,
    color: "rgba(254, 254, 254, 0.9)",
  },
});

export default HeaderHome;
