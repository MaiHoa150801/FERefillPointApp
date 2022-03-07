import React from "react";
import { View } from "react-native";

export default function Line(props) {
  const { height, color } = props;
  return (
    <View style={{ backgroundColor: color, height: height, width: "100%" }} />
  );
}
