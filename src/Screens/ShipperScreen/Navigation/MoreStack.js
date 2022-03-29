import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MoreScreen from '../MoreScreen';
import OrderSuccessShipper from '../OrderSuccess';
const MoreStack = createStackNavigator();

const MoreStackScreen = ({ navigation }) => (
  <MoreStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    initialRouteName="MoreScreen"
  >
    <MoreStack.Screen
      name="MoreScreen"
      component={MoreScreen}
      options={{ headerShown: false }}
    />
    <MoreStack.Screen
      name="OrderList"
      component={OrderSuccessShipper}
      options={{
        title: 'Đơn hàng đã giao',
      }}
    />
  </MoreStack.Navigator>
);
export default MoreStackScreen;
