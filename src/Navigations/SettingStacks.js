import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import ChangePassword from '../Screens/SettingScreen/ChangePassword';
import Profile from '../Screens/SettingScreen/Profile';
import SettingScreen from '../Screens/SettingScreen';
import IntroduceRefill from '../Screens/SettingScreen/IntroduceRefill';
import GreenGift from '../Screens/SettingScreen/GreenGift';
import Account from '../Screens/Account';
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
