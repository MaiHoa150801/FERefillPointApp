import React, { useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Text } from 'react-native';
import { colors } from '../../global/styles';
import MapShip from '../../Screens/ShipperScreen/MapShip';
import OrderMap from '../../Screens/ShipperScreen/OrderMap';
import OrderDetail from '../../Screens/ShipperScreen/OrderDetail';
import OrderStackScreen from './OrderMapStack';
import MoreScreen from '../../Screens/ShipperScreen/MoreScreen';
const HomeTabs = createBottomTabNavigator();

const ShipperTab = (props) => {
  return (
    <HomeTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.buttons,
        tabBarStyle: [{ display: 'flex' }],
      }}
    >
      <HomeTabs.Screen
        key="map"
        name="MapShop"
        component={MapShip}
        options={{
          headerShown: false,
          tabBarLabel: ({ color, size, focused }) => (
            <Text
              style={{
                color: focused ? 'rgb(18, 136, 58)' : colors.grey2,
                fontSize: 14,
                fontWeight: focused ? 'bold' : 'normal',
              }}
            >
              Bản đồ
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="map"
              size={20}
              color={focused ? 'rgb(18, 136, 58)' : colors.grey2}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        key="order"
        name="OrderStack"
        component={OrderStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ color, size, focused }) => (
            <Text
              style={{
                color: focused ? 'rgb(18, 136, 58)' : colors.grey2,
                fontSize: 14,
                fontWeight: focused ? 'bold' : 'normal',
              }}
            >
              Đơn hàng cần giao
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="clipboard-list"
              size={20}
              color={focused ? 'rgb(18, 136, 58)' : colors.grey2}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        key="more"
        name="MoreScreen"
        component={MoreScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ color, size, focused }) => (
            <Text
              style={{
                color: focused ? 'rgb(18, 136, 58)' : colors.grey2,
                fontSize: 14,
                fontWeight: focused ? 'bold' : 'normal',
              }}
            >
              Tôi
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="user"
              size={20}
              color={focused ? 'rgb(18, 136, 58)' : colors.grey2}
            />
          ),
        }}
      />
    </HomeTabs.Navigator>
  );
};
export default ShipperTab;
