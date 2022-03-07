import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import React from "react";
import Btn from "../../components/Button";
export default function Profile() {
  return (
    <View style={{ marginTop: 40 }}>
      <ImageProfile />
      <InputProfile />
      <View style={{ alignItems: "center" }}>
        <Btn
          text="Cập Nhật"
          textStyle={styles.textStyle}
          onPress={null}
          style={styles.btnCapNhat}
        />
      </View>
    </View>
  );
}
const ImageProfile = () => (
  <View style={{ alignItems: "center", marginBottom: 30 }}>
    <Image
      source={{
        uri: "https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png",
      }}
      style={{ width: 90, height: 80, resizeMode: "contain" }}
    />
    <Text>Bổ sung thông tin cá nhân</Text>
    <Text>Để sử dụng đầy đủ các tính năng</Text>
  </View>
);

const InputProfile = () => (
  <View style={{ marginHorizontal: 30 }}>
    <View style={styles.input}>
      <Text style={styles.label}>HO TEN</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        defaultValue="Lê Ngọc Vĩ"
      />
    </View>
    <View style={styles.input}>
      <Text style={styles.label}>DỊA CHỈ CƯ TRÚ(Tỉnh /Thành phố)</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        defaultValue="Đà Nẵng"
      />
    </View>
    <View style={styles.input}>
      <Text style={styles.label}>DỊA CHỈ CƯ TRÚ(Quận/ Huyện)</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        defaultValue="Sơn Trà"
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  textStyle: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  btnCapNhat: {
    backgroundColor: "#50c75b",
    padding: 10,
    borderRadius: 10,
    width: "80%",
    marginTop: 20,
  },
});
