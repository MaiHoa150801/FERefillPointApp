import { StyleSheet } from 'react-native';
import React from 'react';
import Main from './src/Navigations/Main';
import { StatusBar } from 'react-native';
import { LogBox } from 'react-native';
import { View } from 'react-native';
import { SignInContextProvider } from './src/contexts/authContext';
import { MenuProvider } from 'react-native-popup-menu';
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <SignInContextProvider>
      <MenuProvider>
        <Main />
      </MenuProvider>
    </SignInContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
