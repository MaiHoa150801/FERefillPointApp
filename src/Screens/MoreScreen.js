import { View, StyleSheet, Text } from 'react-native';
function MoreScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>More Screen</Text>
    </View>
  );
}
export default MoreScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
  },
});
