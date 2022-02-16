import { Text, Card } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
export default function CarDropdown(props) {
  const [open, setOpen] = useState(false);
  const { titleIcon, mainTitle, subTitle, children, imageDisnabel } = props;
  let hide = open;
  if (!imageDisnabel) hide = false;
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardTitile}>
        {titleIcon != undefined && !hide && (
          <View style={{ marginRight: 10 }}>{titleIcon}</View>
        )}
        <View>
          <Text style={styles.mainTitle}>{mainTitle}</Text>
          {open == false && <Text>{subTitle}</Text>}
        </View>
        <TouchableOpacity
          style={{ marginLeft: 'auto' }}
          onPress={() => setOpen(!open)}
        >
          {!open && (
            <FontAwesome5
              name="angle-down"
              size={25}
              style={{
                color: '#DDDDDD',
              }}
            />
          )}
          {open && (
            <FontAwesome5
              name="angle-up"
              size={25}
              style={{
                color: '#43484d',
              }}
            />
          )}
        </TouchableOpacity>
      </View>
      {open && <Card.Divider style={{ marginTop: 20 }} />}
      {open && <View style={[styles.cardContent]}>{children}</View>}
    </Card>
  );
}
const styles = StyleSheet.create({
  card: {
    padding: 20,
  },
  cardTitile: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  txtEdit: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  txtDele: {
    textAlign: 'center',
    color: '#CCCCCC',
    fontWeight: 'bold',
  },
  line: {
    marginTop: 10,
  },
  cardContent: {
    alignItems: 'center',
    width: '100%',
  },
  mainTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
