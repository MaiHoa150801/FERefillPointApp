import HomePageStack from '../HomePageStack';
import CarouselMap from '../../Screens/HomePageScreen/CarouselMap';
import GreenComunity from '../../Screens/GreenComunity';
import SettingStackScreen from '../SettingStacks';
import ShopStackNavigator from '../ShopStackNavigatior';
import RankScreen from '../../Screens/RankScreen';
const bottomRoutes = [
  {
    name: 'HomeScreen',
    component: HomePageStack,
    title: 'Trang chủ',
    icon: 'home',
  },
  {
    name: 'MapScreen',
    component: ShopStackNavigator,
    title: 'Bản đồ xanh',
    icon: 'map',
  },
  {
    name: 'SocietyScreen',
    component: GreenComunity,
    title: 'Cộng đồng xanh',
    icon: 'leaf',
  },
  {
    name: 'RankScreen',
    component: RankScreen,
    title: 'Điểm refill',
    icon: 'spa',
  },
  {
    name: 'AccountStack',
    component: SettingStackScreen,
    title: 'Tài khoản',
    icon: 'user',
  },
];
export { bottomRoutes };
