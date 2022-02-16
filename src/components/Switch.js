import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';

export default function SW({ defaultStatus = false, onClick }) {
  const [isEnabled, setIsEnabled] = useState(defaultStatus);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    onClick();
  };
  return (
    <SwitchToggle
      switchOn={isEnabled}
      onPress={toggleSwitch}
      containerStyle={styles.swContainer}
      circleStyle={styles.swCircle}
      rightContainerStyle={{ margin: 10 }}
      circleColorOff="white"
      circleColorOn="white"
      backgroundColorOn="#DB147F"
    />
  );
}
const styles = StyleSheet.create({
  swContainer: {
    width: 35,
    height: 20,
    borderRadius: 25,
    padding: 2,
  },
  swCircle: {
    width: 17,
    height: 17,
    borderRadius: 12,
    backgroundColor: 'white',
  },
});
