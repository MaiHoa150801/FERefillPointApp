import { View, StyleSheet, Text } from "react-native";
import Btn from "../components/Button";
function GreenMapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>GreenMap</Text>
      <Btn
        text="View Shop1"
        onPress={() => navigation.navigate("ShopDetail")}
      ></Btn>
    </View>
  );
}

export default GreenMapScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
