import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Btn from './Button';

const CardVoucherUse = ({ description, expiry_date, saved, saveVoucher }) => {
  return (
    <View style={styles.voucherView}>
      <View
        style={[
          styles.voucherViewLeft,
          {
            borderColor: saved == true ? 'rgb(18, 136, 58)' : '#E8833A',
          },
        ]}
      >
        <Text style={styles.voucherName}>{description}</Text>
        <Text style={styles.voucherExpiry}>
          {new Date(expiry_date).toLocaleDateString('en-US')}
        </Text>
      </View>
      <View
        style={[
          styles.voucherViewRight,
          { backgroundColor: saved == true ? '#83C75D' : '#fff2e6' },
        ]}
      >
        <Btn
          onPress={saveVoucher}
          text={saved ? 'X' : 'Chọn'}
          style={[
            styles.saveBtn,
            {
              backgroundColor: saved == true ? 'rgb(18, 136, 58)' : '#E8833A',
            },
          ]}
          textStyle={styles.saveText}
        ></Btn>
      </View>
    </View>
  );
};

export default CardVoucherUse;

const styles = StyleSheet.create({
  voucherView: {
    flexDirection: 'row',
    paddingLeft: 16,
  },
  voucherViewLeft: {
    padding: 10,
    borderWidth: 0.7,
  },
  voucherViewRight: {
    borderColor: '#E8833A',
    borderBottomWidth: 0.7,
    borderTopWidth: 0.7,
    borderRightWidth: 0.7,
    padding: 10,
    justifyContent: 'center',
  },
  saveBtn: {
    borderRadius: 10,
  },
  saveText: {
    padding: 5,
    paddingHorizontal: 20,
    color: 'white',
    fontWeight: '700',
    borderRadius: 3,
  },
  voucherName: {
    color: '#E8833A',
    fontWeight: '700',
    fontSize: 16,
  },
  voucherLimited: {
    color: '#E8833A',
    fontWeight: '700',
  },
  voucherExpiry: {
    color: '#6F7D89',
    fontWeight: '600',
  },
});
