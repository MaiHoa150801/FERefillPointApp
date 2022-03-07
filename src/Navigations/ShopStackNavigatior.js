import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ShopDetailScreen from '../Screens/ShopDetailScreen';
import ProductDetailScreen from '../Screens/ProductDetailScreen';
import CarouselMap from '../Screens/HomePageScreen/CarouselMap';
const Stack = createStackNavigator();

function ShopStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="GreenMap"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="GreenMap" component={CarouselMap} />
      <Stack.Screen name="ShopDetail" component={ShopDetailScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

export default ShopStackNavigator;
