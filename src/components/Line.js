import React from 'react';
import { View } from 'react-native';

export default function Line(props) {
  const { height } = props;
  return <View style={{ height: height, width: '100%' }} />;
}
