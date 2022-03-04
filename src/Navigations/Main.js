import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import AuthStackScreen from "./AuthStacks";
import SettingStackScreen from "./SettingStacks";
import HomeTab from "./HomeTab";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../Screens/SettingScreen/Profile";
import ChangePassword from "../Screens/SettingScreen/ChangePassword";
import PostScreen from "../Screens/PostScreen";
const AppStack = createStackNavigator();
export default function Main() {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShown: false,
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <AppStack.Screen name="AuthScreen" component={AuthStackScreen} />
        <AppStack.Screen name="HomeTab" component={HomeTab} />
        <AppStack.Screen name="SettingScreen" component={SettingStackScreen} />
        <AppStack.Screen name="Post" component={PostScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
});
