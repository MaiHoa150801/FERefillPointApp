import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
export default function ShowListImageRow(props) {
  const { listImage, openModalImage } = props;
  const [full, setFull] = useState(false);
  return (
    <View style={[styles.listImage, styles.row]}>
      {listImage.map((e, index) => {
        let imageFinal;
        if (index == 3 && listImage.length != 4) {
          return;
        }
        if (listImage.length >= 4 && index >= 4) {
          imageFinal = (
            <TouchableNativeFeedback onPress={() => openModalImage()}>
              <View style={styles.imageOp}>
                <Text style={styles.textAb}>+{listImage.length - 4}</Text>
              </View>
            </TouchableNativeFeedback>
          );
        }
        return (
          <View style={styles.imageView} key={index}>
            <Image style={styles.image} source={{ uri: e }} />
            {imageFinal}
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  line: {
    height: 10,
  },
  listImage: {
    marginTop: 20,
  },
  textAb: {
    fontSize: 30,
    color: 'white',
  },
  imageOp: {
    position: 'absolute',
    height: 70,
    backgroundColor: '#2D1F21',
    width: '100%',
    marginLeft: 5,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 70,
    borderRadius: 8,
  },
  imageView: {
    width: '25%',
    padding: 5,
    justifyContent: 'center',
  },
});
