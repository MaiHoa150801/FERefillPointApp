import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Btn = ({ text, textStyle, onPress, style, disabled = false }) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={style}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};
export default Btn;
