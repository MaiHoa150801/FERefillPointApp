import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../Screens/AuthScreen/LoginScreen';
import ForgotPasswordScreen from '../Screens/AuthScreen/ForgorPassword';
const AuthStack = createStackNavigator();

const AuthStackScreen = ({ navigation }) => (
  <AuthStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <AuthStack.Screen
      name="ForgotScreen"
      component={ForgotPasswordScreen}
      options={{ title: null }}
    />
  </AuthStack.Navigator>
);
export default AuthStackScreen;
