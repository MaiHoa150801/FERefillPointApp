import { StyleSheet } from 'react-native';
import React from 'react';
import { SignInContextProvider } from './src/Context/authContext';
import Main from './src/Navigations/Main';
import { StatusBar } from 'react-native';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <SignInContextProvider>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#DB147F"
      />
      <Main />
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
