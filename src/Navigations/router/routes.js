import AccountScreen from '../../Screens/AccountScreen';
import MapScreen from '../../Screens/MapScreen';
import SocietyGreen from '../../Screens/SocietyGreen';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import HomePageStack from '../HomePageStack';
import CarouselMap from '../../Screens/HomePageScreen/CarouselMap';
import { Text } from 'react-native';
import { colors } from '../../global/styles';
import GreenComunity from '../../Screens/GreenComunity';
import Account from '../../Screens/Account';
import SettingStackScreen from '../SettingStacks';
const bottomRoutes = [
  {
    name: 'HomeScreen',
    component: HomePageStack,
    title: 'Trang chủ',
    icon: 'home',
  },
  {
    name: 'MapScreen',
    component: CarouselMap,
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
    name: 'AccountStack',
    component: SettingStackScreen,
    title: 'Tài khoản',
    icon: 'user',
  },
];
export { bottomRoutes };
