import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";
import HeaderHome from "../components/HeaderHome";
import { Divider } from "react-native-elements/dist/divider/Divider";
import Slide from "../components/SlideImage";
import NavigateTabHome from "../components/NavigateTabHome";
import ScrollViewImage from "../components/ScrollViewImage";
import CardCategory from "../components/cards/CardCategory";
import Line from "../components/Line";
import CardShop from "../components/HomepageScreen/CardShop";
const Home = ({ navigation }) => {
  const dataSource = [
    "http://xacamhung.hatinh.gov.vn/uploads/news/2020_07/anh-moi-truong.png",
    "http://xacamhung.hatinh.gov.vn/uploads/news/2020_07/anh-moi-truong.png",
    "http://xacamhung.hatinh.gov.vn/uploads/news/2020_07/anh-moi-truong.png",
    "http://xacamhung.hatinh.gov.vn/uploads/news/2020_07/anh-moi-truong.png",
  ];
  const listTrademark = [
    require("../../assets/logo01.png"),
    require("../../assets/logo02.png"),
    require("../../assets/logo03.jpg"),
    require("../../assets/logo04.png"),
    require("../../assets/logo05.png"),
    require("../../assets/logo06.png"),
    require("../../assets/logo07.png"),
    require("../../assets/logo08.png"),
    require("../../assets/logo09.png"),
    require("../../assets/logo10.png"),
  ];

  const data = [
    {
      id: 1,
      category: "Dầu gội",
      img: "https://media.istockphoto.com/vectors/illustration-of-a-woman-washing-her-hair-vector-id1152582927?k=20&m=1152582927&s=612x612&w=0&h=lGR-aYiyoF2YQx7T_0ElY5h_AReoXAq51PPAVdfFYvc=",
    },
    {
      id: 2,
      category: "Dầu rửa chén",
      img: "https://img.freepik.com/free-vector/happy-cute-little-boy-washing-dish-kitchen_97632-4188.jpg",
    },
    {
      id: 3,
      category: "Sữa tắm",
      img: "https://img.freepik.com/free-vector/funny-little-kid-having-bath_29937-4025.jpg",
    },
    {
      id: 4,
      category: "Nước rửa tay",
      img: "https://www.phe.gov/facecovering/PublishingImages/sanitizer.jpg",
    },
    {
      id: 5,
      category: "Nước giặt",
      img: "https://media.istockphoto.com/vectors/happy-cute-kid-do-laundry-with-washing-machine-vector-id1297005400?k=20&m=1297005400&s=170667a&w=0&h=vSagn-WZjFqGAIECtg45fw254ugJ7tUrPDQRMU_yqd4=",
    },
    {
      id: 6,
      category: "Nước rửa rau củ",
      img: "https://toplist.vn/images/800px/nuoc-rua-rau-qua-hieu-qua-an-toan-nhat-hien-nay-273054.jpg",
    },
    {
      id: 7,
      category: "Nước lau sàn",
      img: "https://thumbs.dreamstime.com/b/cartoon-little-girl-mopping-floor-kids-doing-housework-chores-home-concept-vector-illustration-198013820.jpg",
    },
    {
      id: 8,
      category: "Xịt khuẩn",
      img: "https://media.istockphoto.com/vectors/antibacterial-sanitizer-spray-spray-bottle-icon-vector-id1218069059?k=20&m=1218069059&s=170667a&w=0&h=VSJ6mYkzsJ-_rLo9jzs9rkDkE5rAi7eYH1UAb7sMPDk=",
    },
  ];

  const dataShop = [
    {
      id: 1,
      name: "No Waste To Go",
      address: "88 Bà Huyện Thanh Quan",
      img: "http://xacamhung.hatinh.gov.vn/uploads/news/2020_07/anh-moi-truong.png",
    },
    {
      id: 2,
      name: "Refillin good",
      address: "95 Ngô Quyền, Sơn Trà",
      img: "http://xacamhung.hatinh.gov.vn/uploads/news/2020_07/anh-moi-truong.png",
    },
    {
      id: 3,
      name: "Fuwa3e",
      address: "114 Dương Văn An, Sơn Trà",
      img: "http://xacamhung.hatinh.gov.vn/uploads/news/2020_07/anh-moi-truong.png",
    },
  ];

  var arrays = [],
    size = 2;
  while (data.length > 0) arrays.push(data.splice(0, size));

  const renderItem = ({ item }) => (
    <View>
      <CardCategory img={item[0].img} category={item[0].category} />
      {item.length > 1 ? (
        <CardCategory img={item[1].img} category={item[1].category} />
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderHome />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          <NavigateTabHome
            title="Hỗ trợ cộng đồng"
            icon="heart"
            onPress={() => navigation.navigate("CommunitySPScreen")}
          />
          <NavigateTabHome
            title="Giới thiệu bạn bè"
            icon="share-square-o"
            onPress={() => navigation.navigate("RecommendScreen")}
          />
          <NavigateTabHome
            title="Tặng điểm Refill"
            icon="gift"
            onPress={() => navigation.navigate("ScoreRefillScreen")}
          />
          <NavigateTabHome
            title="Sống xanh mỗi ngày"
            icon="retweet"
            onPress={() => navigation.navigate("GreenWaveScreen")}
          />
        </View>
        <Slide images={dataSource} auto={true} />

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.txtTitle}>Thương hiệu nổi bật</Text>
          <ScrollViewImage listImage={listTrademark} />
        </ScrollView>

        <View style={styles.categoryView}>
          <Text style={styles.txtTitle}>Danh mục sản phẩm</Text>

          <FlatList
            data={arrays}
            horizontal={true}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.shopView}>
          <Text style={styles.txtTitle}>Cửa hàng refill gần bạn</Text>
          <View style={styles.cardView}>
            {dataShop.map((item, key) => (
              <CardShop
                key={key}
                img={item.img}
                name={item.name}
                address={item.address}
              />
            ))}
          </View>
        </View>
        <Line height={30} color={"#fff"} />
      </ScrollView>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "white",
  },
  content: {
    width: "96%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  row: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  categoryView: {
    backgroundColor: "#F5F5F5",
    marginTop: 20,
    paddingLeft: 10,
  },
  txtTitle: {
    fontSize: 17,
    fontWeight: "700",
    padding: 10,
  },
  shopView: {
    marginHorizontal: 10,
  },
  cardView: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
