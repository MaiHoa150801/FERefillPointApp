import AccountScreen from '../../Screens/AccountScreen';
import Home from '../../Screens/Home';
import MapScreen from '../../Screens/MapScreen';
import SocietyGreen from '../../Screens/SocietyGreen';

const bottomRoutes = [
  {
    name: 'HomeScreen',
    component: Home,
    title: 'Trang chủ',
    icon: 'home',
  },
  {
    name: 'MapScreen',
    component: MapScreen,
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
