import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Btn from "../components/Button";
import { EvilIcons, Fontisto } from "@expo/vector-icons";
import { colors } from "../global/styles";
export const posts = [
  {
    id: 1,
    avatar:
      "https://zilo.vn/wp-content/uploads/2021/12/Anh-avatar-dep-cho-con-trai-24.jpg",
    name: "Lê Ngọc Vĩ",
    description: "Môi trường ô nhiễm phá tan cuộc sống yên bình của bạn. ",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdxqHCNWfAtr5JAPtoELiYwValY2xux8bNsA&usqp=CAU",
    like: 550,
    share: 10,
  },
  {
    id: 2,
    avatar: "https://meta.vn/Data/image/2022/01/06/avatar-tiktok-6.jpg",
    name: "Nguyễn Văn Sỷ",
    description: "Khí nhà kính đang tước đi oxy của chúng ta.",
    image: "https://tuyengiao.vn/Uploads/2022/1/12/25/BVMT.jpg",
    like: 550,
    share: 10,
  },
  {
    id: 3,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiRlWgTVuvIaj0yHXM0WuV8pzme76jwhUAng&usqp=CAU",
    name: "Nguyễn Thị Thu",
    description: "Già trẻ gái trai, một lòng vì môi trường sạch.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTDcV6b1TuO7Vn1LseXfLgOcsJ_nMyOTROiw&usqp=CAU",
    like: 550,
    share: 10,
  },
  {
    id: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO7ExGvwOs_W1gD9OMQUjeGLkgijkYiT_xpA&usqp=CAU",
    name: "Lê Thị Mai Hoa",
    description: "Tất cả vì môi trường xanh sạch đẹp.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUXutrWmgPVn3t_SwvevoGTAu2wwNGtyIpRg&usqp=CAU",
    like: 550,
    share: 10,
  },
];
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
        {posts.map((post, index) => (
          <View style={styles.greenComunity} key={index}>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  marginRight: 10,
                  borderRadius: 20,
                }}
                source={{
                  uri: post.avatar,
                }}
              />
              <Text style={styles.name}>{post.name}</Text>
            </View>
            <Text style={styles.textDescription}>{post.description}</Text>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: post.image,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // marginRight: 30,
                marginTop: 15,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <EvilIcons style={{ marginRight: 8 }} name="like" size={30} />
                <Text style={styles.text1}>Like</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <EvilIcons
                  style={{ marginRight: 8 }}
                  name="comment"
                  size={30}
                />
                <Text style={styles.text1}>Comment</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Fontisto style={{ marginRight: 8 }} name="share-a" size={20} />
                <Text style={styles.text1}>Share</Text>
              </View>
            </View>
          </View>
        ))}
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
    margin: 10,
  },
  greenComunity: {
    // marginLeft: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#eee",
  },
  iconComunity: {
    marginRight: 20,
  },
  text: {
    color: "#48ad34",
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
    backgroundColor: "#48ad34",
    padding: 10,
    borderRadius: 10,
    width: 80,
  },
  text1: {
    fontSize: 16,
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
  textDescription: {
    fontSize: 16,
  },
});
