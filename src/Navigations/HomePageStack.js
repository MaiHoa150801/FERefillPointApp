import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import Home from '../Screens/Home';
import CommunitySPScreen from '../Screens/HomePageScreen/CommunitySPScreen';
import GreenWaveScreen from '../Screens/HomePageScreen/GreenWaveScreen';
import RecommendScreen from '../Screens/HomePageScreen/RecommendScreen';
import ScoreRefillScreen from '../Screens/HomePageScreen/ScoreRefillScreen';

const HomeStack = createStackNavigator();
const HomePageStack = () => {
  return (
    <HomeStack.Navigator initialRouteName="HomePageSPScreen">
      <HomeStack.Screen
        name="HomePageSPScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="CommunitySPScreen"
        component={CommunitySPScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="RecommendScreen"
        component={RecommendScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ScoreRefillScreen"
        component={ScoreRefillScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="GreenWaveScreen"
        component={GreenWaveScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default HomePageStack;
