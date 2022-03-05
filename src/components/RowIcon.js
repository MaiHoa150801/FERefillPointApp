import React from 'react';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../global/styles';
export default function RowIcon({ icon, text, style }) {
  return (
    <View style={[styles.row, style]}>
      <FontAwesome name={icon} size={20} style={styles.icon} />
      <Text style={styles.description}>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  description: {
    color: 'black',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  icon: {
    color: colors.grey4,
    marginRight: 10,
  },
});
