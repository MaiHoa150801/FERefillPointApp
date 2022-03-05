import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import AuthStackScreen from './AuthStacks';
import HomeTab from './HomeTab';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
export default function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });
  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeTab /> : <AuthStackScreen />}
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
