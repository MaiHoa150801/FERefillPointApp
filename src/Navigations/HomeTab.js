import React, { useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../global/styles';
import { Text } from 'react-native';
import Home from '../Screens/Home';
import CentreScreen from '../Screens/CentreScreen';
import MoreScreen from '../Screens/MoreScreen';
const HomeTabs = createBottomTabNavigator();

const HomeTab = (props) => {
  return (
    <HomeTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.buttons,
        tabBarStyle: [{ display: 'flex' }, null],
      }}
    >
      <HomeTabs.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: ({ color, size, focused }) => (
            <Text
              style={{
                color: focused ? '#DB147F' : colors.grey2,
                fontSize: 15,
                fontWeight: focused ? 'bold' : 'normal',
              }}
            >
              Dashboard
            </Text>
          ),
          tabBarColor: '#fff',
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="home"
              size={size}
              color={focused ? '#DB147F' : colors.grey2}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        name="CentreScreen"
        component={CentreScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ color, size, focused }) => (
            <Text
              style={{
                color: focused ? '#DB147F' : colors.grey2,
                fontSize: 15,
                fontWeight: focused ? 'bold' : 'normal',
              }}
            >
              Centres
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="store"
              size={size}
              color={focused ? '#DB147F' : colors.grey2}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{
          headerTitle: 'More',
          headerTitleAlign: 'center',
          headerStyle: {
            borderBottomWidth: 1,
          },
          tabBarLabel: ({ color, size, focused }) => (
            <Text
              style={{
                color: focused ? '#DB147F' : colors.grey2,
                fontSize: 15,
                fontWeight: focused ? 'bold' : 'normal',
              }}
            >
              More
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome
              name="ellipsis-h"
              size={size}
              color={focused ? '#DB147F' : colors.grey2}
            />
          ),
        }}
      />
    </HomeTabs.Navigator>
  );
};
export default HomeTab;
