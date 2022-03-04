import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Btn from "../components/Button";
import { FontAwesome, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../global/styles";

export default function GreenComunity({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Cộng đồng cùng hành động</Text>
        <Btn
          text="Đăng"
          textStyle={styles.textStyle}
          onPress={() => navigation.navigate("Post")}
          style={styles.btnCapNhat}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.greenComunity}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome
              style={styles.iconComunity}
              name="user-circle-o"
              size={25}
            />
            <Text style={styles.name}>Lê Ngọc Vĩ</Text>
          </View>
          <Text>
            Browse to node_modules/react-native-vector-icons and drag the folder
            Fonts (or just the ones you want) to your project in Xcode. Make
            sure your app is checked
          </Text>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStXScZh9DbfNTojRxiP9lljH9LDqtL4TB-EQ&usqp=CAU",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 30,
              marginTop: 15,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <AntDesign style={{ marginRight: 10 }} name="like1" size={20} />
              <Text style={styles.text1}>Like</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5
                style={{ marginRight: 10 }}
                name="comment"
                size={20}
              />
              <Text style={styles.text1}>Comment</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome style={{ marginRight: 10 }} name="share" size={20} />
              <Text style={styles.text1}>Share</Text>
            </View>
          </View>
        </View>
        <View style={{ marginLeft: 20, marginBottom: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome
              style={{ marginRight: 20 }}
              name="user-circle-o"
              size={25}
            />
            <Text style={styles.name}>Nguyễn Thị Thu</Text>
          </View>
          <Text>
            Browse to node_modules/react-native-vector-icons and drag the folder
            Fonts (or just the ones you want) to your project in Xcode. Make
            sure your app is checked
          </Text>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_aUgwjRNFXDuHf46c2Hetd9LWHy5hfR94mqcLsLqRB1ggrUOJqOQU1mb51J06yPKf00&usqp=CAU",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 30,
              marginTop: 15,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <AntDesign style={{ marginRight: 10 }} name="like1" size={20} />
              <Text style={styles.text1}>Like</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5
                style={{ marginRight: 10 }}
                name="comment"
                size={20}
              />
              <Text style={styles.text1}>Comment</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <FontAwesome style={{ marginRight: 10 }} name="share" size={20} />
              <Text style={styles.text1}>Share</Text>
            </View>
          </View>
        </View>
        <View style={{ marginLeft: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome
              style={{ marginRight: 20 }}
              name="user-circle-o"
              size={25}
            />
            <Text style={styles.name}>Lê Thị Mai Hoa</Text>
          </View>
          <Text>
            Browse to node_modules/react-native-vector-icons and drag the folder
            Fonts (or just the ones you want) to your project in Xcode. Make
            sure your app is checked
          </Text>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDoqKiBFcK-frBcF9uoG3TYAS56rPMhiRiOg&usqp=CAU",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 30,
              marginTop: 15,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <AntDesign style={{ marginRight: 10 }} name="like1" size={20} />
              <Text style={styles.text1}>Like</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5
                style={{ marginRight: 10 }}
                name="comment"
                size={20}
              />
              <Text style={styles.text1}>Comment</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <FontAwesome style={{ marginRight: 10 }} name="share" size={20} />
              <Text style={styles.text1}>Share</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    margin: 8,
  },
  greenComunity: {
    marginLeft: 20,
    marginBottom: 20,
    backgroundColor: "#eee",
  },
  iconComunity: {
    marginRight: 20,
  },
  text: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 20,
    marginLeft: 10,
    alignContent: "center",
  },
  textStyle: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },

  btnCapNhat: {
    backgroundColor: "#3366CC",
    padding: 10,
    borderRadius: 10,
    width: 80,
  },
  text1: {
    fontSize: 18,
    // fontWeight: "bold",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tinyLogo: {
    width: 350,
    height: 200,
    marginTop: 10,
  },
});
