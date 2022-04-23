import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Line from './Line';

const ViewColumnIconText = ({ icon, text }) => {
  return (
    <View style={styles.container}>
      <FontAwesome5 name={icon} size={30} color="#222222"></FontAwesome5>
      <Line height={10} />
      <Text style={styles.txt}>{text}</Text>
    </View>
  );
};

export default ViewColumnIconText;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: '#222222',
  },
});
