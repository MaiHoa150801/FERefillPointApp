import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Btn = ({ text, textStyle, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};
export default Btn;
