import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderMap from '../../Screens/ShipperScreen/OrderMap';
import OrderDetail from '../../Screens/ShipperScreen/OrderDetail';
const OrderMapStack = createStackNavigator();

const OrderStackScreen = ({ navigation }) => (
  <OrderMapStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    initialRouteName="Splash"
  >
    <OrderMapStack.Screen
      name="OrderMap"
      component={OrderMap}
      options={{ headerShown: false }}
    />
    <OrderMapStack.Screen
      name="OrderDetail"
      component={OrderDetail}
      options={{
        title: 'Chi tiết đơn hàng',
      }}
    />
  </OrderMapStack.Navigator>
);
export default OrderStackScreen;
