import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import ChangePassword from '../Screens/SettingScreen/ChangePassword';
import Profile from '../Screens/SettingScreen/Profile';
import SettingScreen from '../Screens/SettingScreen';
import IntroduceRefill from '../Screens/SettingScreen/IntroduceRefill';
import GreenGift from '../Screens/SettingScreen/GreenGift';
import Account from '../Screens/Account';
import Order from '../Screens/Order';
import { Text } from 'react-native';
import OrderFollow from '../Screens/OrderFollow';
import OrderSuccess from '../Screens/OrderSuccess';
import RatingProduct from '../Screens/RatingProduct';
const SettingStack = createStackNavigator();

const SettingStackScreen = () => (
  <SettingStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },

      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    initialRouteName="AccountScreen"
  >
    <SettingStack.Screen
      name="AccountScreen"
      component={Account}
      options={{ headerShown: false }}
    />
    <SettingStack.Screen
      name="OrderScreen"
      component={Order}
      options={{
        title: (
          <Text style={{ fontSize: 25, fontWeight: 'normal' }}>Đơn mua</Text>
        ),
        headerTitleAlign: 'center',
        headerTintColor: 'green',
      }}
    />
    <SettingStack.Screen
      name="OrderSuccessScreen"
      component={OrderSuccess}
      options={{
        title: (
          <Text style={{ fontSize: 25, fontWeight: 'normal' }}>
            Đơn mua thành công
          </Text>
        ),
        headerTitleAlign: 'center',
        headerTintColor: 'green',
      }}
    />
    <SettingStack.Screen
      name="RatingProduct"
      component={RatingProduct}
      options={{
        title: (
          <Text style={{ fontSize: 25, fontWeight: 'normal' }}>
            Đánh giá sản phẩm
          </Text>
        ),
        headerTitleAlign: 'center',
        headerTintColor: 'green',
      }}
    />
    <SettingStack.Screen
      name="OrderFollowScreen"
      component={OrderFollow}
      options={{
        title: (
          <Text style={{ fontSize: 25, fontWeight: 'normal' }}>
            Theo dõi đơn hàng
          </Text>
        ),
        headerTitleAlign: 'center',
        headerTintColor: 'green',
      }}
    />
    <SettingStack.Screen
      name="Setting"
      component={SettingScreen}
      options={{ headerShown: false }}
    />
    <SettingStack.Screen
      name="ChangePassword"
      component={ChangePassword}
      // options={{ headerShown: false }}
      // options={{ title: "ChangePassword" }}
    />
    <SettingStack.Screen
      name="Profile"
      component={Profile}
      options={{
        title: 'Profile',
      }}
    />
    <SettingStack.Screen
      name="GreenGift"
      component={GreenGift}
      options={{
        title: 'Green Gift',
      }}
    />
    <SettingStack.Screen
      name="IntroduceRefill"
      component={IntroduceRefill}
      options={{
        title: 'Introduce Refill',
      }}
    />
  </SettingStack.Navigator>
);
export default SettingStackScreen;
