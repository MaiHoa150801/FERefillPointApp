import React, { useEffect } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { colors } from "../global/styles";
import { Text } from "react-native";
import Btn from "../components/Button";
import Home from "../Screens/Home";
import CentreScreen from "../Screens/CentreScreen";
import SettingScreen from "../Screens/SettingScreen";
import RankScreen from "../Screens/RankScreen";
import SettingStackScreen from "./SettingStacks";
import GreenComunity from "../Screens/GreenComunity";
import { View } from "react-native";
import Account from "../Screens/Account";
const HomeTabs = createBottomTabNavigator();

const HomeTab = (props) => {
  return (
    <HomeTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.buttons,
        tabBarStyle: [{ display: "flex" }, null],
      }}
    >
      <HomeTabs.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: ({ color, size, focused }) => (
            <Text
              style={{
                color: focused ? "#DB147F" : colors.grey2,
                fontSize: 15,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Dashboard
            </Text>
          ),
          tabBarColor: "#fff",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="home"
              size={size}
              color={focused ? "#DB147F" : colors.grey2}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        name="CentreScreen"
        component={CentreScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ color, size, focused }) => (
            <Text
              style={{
                color: focused ? "#DB147F" : colors.grey2,
                fontSize: 15,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Centres
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="store"
              size={size}
              color={focused ? "#DB147F" : colors.grey2}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        name="GreenComunity"
        component={GreenComunity}
        options={{
          // headerTitle: "GreenComunity",
          // headerTitleAlign: "center",
          // headerStyle: {
          //   borderBottomWidth: 1,
          // },
          headerShown: false,
          tabBarLabel: ({ color, size, focused }) => (
            <Text
              style={{
                color: focused ? "#DB147F" : colors.grey2,
                fontSize: 15,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Comunity
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome
              name="pagelines"
              size={size}
              color={focused ? "#DB147F" : colors.grey2}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        name="RankScreen"
        component={RankScreen}
        options={{
          headerTitle: " Bảng xếp hạng tích lũy",
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomWidth: 1,
          },
          tabBarLabel: ({ color, size, focused }) => (
            <Text
              style={{
                color: focused ? "#DB147F" : colors.grey2,
                fontSize: 15,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Rank
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="spa"
              size={size}
              color={focused ? "#DB147F" : colors.grey2}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        name="Account"
        component={Account}
        options={{
          headerTitle: "Account",
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomWidth: 1,
          },
          headerShown: false,
          tabBarLabel: ({ color, size, focused }) => (
            <Text
              style={{
                color: focused ? "#DB147F" : colors.grey2,
                fontSize: 15,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Setting
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign
              name="setting"
              size={size}
              color={focused ? "#DB147F" : colors.grey2}
            />
          ),
        }}
      />
    </HomeTabs.Navigator>
  );
};
export default HomeTab;
