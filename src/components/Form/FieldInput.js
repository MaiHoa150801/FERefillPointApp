import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
const FieldInput = ({ formProps, name, placeholder, focus, type = '' }) => {
  const [hidenpassword, setHidenPassword] = useState(true);
  return (
    <View style={styles.field}>
      {type == 'password' ? (
        <View style={styles.input}>
          <View style={styles.inputPass}>
            <TextInput
              style={[styles.textInput]}
              onChangeText={formProps.handleChange(name)}
              onBlur={formProps.handleBlur(name)}
              value={formProps.values[name]}
              secureTextEntry={hidenpassword ? true : false}
              placeholder="Password"
            />
            <TouchableOpacity onPress={() => setHidenPassword(!hidenpassword)}>
              {hidenpassword ? (
                <Feather name="eye-off" size={20} color="black" />
              ) : (
                <Feather name="eye" size={20} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            onChangeText={formProps.handleChange(name)}
            onBlur={formProps.handleBlur(name)}
            autoFocus={focus ? true : false}
            value={formProps.values[name]}
            placeholder={placeholder}
          />
        </View>
      )}

      {formProps.touched[name] && formProps.errors[name] ? (
        <Text style={styles.err}>{formProps.errors[name]}</Text>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    padding: 10,
  },
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#d9d5d4',
    borderRadius: 40,
  },
  field: {
    marginBottom: '5%',
  },
  err: {
    color: 'red',
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  inputPass: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
});
export default FieldInput;
