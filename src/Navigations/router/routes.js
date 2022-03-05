import AccountScreen from '../../Screens/AccountScreen';
import MapScreen from '../../Screens/MapScreen';
import SocietyGreen from '../../Screens/SocietyGreen';
import HomePageStack from '../HomePageStack';
import CarouselMap from '../../Screens/HomePageScreen/CarouselMap';
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
    component: SocietyGreen,
    title: 'Cộng đồng xanh',
    icon: 'leaf',
  },
  {
    name: 'AccountScreen',
    component: AccountScreen,
    title: 'Tài khoản',
    icon: 'user',
  },
];
export { bottomRoutes };
