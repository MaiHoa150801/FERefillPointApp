import { Text, Card } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../global/styles';
import { Image } from 'react-native-elements/dist/image/Image';
import RowIcon from '../RowIcon';
export default function CardCentre(props) {
  const { image, name, address, children, type, key } = props.data.sumary;
  const service = props.data.services.length;
  const waitlist = props.data.features.length;
  return (
    <Card containerStyle={styles.container} key={key}>
      <View key={key}>
        <Card.Image
          style={styles.cardImage}
          source={{
            uri: image,
          }}
        />
        <View style={styles.abImageView}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://www.esb.sa.gov.au/sites/default/files/news-images/exceeding_72_rgb.jpg',
            }}
          />
        </View>
        <View style={styles.rating}>
          <Text style={styles.scoreRating}>9.8</Text>
        </View>
      </View>
      <View style={{ padding: 15 }}>
        <Text style={styles.title} numberOfLines={2}>
          {name}
        </Text>
        <RowIcon icon="map-marker" text={address} />
        <View style={styles.row}>
          <RowIcon
            icon="baby"
            text={`${children} childrens`}
            style={[{ width: '50%' }, styles.line]}
          />
          <RowIcon
            icon="clipboard-list"
            text={`${waitlist} waitlisted`}
            style={[{ width: '50%' }]}
          />
          <RowIcon icon="stethoscope" text={type} style={[{ width: '50%' }]} />
          <RowIcon
            icon="hand-holding-medical"
            text={`${service} services`}
            style={[{ width: '50%' }]}
          />
        </View>
      </View>
    </Card>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  line: {
    marginTop: 20,
  },
  cardImage: {
    width: '100%',
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  rating: {
    position: 'absolute',
    backgroundColor: '#DB147F',
    padding: 5,
    margin: 10,
    borderRadius: 5,
  },
  abImageView: {
    position: 'absolute',
    width: 54,
    alignSelf: 'flex-end',
    right: 12,
  },
  image: {
    width: 54,
    height: 26,
    marginTop: 42,
  },
  scoreRating: {
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    color: colors.grey4,
    marginRight: 10,
  },
});
