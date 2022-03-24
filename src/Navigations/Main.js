import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import AuthStackScreen from './AuthStacks';
import HomeTab from './HomeTab';
import { SignInContext, SignInContextProvider } from '../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import ShipperTab from './ShipperNavigation/ShipperTab';
export default function Main() {
  const { signedIn, dispatchSignedIn } = useContext(SignInContext);
  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    const userInfo = await SecureStore.getItemAsync('user');
    dispatchSignedIn({
      type: 'UPDATE_SIGN_IN',
      payload: { userToken: JSON.parse(userInfo) },
    });
  };
  return (
    <NavigationContainer>
      {!signedIn.userToken ? (
        <AuthStackScreen />
      ) : signedIn.userToken.user.role == 'user' ? (
        <HomeTab />
      ) : (
        <ShipperTab />
      )}
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
