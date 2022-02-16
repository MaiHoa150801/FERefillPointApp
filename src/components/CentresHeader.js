import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Btn from '../components/Button';
import { withBadge } from 'react-native-elements';

export default function CentresHeader(props) {
  const { onFilterPress } = props;
  const { navigation } = props;
  const BadgeIcon = withBadge(FontAwesome5);
  return (
    <View style={styles.header}>
      <View style={[styles.row]}>
        <View style={[styles.row1]}>
          <FontAwesome5
            style={{ padding: 10 }}
            name="store"
            size={20}
            color={'white'}
          />
          <Btn
            onPress={onFilterPress}
            text={
              <View style={styles.row}>
                <View
                  style={{
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 20 }}>
                    All centres
                  </Text>
                </View>
                <FontAwesome
                  style={{ padding: 10 }}
                  name="angle-down"
                  size={30}
                  color="white"
                />
              </View>
            }
          />
        </View>
        <View>
          <FontAwesome
            onPress={() => {
              navigation.navigate('AddCentre', navigation);
            }}
            name="plus"
            size={30}
            color={'white'}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#DB147F',
    width: '100%',
    paddingTop: 40,
    paddingBottom: 60,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  row1: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
  },
});
