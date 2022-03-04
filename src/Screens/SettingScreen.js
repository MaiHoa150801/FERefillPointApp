import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function SettingScreen({ navigation, navigation: { goBack } }) {
  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#ffff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          height: 50,
          marginTop: 10,
          borderBottomWidth: 0.5,
        }}
      >
        <Ionicons
          style={{ marginLeft: 20 }}
          name="arrow-back"
          size={25}
          // color={"#c75058"}
          onPress={() => goBack()}
        />
        <Text
          style={{
            fontSize: 25,
            color: "#eeeee",
            marginLeft: 100,
          }}
        >
          Setting
        </Text>
      </View>

      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("ChangePassword")}
      >
        <Ionicons name="finger-print" size={45} color={"#c75058"} />
        <View style={styles.userName}>
          <Text style={styles.Text}>Đổi mật khẩu</Text>
        </View>
        <View style={styles.iconArrow}>
          <Ionicons name="chevron-forward-sharp" size={20} color={"black"} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons name="md-people" size={45} color={"#5bc750"} />
        <View style={styles.userName}>
          <Text style={styles.Text}>Đổi thông tin cá nhân</Text>
        </View>
        <View style={styles.iconArrow}>
          <Ionicons name="chevron-forward-sharp" size={20} color={"black"} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("")}
      >
        <Ionicons name="leaf" size={45} color={"#5bc750"} />
        <View style={styles.userName}>
          <Text style={styles.Text}>Qùa xanh của tôi</Text>
        </View>
        <View style={styles.iconArrow}>
          <Ionicons name="chevron-forward-sharp" size={20} color={"black"} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("")}
      >
        <Ionicons name="hand-left" size={45} color={"#5bc750"} />
        <View style={styles.userName}>
          <Text style={styles.Text}>Gioi thiệu quà xanh</Text>
        </View>
        <View style={styles.iconArrow}>
          <Ionicons name="chevron-forward-sharp" size={20} color={"black"} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons name="exit-outline" size={45} color={"#ACB2B8"} />
        <View style={styles.userName}>
          <Text style={styles.Text}>Đăng xuất</Text>
        </View>
        <View style={styles.iconArrow}>
          <Ionicons name="chevron-forward-sharp" size={20} color={"black"} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    paddingVertical: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingLeft: 16,
  },
  iconArrow: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 5,
  },
  userName: {
    paddingLeft: 16,
    flexDirection: "column",
  },
  Text: {
    fontWeight: "700",
    fontSize: 16,
    color: "#171725",
    marginLeft: 10,
  },
});
