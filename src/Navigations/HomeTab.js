import React, { useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../global/styles';
import { Text } from 'react-native';
import { bottomRoutes } from './router/routes';
const HomeTabs = createBottomTabNavigator();

const HomeTab = (props) => {
  return (
    <HomeTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.buttons,
        tabBarStyle: [{ display: 'flex' }, null],
      }}
    >
      {bottomRoutes.map((e, index) => {
        const { name, component, title, icon } = e;
        return (
          <HomeTabs.Screen
            key={index}
            name={name}
            component={component}
            options={{
              headerShown: false,
              tabBarLabel: ({ color, size, focused }) => (
                <Text
                  style={{
                    color: focused ? 'rgb(18, 136, 58)' : colors.grey2,
                    fontSize: 13,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}
                >
                  {title}
                </Text>
              ),
              tabBarIcon: ({ color, size, focused }) => (
                <FontAwesome5
                  name={icon}
                  size={size}
                  color={focused ? 'rgb(18, 136, 58)' : colors.grey2}
                />
              ),
            }}
          />
        );
      })}
    </HomeTabs.Navigator>
  );
};
export default HomeTab;
