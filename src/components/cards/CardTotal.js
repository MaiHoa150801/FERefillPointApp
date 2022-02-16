import { FontAwesome5 } from '@expo/vector-icons';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');
export default function CardTotal(props) {
  const { title, icon, number } = props;
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.row}>
          <FontAwesome5
            style={{ marginRight: 15 }}
            onPress={() => {
              setModalVisible(true);
            }}
            name={icon}
            size={30}
            color="#DB147F"
          />
          <Text style={{ fontSize: 15 }}>{title}</Text>
        </View>
        <View style={styles.numberView}>
          <Text style={styles.numberTxt}>{number}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    width: '94%',
    height: 110,
    marginLeft: '3%',
    marginRight: '1%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  cardContainer: {
    height: 110,
    width: width / 2,
  },
  numberTxt: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  numberView: {
    width: '100%',
    marginTop: 10,
    marginLeft: 40,
    fontSize: 20,
  },
});
