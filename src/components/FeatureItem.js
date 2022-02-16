import { getDatabase, ref, update } from 'firebase/database';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import Switch from './Switch';

const FeatureItem = ({ data, index, idCentre }) => {
  const { name, status, icon } = data;
  const onChangeStatus = async (status) => {
    try {
      const url = `Centres/${idCentre}/features/${index}`;
      const db = getDatabase();
      const reference = await ref(db, url);
      update(reference, {
        status: status == 'on' ? 'off' : 'on',
      });
    } catch (error) {}
  };
  return (
    <View style={[styles.container, styles.row]}>
      <View style={styles.row}>
        <FontAwesome name={icon} style={styles.icon} />
        <Text style={styles.text}>{name}</Text>
      </View>
      <Switch
        defaultStatus={status === 'on' ? true : false}
        onClick={() => onChangeStatus(status)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#2D1F21',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '400',
  },
  icon: {
    fontSize: 22,
    color: '#5C595A',
    marginRight: 10,
  },
});

export default FeatureItem;
