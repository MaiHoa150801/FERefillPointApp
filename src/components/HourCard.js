import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

const HourCard = (props) => {
  const { type, setType, typeHour, data } = props;
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => setType(typeHour, 'mon-fri')}>
          <Text style={[styles.day, type == 'mon-fri' ? styles.active : {}]}>
            Mon - Fri
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setType(typeHour, 'sat')}>
          <Text style={[styles.day, type == 'sat' ? styles.active : {}]}>
            Sat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setType(typeHour, 'sun')}>
          <Text style={[styles.day, type == 'sun' ? styles.active : {}]}>
            Sun
          </Text>
        </TouchableOpacity>
      </View>
      {data && !data.length && (
        <View style={styles.row}>
          <View style={styles.childrenCard}>
            <Text style={styles.text}>Morning</Text>

            <View style={styles.row}>
              <Text style={[styles.text, styles.hour]}>
                {data.morning.from}
              </Text>
              <View style={styles.space} />
              <Text style={[styles.text, styles.hour]}>{data.morning.to}</Text>
            </View>
          </View>

          <View style={styles.space} />

          <View style={styles.childrenCard}>
            <Text style={styles.text}>Afternoon</Text>
            <View style={styles.row}>
              <Text style={[styles.text, styles.hour]}>
                {data.afternoon.from}
              </Text>
              <View style={styles.space} />
              <Text style={[styles.text, styles.hour]}>
                {data.afternoon.to}
              </Text>
            </View>
          </View>
        </View>
      )}
      {data && data.length && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.txtType}>{data}</Text>
        </View>
      )}
    </View>
  );
};

export default HourCard;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#F2F0F0',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  childrenCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#F2F0F0',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
  },
  day: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    color: '#857E7F',
    lineHeight: 24,
    fontSize: 14,
    fontWeight: 'bold',
  },
  active: {
    color: '#fff',
    backgroundColor: '#DB147F',
  },
  text: {
    color: '#2D1F21',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '400',
  },
  hour: {
    backgroundColor: '#E9F4FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  space: {
    width: 4,
  },
  txtType: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#DB147F',
  },
});
