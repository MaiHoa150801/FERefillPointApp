import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GreenComunity from '../Screens/GreenComunity';
import PostDetail from '../Screens/PostDetail';
const PostStack = createStackNavigator();

const PostStackScreen = ({ navigation }) => (
  <PostStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#444444',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    initialRouteName="PostScreen"
  >
    <PostStack.Screen
      name="PostScreen"
      component={GreenComunity}
      options={{ headerShown: false }}
    />
    <PostStack.Screen
      name="PostDetailScreen"
      component={PostDetail}
      options={{
        title: '',
      }}
    />
  </PostStack.Navigator>
);
export default PostStackScreen;
