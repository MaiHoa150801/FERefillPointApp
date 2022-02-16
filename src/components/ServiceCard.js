import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  MaterialCommunityIcons,
  MaterialIcons,
} from 'react-native-vector-icons';

const ServiceCard = ({ data }) => {
  const { icon, name, price, time } = data;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <MaterialIcons name={icon} style={styles.icon} />
        </View>
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.text}>{time}</Text>
          <Text style={styles.text}>
            <Text style={styles.price}>${price}</Text> / full day
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#F2F0F0',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  title: {
    color: '#2D1F21',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 24,
    marginVertical: 5,
  },
  icon: {
    fontSize: 25,
    color: '#DB147F',
    backgroundColor: '#FFF0FB',
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 5,
  },
  text: {
    color: '#2D1F21',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '400',
  },
  price: {
    fontWeight: '700',
  },
});
