import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import AuthStackScreen from './AuthStacks';
import HomeTab from './HomeTab';
import { SignInContext, SignInContextProvider } from '../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Main() {
  const { signedIn, dispatchSignedIn } = useContext(SignInContext);
  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    const user = await AsyncStorage.getItem('user');
    dispatchSignedIn({
      type: 'UPDATE_SIGN_IN',
      payload: { userToken: user },
    });
  };
  return (
    <NavigationContainer>
      {signedIn.userToken ? <HomeTab /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
