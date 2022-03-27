import { TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../global/styles";
const NavigateTabHome = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.rowItem} onPress={onPress}>
      <FontAwesome name={icon} size={30} color="rgb(18, 136, 58)" />
      <Text numberOfLines={2} style={styles.txtRow}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default NavigateTabHome;

const styles = StyleSheet.create({
  rowItem: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "25%",
  },
  txtRow: {
    textAlign: "center",
    fontSize: 12,
    color: "rgb(18, 136, 58)",
  },
});
