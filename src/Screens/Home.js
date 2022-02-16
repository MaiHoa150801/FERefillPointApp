import { View, StyleSheet, Text } from 'react-native';

function Home() {
  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
    </View>
  );
}

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
