import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import AnimatedLoader from 'react-native-animated-loader';
function CentreScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Screen</Text>
    </View>
  );
}
export default CentreScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdc6cf',
    alignItems: 'center',
    marginTop: 20,
  },
});
