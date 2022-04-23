import { StyleSheet, Image } from 'react-native';
import React from 'react';
import IconStarFill from '../../assets/icons/ic-star-fill.png';
import IconStar from '../../assets/icons/ic-star.png';
const Rating = (n) => {
  let i = 0;
  let stars = [];
  let surplus = n % 1;
  n = Math.floor(n / 1);
  while (i < n) {
    stars.push(
      <Image
        key={Math.random()}
        source={IconStarFill}
        style={styles.reviewItemStar}
      />
    );
    i++;
  }
  if (surplus) {
    stars.push(
      <Image key="ff" source={IconStar} style={styles.reviewItemStar} />
    );
  }
  n = 5 - n;
  i = surplus ? 1 : 0;
  while (i < n) {
    i++;
    stars.push(
      <Image
        key={Math.random()}
        source={IconStar}
        style={styles.reviewItemStar}
      />
    );
  }
  return stars;
};

export default Rating;

const styles = StyleSheet.create({
  reviewItemStar: {
    width: 14,
    height: 14,
    marginRight: 2,
    resizeMode: 'contain',
  },
});
