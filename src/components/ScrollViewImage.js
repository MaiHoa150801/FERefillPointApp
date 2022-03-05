import React from 'react';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const imageWidth = screenWidth / 3;
const ScrollViewImage = ({ listImage }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainerStyle}
      horizontal
      // pagingEnabled
      showsHorizontalScrollIndicator={false}
    >
      {listImage.map((e, index) => {
        return (
          <View
            key={index}
            style={[styles.imageView, { marginLeft: index == 0 ? 10 : 0 }]}
          >
            <Image
              source={e}
              style={{ width: imageWidth - 65 }}
              resizeMode="contain"
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ScrollViewImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  navBar: {
    width: '100%',
    height: 70,
    backgroundColor: '#0D0D0D',
    alignContent: 'center',
    justifyContent: 'center',
  },
  navBarTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  imageView: {
    borderWidth: 1,
    borderColor: 'rgb(18, 136, 58)',
    width: imageWidth - 20,
    marginRight: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainerStyle: {
    height: 70,
    justifyContent: 'space-between',
  },
});
