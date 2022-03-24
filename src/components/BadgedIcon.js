import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withBadge } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';

const BadgedIcon = ({ name, number }) => {
  const BadgeIcon = withBadge(number)(Entypo);
  return <BadgeIcon name={name} size={35} color={'white'} />;
};

export default BadgedIcon;

const styles = StyleSheet.create({});
