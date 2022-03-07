import AccountScreen from '../../Screens/AccountScreen';
import MapScreen from '../../Screens/MapScreen';
import SocietyGreen from '../../Screens/SocietyGreen';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import HomePageStack from '../HomePageStack';
import CarouselMap from '../../Screens/HomePageScreen/CarouselMap';
import { Text } from 'react-native';
import { colors } from '../../global/styles';
const bottomRoutes = [
  {
    name: 'HomeScreen',
    component: HomePageStack,
    title: 'Trang chủ',
    icon: 'home',
    options: {
      headerShown: false,
      tabBarLabel: ({ color, size, focused }) => (
        <Text
          style={{
            color: focused ? 'rgb(18, 136, 58)' : colors.grey2,
            fontSize: 13,
            fontWeight: focused ? 'bold' : 'normal',
          }}
        >
          Trang chủ
        </Text>
      ),
      tabBarIcon: ({ color, size, focused }) => (
        <FontAwesome5
          name="home"
          size={size}
          color={focused ? 'rgb(18, 136, 58)' : colors.grey2}
        />
      ),
    },
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
