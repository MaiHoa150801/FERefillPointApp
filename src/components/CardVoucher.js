import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Btn from './Button';

const CardVoucher = ({
  description,
  expiry_date,
  saved,
  saveVoucher,
  type,
}) => {
  return (
    <View style={styles.voucherView}>
      <View style={styles.voucherViewLeft}>
        <Text style={styles.voucherName}>{description}</Text>
        <Text style={styles.voucherExpiry}>
          {new Date(expiry_date).toLocaleDateString('en-US')}
        </Text>
      </View>
      <View style={styles.voucherViewRight}>
        <Btn
          onPress={saveVoucher}
          disabled={new Date() > new Date(expiry_date) ? true : saved}
          text={
            !saved
              ? 'Lưu'
              : type
              ? 'Đã dùng'
              : new Date() > new Date(expiry_date)
              ? 'Đã hết hạn'
              : 'Đã lưu'
          }
          style={[
            styles.saveBtn,
            { backgroundColor: saved == true ? 'gray' : '#E8833A' },
          ]}
          textStyle={styles.saveText}
        ></Btn>
      </View>
    </View>
  );
};

export default CardVoucher;

const styles = StyleSheet.create({
  voucherView: {
    flexDirection: 'row',
    paddingLeft: 16,
  },
  voucherViewLeft: {
    padding: 10,
    borderColor: '#E8833A',
    borderWidth: 0.7,
    backgroundColor: '#fff2e6',
  },
  voucherViewRight: {
    borderColor: '#E8833A',
    borderBottomWidth: 0.7,
    borderTopWidth: 0.7,
    borderRightWidth: 0.7,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#fff2e6',
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
