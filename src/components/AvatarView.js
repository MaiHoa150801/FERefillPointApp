import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Rating from './Rating';
import { Ionicons } from '@expo/vector-icons';

const AvatarView = ({ star, width, height, color, imageShop, nameShop }) => {
  return (
    <View style={styles.avatarView}>
      <Image
        style={{
          width: width,
          height: height,
          borderRadius: 25,
        }}
        source={{
          uri: imageShop,
        }}
      />
      <View style={styles.nameShop}>
        <Text
          style={{
            fontWeight: '700',
            color: color,
            fontSize: 16,
          }}
        >
          {nameShop}
        </Text>

        <View style={styles.starView}>{Rating(star)}</View>
      </View>
    </View>
  );
};

export default AvatarView;

const styles = StyleSheet.create({
  avatarView: {
    flexDirection: 'row',
    padding: 16,
    // marginLeft: 16,
  },

  nameShop: {
    paddingLeft: 10,
  },

  starView: {
    flexDirection: 'row',
  },
  locationView: {
    flexDirection: 'row',
    paddingLeft: 3,
  },
});
