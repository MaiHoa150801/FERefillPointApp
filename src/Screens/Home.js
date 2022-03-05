import { View, StyleSheet, Text } from 'react-native';
import HeaderHome from '../components/HeaderHome';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import Slide from '../components/SlideImage';
import NavigateTabHome from '../components/NavigateTabHome';
import ScrollViewImage from '../components/ScrollViewImage';
import { ScrollView } from 'react-native';
const Home = ({ navigation }) => {
  const dataSource = [
    'http://xacamhung.hatinh.gov.vn/uploads/news/2020_07/anh-moi-truong.png',
    'http://xacamhung.hatinh.gov.vn/uploads/news/2020_07/anh-moi-truong.png',
    'http://xacamhung.hatinh.gov.vn/uploads/news/2020_07/anh-moi-truong.png',
    'http://xacamhung.hatinh.gov.vn/uploads/news/2020_07/anh-moi-truong.png',
  ];
  const listTrademark = [
    require('../../assets/logo01.png'),
    require('../../assets/logo02.png'),
    require('../../assets/logo03.jpg'),
    require('../../assets/logo04.png'),
    require('../../assets/logo05.png'),
    require('../../assets/logo06.png'),
    require('../../assets/logo07.png'),
    require('../../assets/logo08.png'),
    require('../../assets/logo09.png'),
    require('../../assets/logo10.png'),
  ];
  return (
    <View style={styles.container}>
      <HeaderHome />
      <Slide images={dataSource} auto={true} />
      <View style={styles.row}>
        <NavigateTabHome
          title="Hỗ trợ cộng đồng"
          icon="heart"
          onPress={() => navigation.navigate('CommunitySPScreen')}
        />
        <NavigateTabHome
          title="Giới thiệu bạn bè"
          icon="share-square-o"
          onPress={() => navigation.navigate('RecommendScreen')}
        />
        <NavigateTabHome
          title="Tặng điểm Refill"
          icon="gift"
          onPress={() => navigation.navigate('ScoreRefillScreen')}
        />
        <NavigateTabHome
          title="Sóng xanh mỗi ngày"
          icon="retweet"
          onPress={() => navigation.navigate('GreenWaveScreen')}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.txtTitle}>Thương hiệu nổi bật</Text>
        <ScrollViewImage listImage={listTrademark} />
      </ScrollView>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  content: {
    width: '96%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  row: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  txtTitle: {
    marginLeft: 5,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: '',
  },
});
