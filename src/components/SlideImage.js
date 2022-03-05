import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import ViewSlider from 'react-native-view-slider';

const { width, height } = Dimensions.get('window');

export default function Slide({ images, auto }) {
  return (
    <>
      <ViewSlider
        renderSlides={
          <>
            {images &&
              images.map((e, index) => {
                return (
                  <View style={styles.viewBox} key={index}>
                    <Image
                      source={{
                        uri: e,
                      }}
                      style={{ width: width, height: 250 }}
                    />
                  </View>
                );
              })}
          </>
        }
        style={styles.slider}
        height={200}
        slideCount={4}
        dots={true}
        dotActiveColor="green"
        dotInactiveColor="white"
        autoSlide={auto}
        dotsContainerStyle={styles.dotContainer}
        slideInterval={2000}
      />
    </>
  );
}

const styles = StyleSheet.create({
  viewBox: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    width: width,
    padding: 10,
    alignItems: 'center',
    height: 150,
  },
  slider: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dotContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 15,
  },
});
