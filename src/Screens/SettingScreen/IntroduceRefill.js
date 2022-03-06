import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import AutoScroll from "@homielab/react-native-auto-scroll";
export default function IntroduceRefill() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.title}>
          <View style={styles.line}></View>
          <Entypo
            style={styles.iconTitle}
            name="leaf"
            size={30}
            color="green"
          />
          <View style={styles.line}></View>
        </View>

        <AutoScroll>
          <Text style={styles.textTitle}>THIẾT LÝ HOẠT ĐỘNG</Text>
        </AutoScroll>
        <View style={styles.line2}>
          <View style={styles.line1}></View>
          <View style={styles.line1}></View>
        </View>

        <Text style={styles.text1}>
          Chúng tôi tin rằng sự ghi nhận và tri ân cộng đồng là động lực khuyến
          khích mỗi cá nhân xanh hơn 1% mỗi ngày.
        </Text>
        <Image
          style={styles.image}
          source={{
            uri: "http://thanhphoxanh.vn/uploads/thanhphoxanh/news/2018/11/21/a10b4fbdf83124db163bdf4f20318779.jpeg",
          }}
        ></Image>
        <Button
          style={styles.btn}
          onPress={null}
          title="SỨ MỆNH"
          color="green"
          size={30}
          //   accessibilityLabel="Learn more about this purple button"
        />
        <Text style={styles.text2}>
          Refill kết nối những hoạy động xanh thôi thúc mỗi người hành động xanh
          hôm nay, từ đó "nhân đôi" hiệu ứng xanh và lan tỏa trong cộng đồng .
        </Text>
        <Button
          style={styles.btn}
          onPress={null}
          title="MÔ TẢ TÍNH NĂNG"
          color="green"
          //   accessibilityLabel="Learn more about this purple button"
        />
        <Text style={styles.text2}>
          Với phiên bản hiện tại, bạn có thể dễ dàng: mời bạn bè tham gia, cùng
          nhận điểm GP hấp dẫn; tặng điểm cho ai đó để tri ân nổ lực sống xanh
          của họ; ủng hộ điểm GP cho các dự án cộng đồng; và đổi lấy GP lấy
          những món quà xanh, tự thưởng cho chính mình.
        </Text>
        <Button
          style={styles.btn}
          onPress={null}
          title="HỖ TRỢ"
          color="green"
          //   accessibilityLabel="Learn more about this purple button"
        />
        <Text style={styles.text2}>
          Refill đang lớn và nổ lực từng ngày. Nếu bạn gặp khó khăn trong quá
          trình sử dụng app, xin hãy kiên nhẫn và thông báo cho chúng tôi qua
          email: vile22@gmail.com.
        </Text>
        <LinearGradient
          colors={["#c0392b", "#f1c40f", "#8e44ad"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <TouchableOpacity>
            <Text style={styles.buttonText}>TRẢI NGHIỆM NGAY</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
  },
  title: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  line: {
    height: 1,
    width: 120,
    backgroundColor: "black",
  },
  iconTitle: {
    marginHorizontal: 20,
  },
  textTitle: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
    color: "green",
  },
  line2: {
    marginHorizontal: 7,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  line1: {
    height: 1,
    width: 120,
    backgroundColor: "black",
  },
  text1: {
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 16,
    fontStyle: "italic",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 15,
  },
  //   btn: {
  //     fontSize: 20,
  //   },
  text2: {
    marginVertical: 10,
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
});
