import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
export const users = [
  {
    id: 1,
    name: "Lê Ngọc Vĩ",
    point: 550,
  },
  {
    id: 2,
    name: "Nguyễn Thị Thu",
    point: 450,
  },
  {
    id: 3,
    name: "Lê Thị Mai Hoa",
    point: 350,
  },
  {
    id: 4,
    name: "Hồ Thị Hưu",
    point: 250,
  },
  {
    id: 5,
    name: "Nguyễn Văn Sỷ",
    point: 150,
  },
  {
    id: 6,
    name: "Lê Quang Kỳ",
    point: 50,
  },
  {
    id: 7,
    name: "Phạm Anh Tuấn",
    point: 30,
  },
];
export default function RankScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        {users.map((user, index) => (
          <View key={index} style={styles.body}>
            <View style={styles.viewText}>
              <Text style={styles.text1}>{user.id}</Text>
            </View>
            <Text style={styles.text}>{user.name}</Text>
            <Text style={styles.text}>{user.point} GP</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    marginTop: 30,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#eee",
    height: 50,
    alignItems: "center",
    marginBottom: 20,
  },
  viewText: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#bdc750",
  },
  text1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#c75058",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#65c750",
  },
});