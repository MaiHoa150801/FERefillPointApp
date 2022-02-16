import React from 'react';
import { View } from 'react-native';

export default function Space(props) {
  const { width } = props;
  return <View style={{ width: width }}></View>;
}
