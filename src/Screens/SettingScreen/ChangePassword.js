import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Btn from "../../components/Button";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
export default function ChangePassword() {
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);
  const [hidenpassword, setHidenPassword] = useState(true);
  const [newhidenpassword, setNewHidenPassword] = useState(true);
  const [confirmhidenpassword, setConfirmHidenPassword] = useState(true);
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.form}>
            <View style={styles.input}>
              <View style={styles.inputPass}>
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={hidenpassword ? true : false}
                  placeholder="Password"
                />
                <TouchableOpacity
                  onPress={() => setHidenPassword(!hidenpassword)}
                >
                  {hidenpassword ? (
                    <Feather name="eye-off" size={20} color="black" />
                  ) : (
                    <Feather name="eye" size={20} color="black" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.input}>
              <View style={styles.inputPass}>
                <TextInput
                  style={styles.textInput}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={newhidenpassword ? true : false}
                  placeholder="Nhập mật khẩu mới"
                />
                <TouchableOpacity
                  onPress={() => setNewHidenPassword(!newhidenpassword)}
                >
                  {newhidenpassword ? (
                    <Feather name="eye-off" size={20} color="black" />
                  ) : (
                    <Feather name="eye" size={20} color="black" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.input}>
              <View style={styles.inputPass}>
                <TextInput
                  style={styles.textInput}
                  value={confirmPassword}
                  onChangeText={setconfirmPassword}
                  secureTextEntry={confirmhidenpassword ? true : false}
                  placeholder="Nhập lại mật khẩu mới"
                />
                <TouchableOpacity
                  onPress={() => setConfirmHidenPassword(!confirmhidenpassword)}
                >
                  {confirmhidenpassword ? (
                    <Feather name="eye-off" size={20} color="black" />
                  ) : (
                    <Feather name="eye" size={20} color="black" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Btn
            text="Cập Nhật"
            textStyle={styles.textStyle}
            onPress={null}
            style={styles.btnCapNhat}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  textStyle: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },

  btnCapNhat: {
    backgroundColor: "#3366CC",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginTop: 20,
  },
  divider: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    padding: 10,
  },
  form: {
    width: "100%",
  },
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#d9d5d4",
    borderRadius: 40,
    marginBottom: "5%",
  },
  inputPass: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  textForgor: {
    textAlign: "right",
    color: "#111111",
  },
  textFooter: {
    marginBottom: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  textOr: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 25,
  },
  txt: {
    color: "black",
    textAlign: "center",
    margin: 2,
    fontSize: 15,
  },
  err: {
    color: "red",
    paddingLeft: 10,
  },
  or: {
    fontSize: 17,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
