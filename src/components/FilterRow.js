import { Image, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import React from 'react';
import { RadioButton } from 'react-native-paper';

export default function FilterRow(props) {
  const { image, data, checked, setChecked, setFilter, name } = props;
  return (
    <View style={[styles.row, styles.line]}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      </View>
      <Text style={styles.txtName}>{name}</Text>
      <RadioButton
        value={name}
        status={checked === name ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(name);
          setFilter(data != undefined ? data : name);
        }}
        color="#DB147F"
      />
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
  line: {
    marginTop: 30,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  txtName: {
    flex: 4,
    fontSize: 20,
  },
});
