import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../Screens/AuthScreen/LoginScreen';
import ForgotPasswordScreen from '../Screens/AuthScreen/ForgorPassword';
import SplashScreen from '../../SplashScreen';
import RegisterScreen from '../Screens/AuthScreen/RegisterScreen';
import SendCodeScreen from '../Screens/AuthScreen/SendCode';
import ChangePasswordScreen from '../Screens/AuthScreen/changePassword';
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
    initialRouteName="Splash"
  >
    <AuthStack.Screen
      name="Splash"
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{
        title: 'Đăng nhập tài khoản',
      }}
    />
    <AuthStack.Screen
      name="SendcodeScreen"
      component={SendCodeScreen}
      options={{
        title: 'Khôi phục mật khẩu',
      }}
    />
    <AuthStack.Screen
      name="ChangePasswordScreen"
      component={ChangePasswordScreen}
      options={{
        title: 'Thay đổi mật khẩu',
      }}
    />
    <AuthStack.Screen
      name="ForgotScreen"
      component={ForgotPasswordScreen}
      options={{
        title: 'Quên mật khẩu',
      }}
    />
    <AuthStack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{
        title: 'Đăng kí tài khoản',
      }}
    />
  </AuthStack.Navigator>
);
export default AuthStackScreen;
