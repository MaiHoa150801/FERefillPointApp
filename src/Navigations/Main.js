import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import AuthStackScreen from './AuthStacks';
import HomeTab from './HomeTab';
import { Provider } from 'react-redux';
import configureStore from '../global/root/store/configureStore';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { Text } from 'react-native';

export default function Main() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const getToken = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorageLib.getItem('token');
      setToken(token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const store = configureStore();
  useEffect(() => {
    getToken();
  }, []);
  return (
    <NavigationContainer>
      <Provider store={store}>
        {loading ? (
          <View style={styles.loading}>
            <Text>Loading</Text>
          </View>
        ) : token === null ? (
          <AuthStackScreen />
        ) : (
          <HomeTab />
        )}
      </Provider>
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
